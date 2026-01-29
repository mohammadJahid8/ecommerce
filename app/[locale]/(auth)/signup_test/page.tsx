'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import { X } from 'lucide-react';

export default function SignupPage() {
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
      // Handle email signup
      console.log('Signing up with email:', identifier);
    }
  };

  return (
    <AuthLayout
      title={t('auth_welcome')}
      description={t('auth_enter_email_phone')}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <div className='relative'>
            <Input
              id='identifier'
              type='text'
              placeholder={t('auth_email_or_phone_placeholder')}
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
              {t('auth_contact_method')}
            </Link>
          </div>
        </div>

        <div className='pt-4'>
          <p className='text-sm dark:text-[#E3E3E3] text-gray-600 leading-relaxed'>
            {t('auth_terms_agreement')}{' '}
            <Link
              href='#'
              className='text-blue-600 dark:text-[#A8C7FA] hover:underline'
            >
              {t('auth_terms_of_service')}
            </Link>{' '}
            {t('auth_and')}{' '}
            <Link
              href='#'
              className='text-blue-600 dark:text-[#A8C7FA] hover:underline'
            >
              {t('auth_privacy_policy')}
            </Link>
            .
          </p>
        </div>

        <div className='flex items-center justify-end pt-6'>
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
