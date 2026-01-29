'use client';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

export default function CreatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  // Password validation rules
  const validatePassword = (pass: string) => {
    const hasMinLength = pass.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

    return {
      isValid: hasMinLength && hasLetter && hasNumber && hasSymbol,
      hasMinLength,
      hasLetter,
      hasNumber,
      hasSymbol,
    };
  };

  const passwordValidation = useMemo(
    () => validatePassword(password),
    [password],
  );

  // Password error (show after blur if invalid)
  const passwordError = useMemo(() => {
    if (!passwordTouched || !password) return '';
    if (!passwordValidation.isValid) {
      return t('auth_password_requirements');
    }
    return '';
  }, [password, passwordTouched, passwordValidation.isValid, t]);

  // Confirm password error (show after blur if doesn't match)
  const confirmError = useMemo(() => {
    if (!confirmTouched || !confirmPassword) return '';
    if (password !== confirmPassword) {
      return t('auth_passwords_dont_match');
    }
    return '';
  }, [password, confirmPassword, confirmTouched, t]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setApiError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    // Mark both fields as touched to show any errors
    setPasswordTouched(true);
    setConfirmTouched(true);

    // Validate password requirements
    if (!passwordValidation.isValid) {
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');

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
  };

  // Form is valid when password meets requirements and both match
  const isFormValid =
    passwordValidation.isValid &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <AuthLayout
      title={t('auth_create_secure_password')}
      description={t('auth_password_description')}
      isLoading={isLoading}
    >
      <form className='space-y-3 md:space-y-4' onSubmit={handleSubmit}>
        <FloatingInput
          id='password'
          label={t('auth_password_placeholder')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => setPasswordTouched(true)}
          error={passwordError}
        />

        <FloatingInput
          id='confirm-password'
          label={t('auth_confirm_placeholder')}
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={() => setConfirmTouched(true)}
          error={confirmError}
        />

        {/* Show Password Checkbox */}
        <div className='flex items-center gap-3 pt-1'>
          <input
            type='checkbox'
            id='show-password'
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className='w-[18px] h-[18px] rounded border-gray-300 dark:border-gray-500 text-blue-600 dark:text-[#A8C7FA] focus:ring-blue-500 dark:focus:ring-[#A8C7FA] cursor-pointer accent-blue-600 dark:accent-[#A8C7FA]'
          />
          <label
            htmlFor='show-password'
            className='text-sm text-gray-700 dark:text-[#E3E3E3] cursor-pointer select-none'
          >
            {t('auth_show_password')}
          </label>
        </div>

        <div className='flex flex-col items-end pt-6'>
          {apiError && <Error error={apiError} />}
          <Button
            type='submit'
            disabled={!isFormValid || isLoading}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? t('auth_loading') : t('auth_next')}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
