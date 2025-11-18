'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={cn(className)} viewBox='0 0 24 24'>
      <path
        fill='#4285F4'
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      />
      <path
        fill='#34A853'
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      />
      <path
        fill='#FBBC05'
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      />
      <path
        fill='#EA4335'
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg className='w-5 h-5' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'
      />
    </svg>
  );
}

export default function SignInPage() {
  const [identifier, setIdentifier] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const isPhoneNumber = (value: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPhoneNumber(identifier)) {
      router.push('/verify-phone');
    } else {
      router.push(`/pwd?email=${identifier}`);
    }
  };

  return (
    <AuthLayout
      title={t('auth_sign_in')}
      description={
        <>
          {t('auth_go_back_to')}{' '}
          <Link
            href='/'
            className='text-blue-600 dark:text-[#A8C7FA] hover:underline'
          >
            {t('auth_home')}
          </Link>{' '}
        </>
      }
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='identifier' className='sr-only'>
            {t('auth_email_or_phone')}
          </Label>
          <div className='relative'>
            <Input
              id='identifier'
              type='text'
              placeholder={t('auth_email_or_phone')}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0 pr-10'
            />
            {identifier && (
              <button
                type='button'
                onClick={() => setIdentifier('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
                aria-label='Clear input'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
          <div className='pt-2'>
            <Link
              href='#'
              className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
            >
              {t('auth_forgot_email')}
            </Link>
          </div>
        </div>

        <div className='flex items-center gap-2 pt-6'>
          <Button
            variant='outline'
            className='w-full h-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium text-sm transition-colors flex items-center justify-center'
            onClick={() => {}}
          >
            <GoogleMark className='w-5 h-5' />
            {t('auth_google')}
          </Button>

          <Button
            variant='outline'
            className='w-full h-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium text-sm transition-colors flex items-center justify-center'
            onClick={() => {}}
          >
            <AppleMark />
            {t('auth_apple')}
          </Button>
        </div>

        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href='#'
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline'
          >
            {t('auth_create_account')}
          </Link>
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
