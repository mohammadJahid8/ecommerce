'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function CreatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setShowError(false);
    setApiError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setShowError(false);
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (password && confirmPassword && password !== confirmPassword) {
      setShowError(true);
      return;
    }

    if (password && confirmPassword) {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');

        const response = await fetch(`${API_BASE_URL}/signup/password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, password }),
        });
        if (response.ok) {
          router.push('/signup/verify-phone');
        } else {
          const data = await response.json();
          setApiError(data.message || data.error || t('auth_generic_error'));
        }
      } catch (error) {
        console.error('Error:', error);
        setApiError(t('auth_network_error'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout
      title={t('auth_create_secure_password')}
      description={t('auth_password_description')}
      isLoading={isLoading}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <FloatingInput
          id='password'
          label={t('auth_password_placeholder')}
          type='password'
          value={password}
          onChange={handlePasswordChange}
          showPasswordToggle
        />

        <FloatingInput
          id='confirm-password'
          label={t('auth_confirm_placeholder')}
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          showPasswordToggle
        />

        {/* Error Message */}
        {showError && <Error error={t('auth_password_mismatch')} />}

        <div className='flex flex-col items-end pt-6'>
          {apiError && <Error error={apiError} />}
          <Button
            type='submit'
            disabled={isLoading || !password || !confirmPassword}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
