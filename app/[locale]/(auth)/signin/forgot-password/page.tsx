'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';
  const router = useRouter();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!email) {
      setError(t('auth_email_required'));
      return;
    }

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
        const userName = data.userName || name;
        router.push(
          `/signin/forgot-password/verify-code?email=${email}&name=${userName}`
        );
      } else {
        setError(data.message || t('auth_generic_error'));
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(t('auth_network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth_get_verification_code')}
      description={t('auth_verification_description')}
      isLoading={isLoading}
    >
      <div className='space-y-3'>
        {/* Verification Code Image */}
        <div className='flex justify-start'>
          <div className='relative w-96 h-full'>
            {/* Light mode image */}
            <Image
              src='/code-light.svg'
              alt='Verification code illustration'
              width={192}
              height={128}
              className='block dark:hidden size-full'
            />
            {/* Dark mode image */}
            <Image
              src='/code-dark.svg'
              alt='Verification code illustration'
              width={192}
              height={128}
              className='hidden dark:block size-full'
            />
          </div>
        </div>

        {/* Verification Message */}
        <p className='text-sm text-gray-700 dark:text-[#E3E3E3]'>
          {t('auth_code_sent_to')} <span className='font-medium'>{email}</span>
        </p>

        {error && <Error error={error} />}

        {/* Action Buttons */}
        <div className='flex items-center md:justify-end justify-between gap-10 pt-6'>
          <Link
            href={`/signin/pwd?email=${email}&name=${name}`}
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline focus:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded'
          >
            {t('cancel')}
          </Link>
          <Button
            onClick={handleSendOtp}
            disabled={isLoading || !email}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_get')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
