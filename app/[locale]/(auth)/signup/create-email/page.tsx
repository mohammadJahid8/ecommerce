'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function CreateEmailPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(t('auth_invalid_email'));
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');

      const response = await fetch(`${API_BASE_URL}/signup/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
      });
      if (response.ok) {
        router.push('/signup/create-password');
      } else {
        const data = await response.json();
        setError(data.message || data.error || t('auth_generic_error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(t('auth_network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth_how_youll_sign_in')}
      description={t('auth_create_gmail_address')}
      isLoading={isLoading}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <FloatingInput
            id='email'
            label={t('profile_email')}
            type='email'
            value={email}
            onChange={setEmail}
            required
          />
          <div className='pt-2'>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              {t('auth_username_hint')}
            </p>
          </div>
        </div>

        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pt-4'>
          {t('auth_by_continuing')}
        </p>

        <div className='flex flex-col items-end pt-6 md:pt-16'>
          {error && <Error error={error} />}
          <Button
            type='submit'
            disabled={isLoading || !email}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
