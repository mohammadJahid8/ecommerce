'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  CreditCard,
  Building2,
  ChevronRight,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type {
  PaymentMethod,
  PaymentMethodInput,
} from '@/hooks/usePaymentMethods';

// Card brand icons from public folder
const CARD_ICONS: Record<string, string> = {
  visa: '/visa.svg',
  mastercard: '/mastercard.svg',
  amex: '/amex.svg',
  discover: '/discover.svg',
  diners: '/diners.svg',
  jcb: '/jcb.svg',
  unionpay: '/unionpay.svg',
  placeholder: '/generic.svg',
};

// Luhn algorithm for card validation
const isValidLuhn = (number: string): boolean => {
  const digits = number.replace(/\s/g, '');
  if (!/^\d+$/.test(digits)) return false;
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

// Card type detection
const getCardType = (number: string): string => {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  if (/^6(?:011|5)/.test(n)) return 'discover';
  if (/^3(?:0[0-5]|[68])/.test(n)) return 'diners';
  if (/^35/.test(n)) return 'jcb';
  if (/^62/.test(n)) return 'unionpay';
  return '';
};

const getCardDisplayName = (cardType: string): string => {
  const names: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
    diners: 'Diners Club',
    jcb: 'JCB',
    unionpay: 'UnionPay',
  };
  return names[cardType] || 'Card';
};

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
];

interface AddPaymentMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (method: PaymentMethodInput) => void;
  onUpdate?: (id: string, updates: Partial<PaymentMethodInput>) => void;
  editingMethod?: PaymentMethod | null;
}

type Step = 'select' | 'card' | 'bank';

