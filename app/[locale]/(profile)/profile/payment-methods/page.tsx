'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import AddPaymentMethodDialog from '@/components/profile/AddPaymentMethodDialog';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileDrawer from '@/components/profile/ProfileDrawer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, useParams } from 'next/navigation';

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

export default function PaymentMethodsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { paymentMethods, isLoading, addPaymentMethod, removePaymentMethod } =
    usePaymentMethods();

  const handleAddPaymentMethod = (method: {
    type: 'card' | 'bank';
    cardType?: string;
    last4: string;
    expiry: string;
    name: string;
  }) => {
    addPaymentMethod(method);
  };

  const handleDrawerItemClick = (item: 'personal-info' | 'payment-methods') => {
    if (item === 'personal-info') {
      router.push(`/${locale}/profile`);
    }
    // Already on payment-methods, do nothing
  };

  if (isLoading) {
    return (
      <>
        <ProfileHeader
          userInitial='J'
          userName='Loading...'
          userEmail=''
          onMenuClick={() => setIsDrawerOpen(true)}
        />
        <div className='min-h-screen bg-[#f0f4f9] dark:bg-[#1f1f1f] p-4 md:p-8'>
          <div className='max-w-[850px] mx-auto'>
            <Skeleton className='h-10 w-64 mb-2' />
            <Skeleton className='h-5 w-96 mb-6' />
            <Skeleton className='h-10 w-48 mb-8' />
            <div className='space-y-4'>
              <Skeleton className='h-24 w-full rounded-lg' />
              <Skeleton className='h-24 w-full rounded-lg' />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='min-h-screen bg-[#f0f4f9] dark:bg-[#1f1f1f] '>
        <div className='max-w-[850px] mx-auto p-4 md:p-8'>
          {/* Page Header */}
          <h1 className='text-[40px] font-normal text-[#202124] dark:text-white mb-2'>
            {t('profile_payment_methods') || 'Payment methods'}
          </h1>
          <p className='text-base text-[#5f6368] dark:text-gray-400 mb-6'>
            {t('payment_methods_desc') ||
              'Add, view, and manage payment methods saved in your Wallet'}
          </p>

          {/* Add Payment Method Button */}
          {paymentMethods.length !== 0 && (
            <Button
              onClick={() => setIsDialogOpen(true)}
              className='bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full mb-8 hover:shadow-md'
            >
              {t('add_payment_method') || 'Add payment method'}
            </Button>
          )}

          {/* Payment Methods List or Empty State */}
          {paymentMethods.length === 0 ? (
            <div className='bg-white dark:bg-[#2d2d2d] rounded-2xl p-12 text-center'>
              {/* Thumbs Up Illustration */}
              <div className='mx-auto mb-6 relative'>
                <Image
                  src='/fop_empty.svg'
                  alt='No payment methods'
                  className='mx-auto'
                  width={200}
                  height={200}
                />
              </div>

              <h2 className='text-xl font-medium text-[#202124] dark:text-white mb-2'>
                {t('no_payment_methods') || 'No payment methods yet'}
              </h2>
              <p className='text-[#5f6368] dark:text-gray-400 mb-6 max-w-md mx-auto'>
                {t('no_payment_methods_desc') ||
                  'Add a payment method so you can make faster, easier payments'}
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className='bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full hover:shadow-md'
              >
                {t('add_payment_method') || 'Add payment method'}
              </Button>
            </div>
          ) : (
            <div className='bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 space-y-4'>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className='flex items-center p-4 bg-[#f8f9fa] dark:bg-[#3c4043] rounded-2xl hover:bg-[#d6d8da]'
                >
                  {/* Card Icon */}
                  <div className='rounded overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center mr-4'>
                    <Image
                      src={
                        method.cardType
                          ? CARD_ICONS[method.cardType] ||
                            CARD_ICONS.placeholder
                          : CARD_ICONS.placeholder
                      }
                      alt={method.cardType || 'card'}
                      width={130}
                      height={130}
                      className='object-contain'
                    />
                  </div>

                  {/* Card Info */}
                  <div className='flex-1'>
                    <div className='text-xl font-medium text-[#202124] dark:text-white'>
                      {method.name || getCardDisplayName(method.cardType || '')}{' '}
                      •••• {method.last4}
                    </div>
                    <div className='text-sm text-[#5f6368] dark:text-gray-400'>
                      {method.expiry}
                    </div>
                  </div>

                  {/* Delete Button */}
                  {/* <button
                    onClick={() => removePaymentMethod(method.id)}
                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors opacity-0 group-hover:opacity-100'
                    aria-label='Remove payment method'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddPaymentMethodDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={handleAddPaymentMethod}
      />
    </>
  );
}
