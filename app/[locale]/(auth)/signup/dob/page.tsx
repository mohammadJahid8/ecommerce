'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';
import FloatingInput from '@/components/auth/FloatingInput';
import FloatingSelect from '@/components/auth/FloatingSelect';

const DobPage = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<{
    day?: string;
    month?: string;
    year?: string;
    date?: string;
  }>({});
  const router = useRouter();
  const { t } = useTranslation();

  // Month options for select
  const months = [
    { value: '1', label: t('auth_january') },
    { value: '2', label: t('auth_february') },
    { value: '3', label: t('auth_march') },
    { value: '4', label: t('auth_april') },
    { value: '5', label: t('auth_may') },
    { value: '6', label: t('auth_june') },
    { value: '7', label: t('auth_july') },
    { value: '8', label: t('auth_august') },
    { value: '9', label: t('auth_september') },
    { value: '10', label: t('auth_october') },
    { value: '11', label: t('auth_november') },
    { value: '12', label: t('auth_december') },
  ];

  // Gender options for select
  const genderOptions = [
    { value: 'male', label: t('auth_male') },
    { value: 'female', label: t('auth_female') },
    { value: 'other', label: t('auth_other') },
    { value: 'prefer-not-to-say', label: t('auth_prefer_not_to_say') },
  ];

  // Current year for validation
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100; // 1926 (max 100 years old)
  const maxYear = currentYear - 13; // 2013 (min 13 years old)

  // Leap year calculation
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Get maximum days for a given month and year
  const getMaxDaysInMonth = (month: number, year: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  };

  // Validate date
  const validateDate = (day: string, month: string, year: string) => {
    const newErrors: {
      day?: string;
      month?: string;
      year?: string;
      date?: string;
    } = {};

    if (!day) newErrors.day = t('auth_day_required');
    if (!month) newErrors.month = t('auth_month_required');
    if (!year) newErrors.year = t('auth_year_required');

    if (day && month && year) {
      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate year range (must be 13-100 years old)
      if (yearNum < minYear) {
        newErrors.year = t('auth_max_age_error');
      } else if (yearNum > maxYear) {
        newErrors.year = t('auth_min_age_error');
      }

      // Check if day is valid for the selected month and year
      if (monthNum >= 1 && monthNum <= 12 && yearNum >= minYear) {
        const maxDays = getMaxDaysInMonth(monthNum, yearNum);
        if (dayNum < 1 || dayNum > maxDays) {
          newErrors.day = t('auth_invalid_day_error', {
            month: months[monthNum - 1].label,
            year: yearNum,
          });
        }
      }

      // Check if date is in the future
      if (!newErrors.day && !newErrors.year) {
        const selectedDate = new Date(yearNum, monthNum - 1, dayNum);
        const today = new Date();
        if (selectedDate > today) {
          newErrors.date = t('auth_future_date_error');
        }

        // Check minimum age (must be at least 13 years old)
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 13);
        if (selectedDate > minDate) {
          newErrors.date = t('auth_min_age_error');
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (validateDate(day, month, year) && gender.trim()) {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const dob = new Date(
          `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        );

        const response = await fetch(`${API_BASE_URL}/signup/dob`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, dob, gender }),
        });
        if (response.ok) {
          router.push('/signup/create-email');
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

  // Handle day input - only allow numbers 1-31
  const handleDayChange = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Limit to 2 digits
    const limitedValue = numericValue.slice(0, 2);

    // Validate range (1-31)
    const numValue = parseInt(limitedValue);
    if (limitedValue === '' || (numValue >= 1 && numValue <= 31)) {
      setDay(limitedValue);
      if (month && year && limitedValue) {
        validateDate(limitedValue, month, year);
      }
    } else if (numValue > 31) {
      // If entered value is greater than 31, cap at 31
      setDay('31');
      if (month && year) {
        validateDate('31', month, year);
      }
    }
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    // If day is set and it's invalid for the new month, revalidate
    if (day && year) {
      const dayNum = parseInt(day);
      const monthNum = parseInt(value);
      const yearNum = parseInt(year);
      const maxDays = getMaxDaysInMonth(monthNum, yearNum);

      if (dayNum > maxDays) {
        setDay(maxDays.toString());
        validateDate(maxDays.toString(), value, year);
      } else {
        validateDate(day, value, year);
      }
    }
  };

  // Handle year input - validate range and format
  const handleYearChange = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Limit to 4 digits
    const limitedValue = numericValue.slice(0, 4);

    setYear(limitedValue);

    // Only validate when 4 digits are entered
    if (limitedValue.length === 4 && day && month) {
      const yearNum = parseInt(limitedValue);
      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const maxDays = getMaxDaysInMonth(monthNum, yearNum);

      // Adjust day if invalid for the year (e.g., Feb 29 on non-leap year)
      if (dayNum > maxDays) {
        setDay(maxDays.toString());
        validateDate(maxDays.toString(), month, limitedValue);
      } else {
        validateDate(day, month, limitedValue);
      }
    }
  };

  const isFormValid =
    day &&
    month &&
    year &&
    year.length === 4 &&
    gender &&
    Object.keys(errors).length === 0;

  return (
    <AuthLayout
      title={t('auth_basic_info')}
      description={t('auth_basic_info_desc')}
      isLoading={isLoading}
    >
      <div className='space-y-6'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Date of Birth Section - Order: Month, Day, Year */}
          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-4'>
              {/* Month - FloatingSelect */}
              <div>
                <FloatingSelect
                  label={t('auth_month')}
                  value={month}
                  options={months}
                  onChange={handleMonthChange}
                  error={errors.month}
                />
              </div>

              {/* Day - FloatingInput (text input, numbers only 1-31) */}
              <div>
                <FloatingInput
                  label={t('auth_day')}
                  type='text'
                  value={day}
                  onChange={handleDayChange}
                  error={errors.day}
                />
              </div>

              {/* Year - FloatingInput (text input, 4 digits) */}
              <div>
                <FloatingInput
                  label={t('auth_year')}
                  type='text'
                  value={year}
                  onChange={handleYearChange}
                  error={errors.year}
                />
              </div>
            </div>
          </div>

          {/* Gender Section - FloatingSelect */}
          <div>
            <FloatingSelect
              label={t('auth_gender')}
              value={gender}
              options={genderOptions}
              onChange={setGender}
            />

            <p className='text-sm md:text-base text-blue-600 dark:text-[#A8C7FA] pt-4'>
              {t('why_we_ask')}
            </p>

            <div className='space-y-2 pt-4'>
              {errors.date && <Error error={errors.date} />}
            </div>
          </div>

          {/* Submit Button */}
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
      </div>
    </AuthLayout>
  );
};

export default DobPage;
