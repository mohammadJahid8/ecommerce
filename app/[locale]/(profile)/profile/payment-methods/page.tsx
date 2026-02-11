'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  usePaymentMethods,
  type PaymentMethod,
  type PaymentMethodInput,
} from '@/hooks/usePaymentMethods';
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
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(
    null,
  );
  const {
    paymentMethods,
    isLoading,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
  } = usePaymentMethods();

  const handleAddPaymentMethod = (method: PaymentMethodInput) => {
    addPaymentMethod(method);
  };

  const handleUpdatePaymentMethod = (
    id: string,
    updates: Partial<PaymentMethodInput>,
  ) => {
    updatePaymentMethod(id, updates);
  };

  const handleCardClick = (method: PaymentMethod) => {
    setEditingMethod(method);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setTimeout(() => setEditingMethod(null), 200);
    }
  };

  const handleDrawerItemClick = (item: 'personal-info' | 'payment-methods') => {
    if (item === 'personal-info') {
      router.push(`/${locale}/profile`);
    }
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
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        activeItem='payment-methods'
        onItemClick={handleDrawerItemClick}
      />

      <div className='min-h-screen bg-[#f0f4f9] dark:bg-[#1f1f1f]'>
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
              onClick={() => {
                setEditingMethod(null);
                setIsDialogOpen(true);
              }}
              className='bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full mb-8 hover:shadow-md'
            >
              {t('add_payment_method') || 'Add payment method'}
            </Button>
          )}

          {/* Payment Methods List or Empty State */}
          {paymentMethods.length === 0 ? (
            <div className='bg-white dark:bg-[#2d2d2d] rounded-2xl p-12 text-center'>
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
                onClick={() => {
                  setEditingMethod(null);
                  setIsDialogOpen(true);
                }}
                className='bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full hover:shadow-md'
              >
                {t('add_payment_method') || 'Add payment method'}
              </Button>
            </div>
          ) : (
            <div className='bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 space-y-4'>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleCardClick(method)}
                  className='w-full flex items-center p-4 bg-[#f8f9fa] dark:bg-[#3c4043] rounded-2xl hover:bg-[#d6d8da] dark:hover:bg-[#4a4d51] transition-colors cursor-pointer text-left'
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
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddPaymentMethodDialog
        isOpen={isDialogOpen}
        onOpenChange={handleDialogClose}
        onAdd={handleAddPaymentMethod}
        onUpdate={handleUpdatePaymentMethod}
        editingMethod={editingMethod}
      />
    </>
  );
}
