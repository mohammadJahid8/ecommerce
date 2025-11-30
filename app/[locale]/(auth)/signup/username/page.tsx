'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/components/auth/auth-layout';
import { API_BASE_URL } from '@/lib/api-config';

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
        // ... inside component
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
    >
      <div className='space-y-6'>
        {/* <div className='space-y-2'>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3]'>
            {t('auth_passport_info')}
          </p>
        </div> */}

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            id='country'
            type='text'
            placeholder={t('auth_first_name')}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />

          <Input
            id='nationality'
            type='text'
            placeholder={t('auth_first_surname')}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
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
