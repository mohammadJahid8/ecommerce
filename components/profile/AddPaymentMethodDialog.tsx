'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { CreditCard, Building2, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

// Get card display name
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

interface AddPaymentMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (method: {
    type: 'card' | 'bank';
    cardType?: string;
    last4: string;
    expiry: string;
    name: string;
  }) => void;
}

type Step = 'select' | 'card' | 'bank';

export default function AddPaymentMethodDialog({
  isOpen,
  onOpenChange,
  onAdd,
}: AddPaymentMethodDialogProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('select');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  // Errors
  const [cardError, setCardError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [nameError, setNameError] = useState('');

  const cardType = getCardType(cardNumber);
  const cardDigits = cardNumber.replace(/\s/g, '');

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
    setCardError('');
    setExpiryError('');
    setCvcError('');
    setNameError('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetForm, 200);
  };

  const validateCard = (): boolean => {
    let hasError = false;

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

    if (cardholderName.trim().length === 0) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    return !hasError;
  };

  const handleAddCard = () => {
    if (validateCard()) {
      const parts = expiry.split(' / ');
      onAdd({
        type: 'card',
        cardType: cardType,
        last4: cardDigits.slice(-4),
        expiry: `${parts[0]}/${parts[1]}`,
        name: cardholderName.trim() || getCardDisplayName(cardType),
      });
      handleClose();
    }
  };

  const hasAnyError = cardError || expiryError || cvcError || nameError;
  const cardIconPath = cardType ? CARD_ICONS[cardType] : CARD_ICONS.placeholder;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[480px] p-0 gap-0 overflow-hidden'>
        <div className='p-6'>
          <DialogHeader>
            <DialogTitle className='text-[22px] font-normal text-[#202124] dark:text-white'>
              {t('add_payment_method') || 'Add payment method'}
            </DialogTitle>
          </DialogHeader>

          <div className='mt-6 space-y-4'>
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
                {t('cardholder_name') || 'Name on card'}
              </label>
              <input
                type='text'
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder='John Doe'
                className={cn(
                  'w-full mt-2 pb-2 text-base bg-transparent outline-none border-b-2 transition-colors placeholder:text-[#80868b]',
                  nameError
                    ? 'border-[#d93025] text-[#d93025]'
                    : 'border-[#dadce0] dark:border-gray-600 focus:border-[#1a73e8] text-[#202124] dark:text-white',
                )}
              />
            </div>

            {/* Card Number Label */}
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

              {/* Input fields row */}
              <div
                className={cn(
                  'flex items-end mt-2 pb-2 border-b-2 transition-colors',
                  hasAnyError && !nameError
                    ? 'border-[#d93025]'
                    : 'border-[#dadce0] dark:border-gray-600 focus-within:border-[#1a73e8]',
                )}
              >
                {/* Card Number */}
                <input
                  type='text'
                  inputMode='numeric'
                  autoComplete='cc-number'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCard(e.target.value))}
                  placeholder='0000 0000 0000 0000'
                  className='flex-1 text-base text-[#202124] dark:text-white bg-transparent outline-none placeholder:text-[#80868b]'
                />

                {/* Card Icon */}
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

                {/* Expiry */}
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

                {/* CVC */}
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

              {/* Error Messages */}
              {hasAnyError && (
                <div className='mt-3 flex items-start gap-2 text-[#d93025]'>
                  <svg
                    className='w-4 h-4 mt-0.5 flex-shrink-0'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                  </svg>
                  <span className='text-[13px]'>
                    {nameError || cardError || expiryError || cvcError}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-end items-center gap-4 mt-8 pt-4 border-t border-[#dadce0] dark:border-gray-700'>
            <button
              onClick={() => setStep('select')}
              className='text-[#1a73e8] text-sm font-medium hover:underline'
            >
              {t('back') || 'Back'}
            </button>
            <Button
              onClick={handleAddCard}
              className='bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-6 h-9 rounded'
            >
              {t('add') || 'Add'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
