'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { API_BASE_URL } from '@/lib/api-config';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        // Handle invalid password with translated message
        if (data.message === 'Invalid password') {
          setError(t('auth_wrong_password'));
        } else {
          setError(data.message || t('auth_wrong_password'));
        }
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setError(t('auth_network_error'));
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(value) => {
              setPassword(value);
              setError('');
            }}
            onClear={() => setError('')}
            error={error}
          />

          {/* Show Password Checkbox */}
          <div className='flex items-center gap-3 pt-3'>
            <input
              type='checkbox'
              id='show-password'
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className='w-[18px] h-[18px] rounded border-gray-300 dark:border-gray-500 text-blue-600 dark:text-[#A8C7FA] focus:ring-blue-500 dark:focus:ring-[#A8C7FA] cursor-pointer accent-blue-600 dark:accent-[#A8C7FA]'
            />
            <label
              htmlFor='show-password'
              className='text-sm text-gray-700 dark:text-[#E3E3E3] cursor-pointer select-none'
            >
              {t('auth_show_password')}
            </label>
          </div>
        </div>

        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href={`/signin/forgot-password?email=${email}&name=${userName}`}
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] px-6 py-2.5 rounded-full hover:bg-blue-50 dark:hover:bg-[#A8C7FA]/10 transition-colors'
          >
            {t('auth_forgot_password')}
          </Link>
          <Button
            type='submit'
            disabled={isLoading || !password}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
