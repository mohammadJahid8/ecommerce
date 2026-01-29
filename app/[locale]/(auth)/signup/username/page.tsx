'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import FloatingInput from '@/components/auth/FloatingInput';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

const BasicInfoPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Validation function to check name validity
  const validateName = (name: string): boolean => {
    if (!name.trim()) return false; // Empty is invalid for required fields

    // Check if starts with a letter
    const startsWithLetter = /^[a-zA-Z\u0600-\u06FF]/.test(name.trim());
    if (!startsWithLetter) return false;

    // Check for 3 identical consecutive letters
    const hasThreeConsecutive = /(.)\1{2,}/i.test(name);
    if (hasThreeConsecutive) return false;

    // Check if has at least 2 letters
    const letterCount = (name.match(/[a-zA-Z\u0600-\u06FF]/g) || []).length;
    if (letterCount < 2) return false;

    return true;
  };

  // Check if first name is valid (only show warning after blur and if there's content)
  const firstNameError = useMemo(() => {
    if (!firstNameTouched || !firstName.trim()) return '';
    return !validateName(firstName)
      ? 'Are you sure you have entered your name correctly?'
      : '';
  }, [firstName, firstNameTouched]);

  // Check if last name is valid (only show warning after blur and if there's content)
  // Last name is optional, so only validate if there's content
  const lastNameError = useMemo(() => {
    if (!lastNameTouched || !lastName.trim()) return '';
    return !validateName(lastName)
      ? 'Are you sure you have entered your name correctly?'
      : '';
  }, [lastName, lastNameTouched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate first name is filled
    if (!firstName.trim()) {
      setFirstNameTouched(true);
      return;
    }

    // First name must be valid
    if (!validateName(firstName)) {
      setFirstNameTouched(true);
      return;
    }

    // Last name validation only if provided
    if (lastName.trim() && !validateName(lastName)) {
      setLastNameTouched(true);
      return;
    }

    setIsLoading(true);
    try {
      const fullName = lastName.trim() ? `${firstName} ${lastName}` : firstName;

      const response = await fetch(`${API_BASE_URL}/signup/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: fullName }),
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
  };

  // Form is valid if:
  // - First name is filled and valid
  // - Last name is either empty OR valid (it's optional)
  const isFormValid = useMemo(() => {
    const firstNameValid = validateName(firstName);
    const lastNameValid = !lastName.trim() || validateName(lastName);
    return firstNameValid && lastNameValid;
  }, [firstName, lastName]);

  return (
    <AuthLayout
      title={t('auth_create_google_account')}
      description={t('auth_enter_name')}
      isLoading={isLoading}
    >
      <div className='space-y-6'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <FloatingInput
            id='firstName'
            label={t('auth_first_name')}
            type='text'
            value={firstName}
            onChange={(value) => {
              setFirstName(value);
              // Clear touched state when user starts typing again
              if (firstNameTouched && !value.trim()) {
                setFirstNameTouched(false);
              }
            }}
            onBlur={() => setFirstNameTouched(true)}
            error={firstNameError}
          />

          <FloatingInput
            id='lastName'
            label={t('auth_first_surname')}
            type='text'
            value={lastName}
            onChange={(value) => {
              setLastName(value);
              // Clear touched state when user clears the field
              if (lastNameTouched && !value.trim()) {
                setLastNameTouched(false);
              }
            }}
            onBlur={() => {
              // Only mark as touched if there's content
              if (lastName.trim()) {
                setLastNameTouched(true);
              }
            }}
            error={lastNameError}
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
