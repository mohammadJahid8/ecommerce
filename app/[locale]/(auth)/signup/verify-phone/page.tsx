'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import AuthLayout from '@/components/auth/auth-layout';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-config';

export default function VerifyPhonePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber) {
      setError(t('auth_phone_required'));
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');

      // ... inside component
      const response = await fetch(`${API_BASE_URL}/signup/verify-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phoneNumber }),
      });
      if (response.ok) {
        router.push(
          `/signup/verify-phone-code?phone=${encodeURIComponent(phoneNumber)}`
        );
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
      title={t('auth_prove_not_robot')}
      description={t('verify_phone_description')}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <p
            // htmlFor='phone-input'
            className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-4'
          >
            {t('auth_receive_verification')}
          </p>
          <PhoneInput
            id='phone-input'
            placeholder={t('auth_phone_placeholder')}
            value={phoneNumber}
            onChange={setPhoneNumber}
            className='h-[54px] text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
        </div>
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pt-4'>
          {t('auth_sms_charges')}
        </p>
        <div className='flex flex-col items-end pt-6'>
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
          <Button
            type='submit'
            disabled={isLoading || !phoneNumber}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
