'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import {
  CreditCard,
  Building2,
  ChevronRight,
  MapPin,
  ChevronDown,
  Pencil,
  X,
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

/* ─── Card brand config ─── */
const CARD_BRANDS = [
  { key: 'visa', src: '/visa.svg' },
  { key: 'mastercard', src: '/mastercard.svg' },
  { key: 'amex', src: '/amex.svg' },
  { key: 'discover', src: '/discover.svg' },
  { key: 'jcb', src: '/jcb.svg' },
  { key: 'maestro', src: '/maestro.svg' },
] as const;

/* ─── Luhn algorithm ─── */
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

/* ─── Card type detection ─── */
const getCardType = (number: string): string => {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  if (/^6(?:011|5)/.test(n)) return 'discover';
  if (/^3(?:0[0-5]|[68])/.test(n)) return 'diners';
  if (/^35/.test(n)) return 'jcb';
  if (/^62/.test(n)) return 'unionpay';
  if (/^(?:5018|5020|5038|6304|6759|676[1-3])/.test(n)) return 'maestro';
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
    maestro: 'Maestro',
  };
  return names[cardType] || 'Card';
};

/* ─── Countries ─── */
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IN', name: 'India' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PH', name: 'Philippines' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CO', name: 'Colombia' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'TR', name: 'Turkey' },
  { code: 'RU', name: 'Russia' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'GR', name: 'Greece' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Peru' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GH', name: 'Ghana' },
];

/* ─── Timezone → Country code mapping ─── */
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'Europe/London': 'GB',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Vienna': 'AT',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Athens': 'GR',
  'Europe/Lisbon': 'PT',
  'Europe/Dublin': 'IE',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Helsinki': 'FI',
  'Europe/Istanbul': 'TR',
  'Europe/Moscow': 'RU',
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Asia/Dhaka': 'BD',
  'Asia/Dacca': 'BD',
  'Asia/Karachi': 'PK',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Hong_Kong': 'CN',
  'Asia/Singapore': 'SG',
  'Asia/Bangkok': 'TH',
  'Asia/Jakarta': 'ID',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Manila': 'PH',
  'Asia/Riyadh': 'SA',
  'Asia/Dubai': 'AE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Pacific/Auckland': 'NZ',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Bogota': 'CO',
  'America/Caracas': 'VE',
  'America/Santiago': 'CL',
  'America/Lima': 'PE',
  'Africa/Cairo': 'EG',
  'Africa/Lagos': 'NG',
  'Africa/Johannesburg': 'ZA',
  'Africa/Nairobi': 'KE',
  'Africa/Accra': 'GH',
};

function detectCountryFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_COUNTRY[tz] || 'US';
  } catch {
    return 'US';
  }
}

