'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';

const ResidencePage = () => {
  const [country, setCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (country.trim() && nationality.trim()) {
      // Navigate to next step in the verification process
      router.push('/basic-info'); // or wherever the next step should be
    }
  };

  const isFormValid = country.trim() && nationality.trim();

  return (
    <AuthLayout
      title={t('auth_verify_account')}
      description={t('auth_verify_residence')}
    >
      <div className='space-y-6'>
        <div className='space-y-2'>
          <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3]'>
            {t('auth_location_nationality')}
          </p>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            id='country'
            type='text'
            placeholder={t('auth_country_residence')}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />

          <Input
            id='nationality'
            type='text'
            placeholder={t('auth_nationality')}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />

          <div className='flex justify-end pt-6'>
            <Button
              type='submit'
              disabled={!isFormValid}
              className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {t('auth_next')}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResidencePage;
