'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function CreatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMismatchError, setShowMismatchError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const userName = searchParams.get('name') || '';
  const { t } = useTranslation();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setShowMismatchError(false);
    setError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setShowMismatchError(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password length
    if (password.length < 8) {
      setError(t('auth_password_min_length'));
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setShowMismatchError(true);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/forgot-password/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('userId', data.userId);
        router.push('/profile');
      } else {
        setError(data.message || t('auth_generic_error'));
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(t('auth_network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth_create_secure_password')}
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
      isLoading={isLoading}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <p className='text-base md:text-lg text-gray-700 dark:text-[#E3E3E3] pb-2'>
            {t('auth_strong_password')}
          </p>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-6'>
            {t('auth_strong_password_description')}
          </p>
          <FloatingInput
            id='password'
            label={t('auth_password_placeholder')}
            type='password'
            value={password}
            onChange={handlePasswordChange}
            showPasswordToggle
          />
        </div>

        <FloatingInput
          id='confirm-password'
          label={t('auth_confirm_placeholder')}
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          showPasswordToggle
        />
        <span className='mt-2 text-xs text-gray-700 dark:text-[#E3E3E3] pl-3'>
          {t('auth_atleast')}
        </span>

        {/* Password Mismatch Error */}
        {showMismatchError && (
          <div className='flex items-start'>
            <AlertCircle className='w-4 h-4 text-red-500 dark:text-red-300 mt-0.5 mr-2 flex-shrink-0' />
            <div className='text-sm text-red-700 dark:text-red-300'>
              <p className='font-medium'>{t('auth_password_mismatch')}</p>
            </div>
          </div>
        )}

        {/* API Error */}
        {error && <Error error={error} />}

        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href='/profile'
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
          >
            {t('auth_skip')}
          </Link>
          <Button
            type='submit'
            disabled={isLoading || !password || !confirmPassword}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_save_password')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
