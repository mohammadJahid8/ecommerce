'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setShowError(false); // Hide error when user starts typing
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setShowError(false); // Hide error when user starts typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password && confirmPassword && password !== confirmPassword) {
      setShowError(true);
      return;
    }

    if (password && confirmPassword) {
      router.push('/get-code');
      console.log('Password reset successful');
      // Handle password reset logic
    }
  };

  return (
    <AuthLayout
      title={t('auth_create_secure_password')}
      description={t('auth_password_description')}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='password' className='sr-only'>
            {t('auth_password_placeholder')}
          </Label>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth_password_placeholder')}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
        </div>

        <div>
          <Label htmlFor='confirm-password' className='sr-only'>
            {t('auth_confirm_placeholder')}
          </Label>
          <Input
            id='confirm-password'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth_confirm_placeholder')}
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
        </div>

        {/* Error Message */}
        {showError && (
          <div className='flex items-start'>
            <AlertCircle className='w-4 h-4 text-red-500 dark:text-red-300 mt-0.5 mr-2 flex-shrink-0' />
            <div className='text-sm text-red-700 dark:text-red-300'>
              <p className='font-medium'>{t('auth_password_mismatch')}</p>
            </div>
          </div>
        )}

        <div className='flex items-center gap-2 pt-2'>
          <input
            type='checkbox'
            id='show-password'
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <Label
            htmlFor='show-password'
            className='text-sm text-gray-700 dark:text-[#E3E3E3] cursor-pointer'
          >
            {t('auth_show_password')}
          </Label>
        </div>

        <div className='flex items-center justify-end pt-6'>
          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            {t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
