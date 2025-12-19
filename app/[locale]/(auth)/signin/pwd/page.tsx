'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const userName = searchParams.get('name') || 'John Doe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/signin/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('userId', data.userId);
        router.push('/profile');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={userName}
      description={
        <>
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-[#E3E3E3] border border-gray-300 dark:border-gray-500 rounded-full p-1 pr-3 w-fit font-medium'>
            <div className='w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs uppercase'>
              {email?.charAt(0)}
            </div>
            <span className='text-gray-900 dark:text-white'>{email}</span>
          </div>
        </>
      }
      isLoading={isLoading}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-6'>
            {t('auth_verify_identity')}
          </p>

          <FloatingInput
            id='password'
            label={t('auth_enter_password')}
            type='password'
            value={password}
            onChange={(value) => {
              setPassword(value);
              setError('');
            }}
            onClear={() => setError('')}
            showPasswordToggle
          />

          {error && <Error error={error} />}
        </div>

        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href={`/signin/forgot-password?email=${email}&name=${userName}`}
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
          >
            {t('auth_forgot_password')}
          </Link>
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
