'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';

export default function WelcomePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const userName = searchParams.get('name') || 'User';

  const handleSkip = () => {
    router.push('/profile');
  };

  return (
    <AuthLayout
      title={t('auth_welcome')}
      description={
        <>
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-[#E3E3E3] border border-gray-300 dark:border-gray-500 rounded-full p-1 pr-3 w-fit font-medium'>
            <div className='w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs uppercase'>
              {email?.charAt(0) || userName?.charAt(0)}
            </div>
            <span className='text-gray-900 dark:text-white'>{email}</span>
          </div>
        </>
      }
    >
      <div className='space-y-3 md:space-y-4'>
        <div>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-6'>
            {t('auth_update_password')}
          </p>
        </div>

        <div className='flex items-center md:justify-end justify-between gap-10 pt-32'>
          <Link
            href={`/signin/forgot-password/create-password?email=${email}&name=${userName}`}
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
          >
            {t('update_password')}
          </Link>
          <Button
            onClick={handleSkip}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            {t('auth_skip')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
