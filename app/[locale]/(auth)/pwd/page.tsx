'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'mohammadjahid000@gmail.com';

  // Extract name from email (this would typically come from user data)
  const userName = 'John Doe';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password verification
    console.log('Verifying password for:', email);
  };

  return (
    <AuthLayout
      title={userName}
      description={
        <>
          <div className='text-sm text-gray-700 dark:text-[#E3E3E3] border border-gray-300 dark:border-gray-500 rounded-full px-3.5 py-1.5 w-fit font-semibold'>
            {email}
          </div>
        </>
      }
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='password' className='sr-only'>
            Verify that it is you in order to continue
          </Label>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-6'>
            {t('auth_verify_identity')}
          </p>

          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth_enter_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0 pr-20'
          />

          <div className='flex items-center gap-4 my-2'>
            <input
              type='checkbox'
              id='show-password'
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <Label
              htmlFor='show-password'
              className='text-sm text-gray-700 dark:text-[#E3E3E3] cursor-pointer'
            >
              {t('auth_show_password')}
            </Label>
          </div>
        </div>

        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href='/forgot-password'
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
          >
            {t('auth_forgot_password')}
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
