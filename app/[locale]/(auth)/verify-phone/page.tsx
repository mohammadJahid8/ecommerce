'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import AuthLayout from '@/components/auth/auth-layout';

export default function VerifyPhonePage() {
  const { t } = useTranslation();
  
  return (
    <AuthLayout
      title={t('auth_prove_not_robot')}
      // description={t('auth_receive_verification')}
    >
      <form
        className='space-y-3 md:space-y-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p
            // htmlFor='phone-input'
            className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-4'
          >
            {t('auth_receive_verification')}
          </p>
          <PhoneInput
            id='phone-input'
            placeholder={t('auth_phone_placeholder')}
            className='h-[54px] text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
        </div>
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pt-4'>
          {t('auth_sms_charges')}
        </p>
        <div className='flex items-center justify-end gap-10 pt-6'>
          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            {t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
