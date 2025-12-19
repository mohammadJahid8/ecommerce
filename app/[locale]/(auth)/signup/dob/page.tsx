'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AuthLayout from '@/components/auth/auth-layout';
import { API_BASE_URL } from '@/lib/api-config';
import Error from '@/components/auth/error';

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

  // Generate arrays for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) =>
    (currentYear - i).toString()
  );

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

      // Check if date is in the future
      const selectedDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = t('auth_future_date_error');
      }

      // Check if day is valid for the selected month and year
      const maxDays = getMaxDaysInMonth(monthNum, yearNum);
      if (dayNum > maxDays) {
        newErrors.day = t('auth_invalid_day_error', {
          month: months[monthNum - 1].label,
          year: yearNum,
        });
      }

      // Check minimum age (e.g., must be at least 13 years old)
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 13);
      if (selectedDate > minDate) {
        newErrors.date = t('auth_min_age_error');
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
        const dob = new Date(`${year}-${month}-${day}`);

        // ... inside component
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

  const handleDayChange = (value: string) => {
    setDay(value);
    if (month && year) {
      validateDate(value, month, year);
    }
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    // If day is selected and it's invalid for the new month, clear it
    if (day && year) {
      const dayNum = parseInt(day);
      const monthNum = parseInt(value);
      const yearNum = parseInt(year);
      const maxDays = getMaxDaysInMonth(monthNum, yearNum);

      if (dayNum > maxDays) {
        setDay('');
      }
      validateDate(day, value, year);
    }
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    // If day and month are selected, revalidate for leap year
    if (day && month) {
      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const yearNum = parseInt(value);
      const maxDays = getMaxDaysInMonth(monthNum, yearNum);

      if (dayNum > maxDays) {
        setDay('');
      }
      validateDate(day, month, value);
    }
  };

  const isFormValid =
    day && month && year && gender && Object.keys(errors).length === 0;

  return (
    <AuthLayout
      title={t('auth_basic_info')}
      description={t('auth_basic_info_desc')}
      isLoading={isLoading}
    >
      <div className='space-y-6'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Date of Birth Section */}
          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <Select value={day} onValueChange={handleDayChange}>
                  <SelectTrigger className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'>
                    <SelectValue placeholder={t('auth_day')} />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={month} onValueChange={handleMonthChange}>
                  <SelectTrigger className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'>
                    <SelectValue placeholder={t('auth_month')} />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={year} onValueChange={handleYearChange}>
                  <SelectTrigger className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'>
                    <SelectValue placeholder={t('auth_year')} />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Gender Section */}
          <div>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className='h-[54px] !text-base bg-transparent dark:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'>
                <SelectValue placeholder={t('auth_gender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>{t('auth_male')}</SelectItem>
                <SelectItem value='female'>{t('auth_female')}</SelectItem>
                <SelectItem value='other'>{t('auth_other')}</SelectItem>
                <SelectItem value='prefer-not-to-say'>
                  {t('auth_prefer_not_to_say')}
                </SelectItem>
              </SelectContent>
            </Select>

            <p className='text-sm md:text-base text-blue-600 dark:text-[#A8C7FA] pt-4'>
              {t('why_we_ask')}
            </p>

            <div className='space-y-2 pt-4'>
              {errors.day && <Error error={errors.day} />}
              {errors.month && <Error error={errors.month} />}
              {errors.year && <Error error={errors.year} />}
              {errors.date && <Error error={errors.date} />}
            </div>
          </div>

          {/* Error Messages Section - Always visible above button */}

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
