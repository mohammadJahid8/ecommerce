'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'jgddaraujo@gmail.com';
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verifying code:', code, 'for email:', email);
    // Handle code verification
  };

  return (
    <AuthLayout
      title={t('auth_enter_code')}
      description={t('auth_verification_description')}
    >
      <div className='space-y-3 md:space-y-4'>
        {/* Verification Message */}
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3]'>
          {t('auth_code_was_sent')}{' '}
          <span className='font-medium'>{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            id='code'
            type='text'
            placeholder={t('auth_enter_code_placeholder')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
            maxLength={6}
            autoComplete='one-time-code'
          />

          <div className='flex items-center justify-end pt-6'>
            <Button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
            >
              {t('auth_next')}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
