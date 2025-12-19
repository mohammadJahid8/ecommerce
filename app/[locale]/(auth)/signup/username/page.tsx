'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

const BasicInfoPage = () => {
  const [country, setCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (country.trim() && nationality.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/signup/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: `${country} ${nationality}` }),
        });
        const data = await response.json();
        console.log('🚀 ~ handleSubmit ~ data:', data);
        if (response.ok) {
          localStorage.setItem('userId', data.userId);
          router.push('/signup/dob');
        } else {
          setError(data.message || data.error || t('auth_generic_error'));
        }
      } catch (error) {
        console.error('Error:', error);
        setError(t('auth_network_error'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = country.trim() && nationality.trim();

  return (
    <AuthLayout
      title={t('auth_create_google_account')}
      description={t('auth_enter_name')}
      isLoading={isLoading}
    >
      <div className='space-y-6'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <FloatingInput
            id='country'
            label={t('auth_first_name')}
            type='text'
            value={country}
            onChange={setCountry}
          />

          <FloatingInput
            id='nationality'
            label={t('auth_first_surname')}
            type='text'
            value={nationality}
            onChange={setNationality}
          />
          {error && <Error error={error} />}
          <div className='flex flex-col items-end pt-6'>
            <Button
              type='submit'
              disabled={!isFormValid || isLoading}
              className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? t('auth_loading') : t('auth_next')}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default BasicInfoPage;
