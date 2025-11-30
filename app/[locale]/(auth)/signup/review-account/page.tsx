'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/auth-layout';

export default function ReviewAccountPage() {
  const { t } = useTranslation();

  // Static data for now
  const [user, setUser] = React.useState<any>({
    name: '',
    email: '',
    phone: '',
    initial: '',
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await fetch(
            `http://localhost:5005/api/profile/${userId}`
          );
          const data = await res.json();
          setUser({
            name: data.username,
            email: data.email,
            phone: data.phoneNumber,
            initial: data.username ? data.username.charAt(0).toUpperCase() : '',
          });
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthLayout
      title={t('auth_review_account_title')}
      description={t('auth_review_account_subtitle')}
    >
      <div className='space-y-6'>
        <div>
          <div className='flex items-center gap-3'>
            <div className='w-7 h-7 rounded-full bg-purple-800 flex items-center justify-center text-white text-base font-medium uppercase'>
              {user.initial}
            </div>
            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.name}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {user.email}
              </p>
            </div>
          </div>

          <div className='pt-4'>
            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
              {t('auth_recovery_phone')}
            </p>
            <p className='text-sm text-gray-900 dark:text-white'>
              {user.phone}
            </p>
          </div>
        </div>

        <div className='flex justify-end pt-24'>
          <Button
            onClick={() => (window.location.href = '/profile')}
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            {t('auth_next')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
