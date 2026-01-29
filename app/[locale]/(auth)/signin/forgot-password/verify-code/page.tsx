'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import Error from '@/components/auth/error';
import { API_BASE_URL } from '@/lib/api-config';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';
  const router = useRouter();
  const { t } = useTranslation();

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (value: string) => {
    // Only allow digits and max 6 characters
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 6) {
      setCode(digitsOnly);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError(t('auth_code_invalid'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push(
          `/signin/forgot-password/welcome?email=${email}&name=${
            data.userName || name
          }`
        );
      } else {
        setError(data.message || t('auth_invalid_code'));
      }
    } catch (err) {
      console.error('Error verifying code:', err);
      setError(t('auth_network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setTimeLeft(60);
        setCanResend(false);
        setCode('');
      } else {
        setError(data.message || t('auth_generic_error'));
      }
    } catch (err) {
      console.error('Error resending code:', err);
      setError(t('auth_network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth_enter_code')}
      description={''}
      isLoading={isLoading}
    >
      <div className='space-y-3 md:space-y-4'>
        {/* Verification Message */}
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3]'>
          {t('auth_code_was_sent_email')}{' '}
          <span className='font-medium'>{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <FloatingInput
            id='code'
            label={t('auth_enter_code_placeholder')}
            type='text'
            value={code}
            onChange={handleCodeChange}
            prefix='N-'
          />

          {error && (
            <div className='mt-2'>
              <Error error={error} />
            </div>
          )}

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
