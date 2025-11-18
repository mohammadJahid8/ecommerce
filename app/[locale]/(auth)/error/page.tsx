'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';

const ErrorPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth_error_occurred')}
      description={t('auth_error_try_again')}
    >
      <div className='space-y-6'>
        <div className='h-32' />

        <div className='flex justify-end pt-6'>
          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {t('auth_next')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ErrorPage;
