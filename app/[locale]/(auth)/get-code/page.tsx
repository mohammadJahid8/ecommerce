'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import Image from 'next/image';

export default function GetCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'jgddaraujo@gmail.com';
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth_get_verification_code')}
      description={t('auth_verification_description')}
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
          {t('auth_code_sent_to')}{' '}
          <span className='font-medium'>{email}</span>
        </p>

        {/* Action Buttons */}
        <div className='flex items-center justify-end pt-6'>
          <Button
            onClick={() => router.push('/verify-code')}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            {t('auth_get')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
