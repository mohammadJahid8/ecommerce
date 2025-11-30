'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/components/auth/auth-layout';
import { API_BASE_URL } from '@/lib/api-config';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      // Using port 5005 as confirmed by backend file check
      const response = await fetch(`${API_BASE_URL}/signup/verify-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phoneNumber: phone }),
      });

      if (response.ok) {
        setTimeLeft(60);
        setCanResend(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length < 6) {
      setError(t('auth_code_invalid'));
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      // Using port 5005 as confirmed by backend file check
      const response = await fetch(`${API_BASE_URL}/signup/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code }),
      });
      if (response.ok) {
        router.push('/signup/review-account');
      } else {
        const data = await response.json();
        setError(data.message || data.error || t('auth_invalid_code'));
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
      title={t('auth_enter_code')}
      description={t('auth_verification_description')}
    >
      <div className='space-y-3 md:space-y-4'>
        {/* Verification Message */}
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3]'>
          {t('auth_code_was_sent')} <span className='font-medium'>{phone}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-[#E3E3E3] '>
              N-
            </span>
            <Input
              id='code'
              type='text'
              placeholder={t('auth_enter_code_placeholder')}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='h-[54px] pl-12 !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
              maxLength={6}
              autoComplete='one-time-code'
            />
          </div>

          <div className='flex items-center md:justify-end justify-between gap-10 pt-24'>
            <button
              type='button'
              onClick={handleResendCode}
              disabled={!canResend || isLoading}
              className={`text-sm font-medium ${
                canResend
                  ? 'text-blue-600 hover:underline cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
              } dark:text-[#A8C7FA] outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded`}
            >
              {canResend
                ? t('auth_resend_code_link')
                : t('auth_resend_code_timer', { seconds: timeLeft })}
            </button>
            <div className='flex flex-col items-end'>
              {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
              <Button
                type='submit'
                disabled={isLoading || code.length < 6}
                className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? t('auth_loading') : t('auth_next')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
