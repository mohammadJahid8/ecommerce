'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/auth-layout';
import { AlertCircle, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';
import { useRouter } from 'next/navigation';

export default function CreatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setShowError(false);
    setApiError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setShowError(false);
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (password && confirmPassword && password !== confirmPassword) {
      setShowError(true);
      return;
    }

    if (password && confirmPassword) {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');

        // ... inside component
        const response = await fetch(`${API_BASE_URL}/signup/password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, password }),
        });
        if (response.ok) {
          router.push('/signup/verify-phone');
        } else {
          const data = await response.json();
          setApiError(data.message || data.error || t('auth_generic_error'));
        }
      } catch (error) {
        console.error('Error:', error);
        setApiError(t('auth_network_error'));
      } finally {
        setIsLoading(false);
      }
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
          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth_password_placeholder')}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0 pr-10'
            />
            {password && (
              <button
                type='button'
                onClick={() => handlePasswordChange('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
                aria-label='Clear password'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='confirm-password' className='sr-only'>
            {t('auth_confirm_placeholder')}
          </Label>
          <div className='relative'>
            <Input
              id='confirm-password'
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth_confirm_placeholder')}
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0 pr-10'
            />
            {confirmPassword && (
              <button
                type='button'
                onClick={() => handleConfirmPasswordChange('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
                aria-label='Clear confirm password'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
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

        <div className='flex items-center gap-2'>
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

        <div className='flex flex-col items-end pt-6'>
          {apiError && <p className='text-red-500 text-sm mb-2'>{apiError}</p>}
          <Button
            type='submit'
            disabled={isLoading || !password || !confirmPassword}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