export default function AddPaymentMethodDialog({
  isOpen,
  onOpenChange,
  onAdd,
  onUpdate,
  editingMethod,
}: AddPaymentMethodDialogProps) {
  const { t } = useTranslation();
  const isEditing = !!editingMethod;
  const [step, setStep] = useState<Step>(isEditing ? 'card' : 'select');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  // Address state
  const [country, setCountry] = useState('US');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Bank form state
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');

  // Errors
  const [cardError, setCardError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [bankErrors, setBankErrors] = useState<Record<string, string>>({});

  const cardType = getCardType(cardNumber);
  const cardDigits = cardNumber.replace(/\s/g, '');

  // Populate form when editing
  useEffect(() => {
    if (editingMethod && isOpen) {
      if (editingMethod.type === 'card') {
        setStep('card');
        setCardholderName(editingMethod.name || '');
        setCountry(editingMethod.country || 'US');
        setAddressLine1(editingMethod.addressLine1 || '');
        setAddressLine2(editingMethod.addressLine2 || '');
        setCity(editingMethod.city || '');
        setPostalCode(editingMethod.postalCode || '');
        // Don't populate card number, expiry, cvc for security
      } else {
        setStep('bank');
        setAccountHolderName(editingMethod.name || '');
        setCountry(editingMethod.country || 'US');
        setAddressLine1(editingMethod.addressLine1 || '');
        setAddressLine2(editingMethod.addressLine2 || '');
        setCity(editingMethod.city || '');
        setPostalCode(editingMethod.postalCode || '');
      }
    }
  }, [editingMethod, isOpen]);

  const formatCard = useCallback((val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 16);
    return nums.match(/.{1,4}/g)?.join(' ') || '';
  }, []);

  const formatExpiry = useCallback((val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 4);
    if (nums.length >= 2) return `${nums.slice(0, 2)} / ${nums.slice(2)}`;
    return nums;
  }, []);

  // Real-time card validation
  useEffect(() => {
    if (cardDigits.length === 16 && !isValidLuhn(cardNumber)) {
      setCardError('Card number is invalid');
    } else {
      setCardError('');
    }
  }, [cardNumber, cardDigits]);

  // Real-time expiry validation
  useEffect(() => {
    if (expiry.length === 7) {
      const parts = expiry.split(' / ');
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[1], 10);
      if (month < 1 || month > 12) {
        setExpiryError('Invalid month');
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          setExpiryError('Card has expired');
        } else {
          setExpiryError('');
        }
      }
    } else {
      setExpiryError('');
    }
  }, [expiry]);

  const resetForm = () => {
    setStep('select');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setCardholderName('');
    setCountry('US');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setPostalCode('');
    setBankName('');
    setAccountNumber('');
    setRoutingNumber('');
    setAccountHolderName('');
    setCardError('');
    setExpiryError('');
    setCvcError('');
    setNameError('');
    setAddressError('');
    setCityError('');
    setBankErrors({});
    setIsCountryOpen(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetForm, 200);
  };

  const validateCard = (): boolean => {
    let hasError = false;

    if (!isEditing) {
      if (cardDigits.length === 0) {
        setCardError('Card number is required');
        hasError = true;
      } else if (cardDigits.length !== 16) {
        setCardError('Enter 16 digits');
        hasError = true;
      } else if (!isValidLuhn(cardNumber)) {
        setCardError('Card number is invalid');
        hasError = true;
      }

      if (expiry.length === 0) {
        setExpiryError('Required');
        hasError = true;
      } else if (expiry.length !== 7) {
        setExpiryError('Invalid');
        hasError = true;
      }

      if (cvc.length === 0) {
        setCvcError('Required');
        hasError = true;
      } else if (cvc.length < 3) {
        setCvcError('Invalid');
        hasError = true;
      }
    }

    if (cardholderName.trim().length === 0) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (addressLine1.trim().length === 0) {
      setAddressError('Address is required');
      hasError = true;
    } else {
      setAddressError('');
    }

    if (city.trim().length === 0) {
      setCityError('City is required');
      hasError = true;
    } else {
      setCityError('');
    }

    return !hasError;
  };

  const validateBank = (): boolean => {
    const errors: Record<string, string> = {};

    if (!accountHolderName.trim())
      errors.accountHolderName = 'Name is required';
    if (!bankName.trim()) errors.bankName = 'Bank name is required';
    if (!accountNumber.trim())
      errors.accountNumber = 'Account number is required';
    if (!routingNumber.trim())
      errors.routingNumber = 'Routing number is required';
    if (!addressLine1.trim()) errors.addressLine1 = 'Address is required';
    if (!city.trim()) errors.city = 'City is required';

    setBankErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCard = () => {
    if (!validateCard()) return;

    if (isEditing && onUpdate && editingMethod) {
      onUpdate(editingMethod.id, {
        name: cardholderName.trim(),
        country,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });
    } else {
      const parts = expiry.split(' / ');
      onAdd({
        type: 'card',
        cardType,
        last4: cardDigits.slice(-4),
        expiry: `${parts[0]}/${parts[1]}`,
        name: cardholderName.trim() || getCardDisplayName(cardType),
        country,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });
    }
    handleClose();
  };

  const handleSaveBank = () => {
    if (!validateBank()) return;

    if (isEditing && onUpdate && editingMethod) {
      onUpdate(editingMethod.id, {
        name: accountHolderName.trim(),
        country,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });
    } else {
      onAdd({
        type: 'bank',
        last4: accountNumber.slice(-4),
        expiry: '',
        name: `${bankName.trim()} - ${accountHolderName.trim()}`,
        country,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });
    }
    handleClose();
  };

  const hasCardError = cardError || expiryError || cvcError || nameError;
  const cardIconPath = cardType ? CARD_ICONS[cardType] : CARD_ICONS.placeholder;
  const selectedCountry =
    COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  // ─── Address fields shared between card and bank ───
  const renderAddressFields = (errors?: Record<string, string>) => (
    <div className='space-y-4 mt-6'>
      {/* Country Selector */}
      <div className='relative'>
        <div className='flex items-center gap-3 mb-1'>
          <MapPin className='w-5 h-5 text-[#5f6368] dark:text-gray-400' />
          <button
            type='button'
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className='flex-1 flex items-center justify-between pb-2 border-b border-[#dadce0] dark:border-gray-600 text-left'
          >
            <span className='text-base text-[#202124] dark:text-white'>
              {selectedCountry.flag} {selectedCountry.name} (
              {selectedCountry.code})
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#5f6368] transition-transform',
                isCountryOpen && 'rotate-180',
              )}
            />
          </button>
        </div>

        {isCountryOpen && (
          <div className='absolute z-10 left-8 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-[#dadce0] dark:border-gray-600'>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type='button'
                onClick={() => {
                  setCountry(c.code);
                  setIsCountryOpen(false);
                }}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors',
                  country === c.code
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-[#1a73e8]'
                    : 'text-[#202124] dark:text-white',
                )}
              >
                {c.flag} {c.name} ({c.code})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Address Line 1 */}
      <div>
        <label
          className={cn(
            'text-[13px] font-medium',
            addressError || errors?.addressLine1
              ? 'text-[#d93025]'
              : 'text-[#5f6368] dark:text-gray-400',
          )}
        >
          {t('address_line_1')}
        </label>
        <input
          type='text'
          value={addressLine1}
          onChange={(e) => {
            setAddressLine1(e.target.value);
            setAddressError('');
          }}
          className={cn(
            'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
            addressError || errors?.addressLine1
              ? 'border-[#d93025]'
              : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
          )}
        />
        {(addressError || errors?.addressLine1) && (
          <p className='text-[12px] text-[#d93025] mt-1'>
            {addressError || errors?.addressLine1}
          </p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className='text-[13px] font-medium text-[#5f6368] dark:text-gray-400'>
          {t('address_line_2')}
        </label>
        <input
          type='text'
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className='w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8] transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white'
        />
      </div>

      {/* City */}
      <div>
        <label
          className={cn(
            'text-[13px] font-medium',
            cityError || errors?.city
              ? 'text-[#d93025]'
              : 'text-[#5f6368] dark:text-gray-400',
          )}
        >
          {t('city')}
        </label>
        <input
          type='text'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setCityError('');
          }}
          className={cn(
            'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
            cityError || errors?.city
              ? 'border-[#d93025]'
              : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
          )}
        />
        {(cityError || errors?.city) && (
          <p className='text-[12px] text-[#d93025] mt-1'>
            {cityError || errors?.city}
          </p>
        )}
      </div>

      {/* Postal Code */}
      <div>
        <label className='text-[13px] font-medium text-[#5f6368] dark:text-gray-400'>
          {t('postal_code')}
        </label>
        <input
          type='text'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className='w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8] transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white'
        />
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[520px] p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto'>
        {/* ─── Step 1: Select type ─── */}
        {step === 'select' && (
          <div className='p-6'>
            <DialogHeader>
              <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                {t('add_payment_method') || 'Add payment method'}
              </DialogTitle>
            </DialogHeader>

            <div className='mt-6 space-y-2'>
              <button
                onClick={() => setStep('card')}
                className='w-full flex items-center gap-4 p-4 rounded-lg border border-[#dadce0] dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left'
              >
                <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                  <CreditCard className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='flex-1'>
                  <div className='text-base font-medium text-[#202124] dark:text-white'>
                    {t('credit_debit_card') || 'Add credit or debit card'}
                  </div>
                  <div className='text-sm text-[#5f6368] dark:text-gray-400'>
                    {t('visa_mastercard_amex') ||
                      'Visa, Mastercard, Amex, and more'}
                  </div>
                </div>
                <ChevronRight className='w-5 h-5 text-gray-400' />
              </button>

              <button
                onClick={() => setStep('bank')}
                className='w-full flex items-center gap-4 p-4 rounded-lg border border-[#dadce0] dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left'
              >
                <div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                  <Building2 className='w-5 h-5 text-green-600 dark:text-green-400' />
                </div>
                <div className='flex-1'>
                  <div className='text-base font-medium text-[#202124] dark:text-white'>
                    {t('bank_account') || 'Add a bank account'}
                  </div>
                  <div className='text-sm text-[#5f6368] dark:text-gray-400'>
                    {t('link_bank_account') || 'Link your bank account'}
                  </div>
                </div>
                <ChevronRight className='w-5 h-5 text-gray-400' />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 2a: Card form ─── */}
        {step === 'card' && (
          <div className='p-6'>
            <DialogHeader>
              <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                {isEditing
                  ? t('edit_payment_method') || 'Edit payment method'
                  : t('add_payment_method') || 'Add a payment method'}
              </DialogTitle>
            </DialogHeader>

            <div className='mt-6 space-y-4'>
              {/* Card Number + Expiry + CVC */}
              {!isEditing && (
                <div>
                  <label
                    className={cn(
                      'text-[13px] font-medium transition-colors',
                      cardError
                        ? 'text-[#d93025]'
                        : 'text-[#5f6368] dark:text-gray-400',
                    )}
                  >
                    {t('card_number') || 'Card number'}
                  </label>
                  <div
                    className={cn(
                      'flex items-end mt-2 pb-2 border-b-2 transition-colors',
                      cardError || expiryError || cvcError
                        ? 'border-[#d93025]'
                        : 'border-[#dadce0] dark:border-gray-600 focus-within:border-[#1a73e8]',
                    )}
                  >
                    <input
                      type='text'
                      inputMode='numeric'
                      autoComplete='cc-number'
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCard(e.target.value))
                      }
                      placeholder='0000 0000 0000 0000'
                      className='flex-1 text-base text-[#202124] dark:text-white bg-transparent outline-none placeholder:text-[#80868b]'
                    />
                    <div className='flex-shrink-0 mx-2'>
                      <Image
                        src={cardIconPath}
                        alt={cardType || 'card'}
                        width={32}
                        height={20}
                        className={cn(
                          'object-contain',
                          !cardType && 'grayscale opacity-50',
                        )}
                      />
                    </div>
                    <input
                      type='text'
                      inputMode='numeric'
                      autoComplete='cc-exp'
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder='MM / YY'
                      className={cn(
                        'w-20 text-base text-center bg-transparent outline-none placeholder:text-[#80868b]',
                        expiryError
                          ? 'text-[#d93025]'
                          : 'text-[#202124] dark:text-white',
                      )}
                    />
                    <input
                      type='text'
                      inputMode='numeric'
                      autoComplete='cc-csc'
                      value={cvc}
                      onChange={(e) =>
                        setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))
                      }
                      placeholder='CVC'
                      className={cn(
                        'w-12 text-base text-center bg-transparent outline-none placeholder:text-[#80868b]',
                        cvcError
                          ? 'text-[#d93025]'
                          : 'text-[#202124] dark:text-white',
                      )}
                    />
                  </div>
                  {(cardError || expiryError || cvcError) && (
                    <div className='mt-2 flex items-start gap-2 text-[#d93025]'>
                      <svg
                        className='w-4 h-4 mt-0.5 flex-shrink-0'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                      </svg>
                      <span className='text-[13px]'>
                        {cardError || expiryError || cvcError}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Cardholder Name */}
              <div>
                <label
                  className={cn(
                    'text-[13px] font-medium transition-colors',
                    nameError
                      ? 'text-[#d93025]'
                      : 'text-[#5f6368] dark:text-gray-400',
                  )}
                >
                  {t('cardholder_name') || 'Cardholder name'}
                </label>
                <input
                  type='text'
                  value={cardholderName}
                  onChange={(e) => {
                    setCardholderName(e.target.value);
                    setNameError('');
                  }}
                  placeholder='John Doe'
                  className={cn(
                    'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
                    nameError
                      ? 'border-[#d93025]'
                      : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
                  )}
                />
                {nameError && (
                  <p className='text-[12px] text-[#d93025] mt-1'>{nameError}</p>
                )}
              </div>

              {/* Address Fields */}
              {renderAddressFields()}

              {/* Terms */}
              <p className='text-[12px] text-[#5f6368] dark:text-gray-400 mt-4 leading-relaxed'>
                {t('terms_agreement')}{' '}
                <span className='text-[#1a73e8] cursor-pointer hover:underline'>
                  {t('terms_of_service')}
                </span>
                . {t('privacy_notice')} {t('privacy_notice_desc')}
              </p>
            </div>

            {/* Actions */}
            <div className='flex justify-end items-center gap-4 mt-6 pt-4 border-t border-[#dadce0] dark:border-gray-700'>
              {!isEditing && (
                <button
                  onClick={() => setStep('select')}
                  className='text-[#1a73e8] text-sm font-medium hover:underline'
                >
                  {t('back') || 'Back'}
                </button>
              )}
              <Button
                onClick={handleSaveCard}
                className='bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-8 h-9 rounded'
              >
                {t('save') || 'Save'}
              </Button>
            </div>
          </div>
        )}

        {/* ─── Step 2b: Bank form ─── */}
        {step === 'bank' && (
          <div className='p-6'>
            <DialogHeader>
              <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                {isEditing
                  ? t('edit_bank_account') || 'Edit bank account'
                  : t('add_bank_account') || 'Add a bank account'}
              </DialogTitle>
            </DialogHeader>

            <div className='mt-6 space-y-4'>
              {/* Account Holder Name */}
              <div>
                <label
                  className={cn(
                    'text-[13px] font-medium',
                    bankErrors.accountHolderName
                      ? 'text-[#d93025]'
                      : 'text-[#5f6368] dark:text-gray-400',
                  )}
                >
                  {t('account_holder_name')}
                </label>
                <input
                  type='text'
                  value={accountHolderName}
                  onChange={(e) => {
                    setAccountHolderName(e.target.value);
                    setBankErrors((p) => ({ ...p, accountHolderName: '' }));
                  }}
                  placeholder='John Doe'
                  className={cn(
                    'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
                    bankErrors.accountHolderName
                      ? 'border-[#d93025]'
                      : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
                  )}
                />
                {bankErrors.accountHolderName && (
                  <p className='text-[12px] text-[#d93025] mt-1'>
                    {bankErrors.accountHolderName}
                  </p>
                )}
              </div>

              {!isEditing && (
                <>
                  {/* Bank Name */}
                  <div>
                    <label
                      className={cn(
                        'text-[13px] font-medium',
                        bankErrors.bankName
                          ? 'text-[#d93025]'
                          : 'text-[#5f6368] dark:text-gray-400',
                      )}
                    >
                      {t('bank_name')}
                    </label>
                    <input
                      type='text'
                      value={bankName}
                      onChange={(e) => {
                        setBankName(e.target.value);
                        setBankErrors((p) => ({ ...p, bankName: '' }));
                      }}
                      placeholder='e.g. Bank of America'
                      className={cn(
                        'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
                        bankErrors.bankName
                          ? 'border-[#d93025]'
                          : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
                      )}
                    />
                    {bankErrors.bankName && (
                      <p className='text-[12px] text-[#d93025] mt-1'>
                        {bankErrors.bankName}
                      </p>
                    )}
                  </div>

                  {/* Account Number */}
                  <div>
                    <label
                      className={cn(
                        'text-[13px] font-medium',
                        bankErrors.accountNumber
                          ? 'text-[#d93025]'
                          : 'text-[#5f6368] dark:text-gray-400',
                      )}
                    >
                      {t('account_number')}
                    </label>
                    <input
                      type='text'
                      inputMode='numeric'
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(e.target.value.replace(/\D/g, ''));
                        setBankErrors((p) => ({ ...p, accountNumber: '' }));
                      }}
                      placeholder='Enter account number'
                      className={cn(
                        'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
                        bankErrors.accountNumber
                          ? 'border-[#d93025]'
                          : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
                      )}
                    />
                    {bankErrors.accountNumber && (
                      <p className='text-[12px] text-[#d93025] mt-1'>
                        {bankErrors.accountNumber}
                      </p>
                    )}
                  </div>

                  {/* Routing Number */}
                  <div>
                    <label
                      className={cn(
                        'text-[13px] font-medium',
                        bankErrors.routingNumber
                          ? 'text-[#d93025]'
                          : 'text-[#5f6368] dark:text-gray-400',
                      )}
                    >
                      {t('routing_number')}
                    </label>
                    <input
                      type='text'
                      inputMode='numeric'
                      value={routingNumber}
                      onChange={(e) => {
                        setRoutingNumber(e.target.value.replace(/\D/g, ''));
                        setBankErrors((p) => ({ ...p, routingNumber: '' }));
                      }}
                      placeholder='Enter routing number'
                      className={cn(
                        'w-full mt-1 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b] text-[#202124] dark:text-white',
                        bankErrors.routingNumber
                          ? 'border-[#d93025]'
                          : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8]',
                      )}
                    />
                    {bankErrors.routingNumber && (
                      <p className='text-[12px] text-[#d93025] mt-1'>
                        {bankErrors.routingNumber}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Address Fields */}
              {renderAddressFields(bankErrors)}

              {/* Terms */}
              <p className='text-[12px] text-[#5f6368] dark:text-gray-400 mt-4 leading-relaxed'>
                {t('terms_agreement')}{' '}
                <span className='text-[#1a73e8] cursor-pointer hover:underline'>
                  {t('terms_of_service')}
                </span>
                . {t('privacy_notice')} {t('privacy_notice_desc')}
              </p>
            </div>

            {/* Actions */}
            <div className='flex justify-end items-center gap-4 mt-6 pt-4 border-t border-[#dadce0] dark:border-gray-700'>
              {!isEditing && (
                <button
                  onClick={() => setStep('select')}
                  className='text-[#1a73e8] text-sm font-medium hover:underline'
                >
                  {t('back') || 'Back'}
                </button>
              )}
              <Button
                onClick={handleSaveBank}
                className='bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-8 h-9 rounded'
              >
                {t('save') || 'Save'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