/* ─── Floating Label Input ─── */
function FloatingField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  inputMode,
  autoComplete,
  className,
  disabled,
  autoFocus,
  inputRef,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'tel';
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  maxLength?: number;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'relative border-b-2 transition-colors duration-200',
          error
            ? 'border-[#d93025]'
            : focused
              ? 'border-[#1a73e8]'
              : 'border-[#dadce0] dark:border-gray-600',
        )}
      >
        <label
          className={cn(
            'absolute left-0 transition-all duration-200 pointer-events-none',
            isActive ? 'top-0 text-[11px]' : 'top-5 text-[15px]',
            error
              ? 'text-[#d93025]'
              : focused
                ? 'text-[#1a73e8]'
                : 'text-[#5f6368] dark:text-gray-400',
          )}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          placeholder={focused && placeholder ? placeholder : ''}
          className='w-full pt-5 pb-2 text-[15px] bg-transparent outline-none text-[#202124] dark:text-white placeholder:text-[#80868b]'
        />
      </div>
      {error && (
        <p className='absolute top-full mt-1 text-[12px] text-[#d93025] whitespace-nowrap'>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Main Dialog ─── */
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
  const [mm, setMm] = useState('');
  const [yy, setYy] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isCardFocused, setIsCardFocused] = useState(false);

  // Address state
  const [country, setCountry] = useState(() => detectCountryFromTimezone());
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressExpanded, setAddressExpanded] = useState(false);
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

  // Scroll state for sticky header
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);
  const addressSectionRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const cardType = getCardType(cardNumber);
  const cardDigits = cardNumber.replace(/\s/g, '');

  const selectedCountry =
    COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  // Check if required address fields are filled
  const addressRequiredFilled =
    addressLine1.trim().length > 0 && city.trim().length > 0;

  // Build address summary text
  const addressSummary = [addressLine1, addressLine2, city, postalCode]
    .filter(Boolean)
    .join(', ');

  // Auto-focus card input when dialog opens on card step
  useEffect(() => {
    if (isOpen && step === 'card' && !isEditing) {
      setTimeout(() => {
        cardInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, step, isEditing]);

  // Populate form when editing
  useEffect(() => {
    if (editingMethod && isOpen) {
      if (editingMethod.type === 'card') {
        setStep('card');
        setCardholderName(editingMethod.name || '');
        setCountry(editingMethod.country || detectCountryFromTimezone());
        setAddressLine1(editingMethod.addressLine1 || '');
        setAddressLine2(editingMethod.addressLine2 || '');
        setCity(editingMethod.city || '');
        setPostalCode(editingMethod.postalCode || '');
        if (
          editingMethod.addressLine1 ||
          editingMethod.city ||
          editingMethod.postalCode
        ) {
          setAddressExpanded(false); // Show summary when pre-filled
        }
      } else {
        setStep('bank');
        setAccountHolderName(editingMethod.name || '');
        setCountry(editingMethod.country || detectCountryFromTimezone());
        setAddressLine1(editingMethod.addressLine1 || '');
        setAddressLine2(editingMethod.addressLine2 || '');
        setCity(editingMethod.city || '');
        setPostalCode(editingMethod.postalCode || '');
      }
    }
  }, [editingMethod, isOpen]);

  // Close address section on outside click — only if required fields are filled
  useEffect(() => {
    if (!addressExpanded) return;
    const handler = (e: MouseEvent) => {
      if (
        addressSectionRef.current &&
        !addressSectionRef.current.contains(e.target as Node) &&
        addressRequiredFilled
      ) {
        setAddressExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [addressExpanded, addressRequiredFilled]);

  // Close country dropdown on outside click
  useEffect(() => {
    if (!isCountryOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isCountryOpen]);

  const formatCard = useCallback((val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 16);
    return nums.match(/.{1,4}/g)?.join(' ') || '';
  }, []);

  // Real-time card validation
  useEffect(() => {
    if (cardDigits.length === 16 && !isValidLuhn(cardNumber)) {
      setCardError(t('card_number_invalid'));
    } else {
      setCardError('');
    }
  }, [cardNumber, cardDigits, t]);

  // Real-time expiry validation
  useEffect(() => {
    if (mm.length === 2 && yy.length === 2) {
      const month = parseInt(mm, 10);
      const year = parseInt(yy, 10);
      if (month < 1 || month > 12) {
        setExpiryError(t('invalid_month'));
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          setExpiryError(t('card_expired'));
        } else {
          setExpiryError('');
        }
      }
    } else {
      setExpiryError('');
    }
  }, [mm, yy, t]);

  const resetForm = () => {
    setStep('select');
    setCardNumber('');
    setMm('');
    setYy('');
    setCvc('');
    setCardholderName('');
    setCountry(detectCountryFromTimezone());
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
    setAddressExpanded(false);
    setIsScrolled(false);
    setIsCardFocused(false);
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
        setCardError(t('card_number_required'));
        hasError = true;
      } else if (cardDigits.length !== 16) {
        setCardError(t('enter_16_digits'));
        hasError = true;
      } else if (!isValidLuhn(cardNumber)) {
        setCardError(t('card_number_invalid'));
        hasError = true;
      }
      if (mm.length === 0 || yy.length === 0) {
        setExpiryError(t('required_field'));
        hasError = true;
      } else if (mm.length !== 2 || yy.length !== 2) {
        setExpiryError(t('invalid_field'));
        hasError = true;
      }
      if (cvc.length === 0) {
        setCvcError(t('required_field'));
        hasError = true;
      } else if (cvc.length < 3) {
        setCvcError(t('invalid_field'));
        hasError = true;
      }
    }

    if (cardholderName.trim().length === 0) {
      setNameError(t('name_required'));
      hasError = true;
    } else {
      setNameError('');
    }
    if (addressLine1.trim().length === 0) {
      setAddressError(t('address_required'));
      setAddressExpanded(true);
      hasError = true;
    } else {
      setAddressError('');
    }
    if (city.trim().length === 0) {
      setCityError(t('city_required'));
      setAddressExpanded(true);
      hasError = true;
    } else {
      setCityError('');
    }

    return !hasError;
  };

  const validateBank = (): boolean => {
    const errors: Record<string, string> = {};
    if (!accountHolderName.trim())
      errors.accountHolderName = t('name_required');
    if (!bankName.trim()) errors.bankName = t('bank_name_required');
    if (!accountNumber.trim())
      errors.accountNumber = t('account_number_required');
    if (!routingNumber.trim())
      errors.routingNumber = t('routing_number_required');
    if (!addressLine1.trim()) {
      errors.addressLine1 = t('address_required');
      setAddressExpanded(true);
    }
    if (!city.trim()) {
      errors.city = t('city_required');
      setAddressExpanded(true);
    }
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
      onAdd({
        type: 'card',
        cardType,
        last4: cardDigits.slice(-4),
        expiry: `${mm}/${yy}`,
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

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 0);
    }
  };

  /* ─── Country selector (inside expanded address) ─── */
  const renderCountrySelector = () => (
    <div className='relative' ref={countryDropdownRef}>
      <div className='flex items-center gap-3'>
        <MapPin className='w-5 h-5 text-[#1a73e8] flex-shrink-0' />
        <button
          type='button'
          onClick={() => setIsCountryOpen(!isCountryOpen)}
          className='flex-1 flex items-center justify-between pb-2 border-b-2 border-[#dadce0] dark:border-gray-600 text-left'
        >
          <span className='flex items-center gap-2 text-[15px] text-[#202124] dark:text-white'>
            <ReactCountryFlag
              countryCode={country}
              svg
              style={{ width: '20px', height: '15px' }}
            />
            {selectedCountry.name} ({country})
          </span>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-[#5f6368] transition-transform duration-200',
              isCountryOpen && 'rotate-180',
            )}
          />
        </button>
      </div>

      {isCountryOpen && (
        <div className='absolute z-20 left-8 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-[#dadce0] dark:border-gray-600'>
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type='button'
              onClick={() => {
                setCountry(c.code);
                setIsCountryOpen(false);
              }}
              className={cn(
                'w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2',
                country === c.code
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#1a73e8]'
                  : 'text-[#202124] dark:text-white',
              )}
            >
              <ReactCountryFlag
                countryCode={c.code}
                svg
                style={{ width: '18px', height: '13px' }}
              />
              {c.name} ({c.code})
            </button>
          ))}
        </div>
      )}
    </div>
  );

  /* ─── Collapsible address section ─── */
  const renderAddressSection = (errors?: Record<string, string>) => {
    return (
      <div ref={addressSectionRef} className='mt-6'>
        {/* ── COLLAPSED STATE: show summary or default ── */}
        {!addressExpanded && (
          <div
            className='flex items-center gap-3 cursor-pointer group py-2'
            onClick={() => setAddressExpanded(true)}
          >
            <MapPin className='w-5 h-5 text-[#1a73e8] flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              {addressSummary ? (
                <p className='text-[15px] text-[#202124] dark:text-white truncate'>
                  {addressSummary}
                </p>
              ) : (
                <p className='text-[15px] text-[#5f6368] dark:text-gray-400'>
                  {t('billing_address')}
                </p>
              )}
            </div>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setAddressExpanded(true);
              }}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0'
              aria-label='Edit address'
            >
              <Pencil className='w-4 h-4 text-[#5f6368] dark:text-gray-400' />
            </button>
          </div>
        )}

        {/* ── EXPANDED STATE: country + address fields ── */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            addressExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          {/* Country selector */}
          {renderCountrySelector()}

          {/* Indented address fields */}
          <div className='ml-8 mt-4 space-y-5'>
            <FloatingField
              label={t('address_line_1')}
              value={addressLine1}
              onChange={(v) => {
                setAddressLine1(v);
                setAddressError('');
              }}
              error={addressError || errors?.addressLine1}
            />
            <FloatingField
              label={t('address_line_2')}
              value={addressLine2}
              onChange={setAddressLine2}
            />
            <FloatingField
              label={t('city')}
              value={city}
              onChange={(v) => {
                setCity(v);
                setCityError('');
              }}
              error={cityError || errors?.city}
            />
            <FloatingField
              label={t('postal_code')}
              value={postalCode}
              onChange={setPostalCode}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[520px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col'>
        {/* ─── Step 1: Select type ─── */}
        {step === 'select' && (
          <div className='p-6'>
            <DialogHeader>
              <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                {t('add_payment_method')}
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
                    {t('credit_debit_card')}
                  </div>
                  <div className='text-sm text-[#5f6368] dark:text-gray-400'>
                    {t('visa_mastercard_amex')}
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
                    {t('bank_account')}
                  </div>
                  <div className='text-sm text-[#5f6368] dark:text-gray-400'>
                    {t('link_bank_account')}
                  </div>
                </div>
                <ChevronRight className='w-5 h-5 text-gray-400' />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 2a: Card form ─── */}
        {step === 'card' && (
          <>
            {/* Sticky header */}
            <div
              className={cn(
                'sticky top-0 z-10 px-6 pt-6 pb-4 transition-colors duration-200',
                isScrolled
                  ? 'bg-[#f8f9fa] dark:bg-[#2d2d2d] shadow-sm'
                  : 'bg-white dark:bg-[#1f1f1f]',
              )}
            >
              <DialogHeader className='flex flex-row items-center justify-between'>
                <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                  {isEditing
                    ? t('edit_payment_method')
                    : t('add_payment_method')}
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className='rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  <X className='w-5 h-5 text-[#5f6368] dark:text-gray-400' />
                </button>
              </DialogHeader>
            </div>

            {/* Scrollable body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className='flex-1 overflow-y-auto px-6 pb-6'
            >
              <div className='space-y-7'>
                {!isEditing && (
                  <div className='flex items-start gap-4'>
                    {/* Card Number with brand icons */}
                    <div className='flex-1 min-w-0 relative'>
                      <div
                        className={cn(
                          'relative border-b-2 transition-colors duration-200',
                          cardError
                            ? 'border-[#d93025]'
                            : isCardFocused
                              ? 'border-[#1a73e8]'
                              : 'border-[#dadce0] dark:border-gray-600',
                        )}
                      >
                        <label
                          className={cn(
                            'absolute left-0 transition-all duration-200 pointer-events-none',
                            isCardFocused || cardNumber
                              ? 'top-0 text-[11px]'
                              : 'top-5 text-[15px]',
                            cardError
                              ? 'text-[#d93025]'
                              : isCardFocused
                                ? 'text-[#1a73e8]'
                                : 'text-[#5f6368] dark:text-gray-400',
                          )}
                        >
                          {t('card_number')}
                        </label>

                        <div className='flex items-end pt-5 pb-2'>
                          <input
                            ref={cardInputRef}
                            type='text'
                            inputMode='numeric'
                            autoComplete='cc-number'
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCard(e.target.value))
                            }
                            onFocus={() => setIsCardFocused(true)}
                            onBlur={() => setIsCardFocused(false)}
                            className='flex-1 text-[15px] text-[#202124] dark:text-white bg-transparent outline-none min-w-0'
                          />

                          {/* Card brand icons */}
                          <div
                            className={cn(
                              'flex items-center gap-1 ml-2 flex-shrink-0 transition-opacity duration-200',
                              (isCardFocused || cardNumber) &&
                                (!cardNumber || cardType)
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          >
                            {CARD_BRANDS.map((brand) => (
                              <div
                                key={brand.key}
                                className={cn(
                                  'transition-all duration-300 ease-in-out',
                                  cardType && cardType !== brand.key
                                    ? 'max-w-0 opacity-0 mx-0 overflow-hidden'
                                    : 'max-w-[28px] opacity-100',
                                )}
                              >
                                <Image
                                  src={brand.src}
                                  alt={brand.key}
                                  width={24}
                                  height={16}
                                  className='object-contain'
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {cardError && (
                        <div className='absolute top-full mt-1.5 flex items-start gap-1.5 text-[#d93025]'>
                          <svg
                            className='w-4 h-4 mt-0.5 flex-shrink-0'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                          >
                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                          </svg>
                          <span className='text-[12px]'>{cardError}</span>
                        </div>
                      )}
                    </div>

                    {/* MM / YY / CVC — separate floating inputs in same row */}
                    <div className='w-[60px] flex-shrink-0'>
                      <FloatingField
                        label='MM'
                        value={mm}
                        onChange={(v) =>
                          setMm(v.replace(/\D/g, '').slice(0, 2))
                        }
                        error={expiryError}
                        inputMode='numeric'
                        maxLength={2}
                      />
                    </div>

                    <div className='w-[60px] flex-shrink-0'>
                      <FloatingField
                        label='YY'
                        value={yy}
                        onChange={(v) =>
                          setYy(v.replace(/\D/g, '').slice(0, 2))
                        }
                        error={expiryError}
                        inputMode='numeric'
                        maxLength={2}
                      />
                    </div>

                    <div className='w-[60px] flex-shrink-0'>
                      <FloatingField
                        label={t('cvc')}
                        value={cvc}
                        onChange={(v) =>
                          setCvc(v.replace(/\D/g, '').slice(0, 4))
                        }
                        error={cvcError}
                        inputMode='numeric'
                        maxLength={4}
                      />
                    </div>
                  </div>
                )}

                {/* Cardholder Name */}
                <FloatingField
                  label={t('cardholder_name')}
                  value={cardholderName}
                  onChange={(v) => {
                    setCardholderName(v);
                    setNameError('');
                  }}
                  error={nameError}
                />

                {/* Address Section */}
                {renderAddressSection()}

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
                    {t('back')}
                  </button>
                )}
                <Button
                  onClick={handleSaveCard}
                  className='bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-8 h-9 rounded'
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ─── Step 2b: Bank form ─── */}
        {step === 'bank' && (
          <>
            {/* Sticky header */}
            <div
              className={cn(
                'sticky top-0 z-10 px-6 pt-6 pb-4 transition-colors duration-200',
                isScrolled
                  ? 'bg-[#f8f9fa] dark:bg-[#2d2d2d] shadow-sm'
                  : 'bg-white dark:bg-[#1f1f1f]',
              )}
            >
              <DialogHeader>
                <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
                  {isEditing ? t('edit_bank_account') : t('add_bank_account')}
                </DialogTitle>
              </DialogHeader>
            </div>

            {/* Scrollable body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className='flex-1 overflow-y-auto px-6 pb-6'
            >
              <div className='space-y-5'>
                {/* Account Holder Name */}
                <FloatingField
                  label={t('account_holder_name')}
                  value={accountHolderName}
                  onChange={(v) => {
                    setAccountHolderName(v);
                    setBankErrors((p) => ({
                      ...p,
                      accountHolderName: '',
                    }));
                  }}
                  error={bankErrors.accountHolderName}
                />

                {!isEditing && (
                  <>
                    <FloatingField
                      label={t('bank_name')}
                      value={bankName}
                      onChange={(v) => {
                        setBankName(v);
                        setBankErrors((p) => ({ ...p, bankName: '' }));
                      }}
                      error={bankErrors.bankName}
                    />
                    <FloatingField
                      label={t('account_number')}
                      value={accountNumber}
                      onChange={(v) => {
                        setAccountNumber(v.replace(/\D/g, ''));
                        setBankErrors((p) => ({
                          ...p,
                          accountNumber: '',
                        }));
                      }}
                      inputMode='numeric'
                      error={bankErrors.accountNumber}
                    />
                    <FloatingField
                      label={t('routing_number')}
                      value={routingNumber}
                      onChange={(v) => {
                        setRoutingNumber(v.replace(/\D/g, ''));
                        setBankErrors((p) => ({
                          ...p,
                          routingNumber: '',
                        }));
                      }}
                      inputMode='numeric'
                      error={bankErrors.routingNumber}
                    />
                  </>
                )}

                {/* Address Section */}
                {renderAddressSection(bankErrors)}

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
                    {t('back')}
                  </button>
                )}
                <Button
                  onClick={handleSaveBank}
                  className='bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-8 h-9 rounded'
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
