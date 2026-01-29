'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Building2, UserCircle2, LucideIcon } from 'lucide-react';
import AuthLayout from '@/components/auth/auth-layout';
import { useRouter, useSearchParams } from 'next/navigation';

interface AccountOption {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  onClick: () => void;
  className?: string;
}

export default function ChooseAccountPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  const accountOptions: AccountOption[] = [
    {
      icon: Building2,
      titleKey: 'auth_workspace_account',
      descriptionKey: 'auth_workspace_account_desc',
      onClick: () => {
        router.push(`/signin/pwd?email=${email}&name=${name}`);
      },
    },
    {
      icon: UserCircle2,
      titleKey: 'auth_personal_account',
      descriptionKey: 'auth_personal_account_desc',
      onClick: () => {
        router.push(`/signin/pwd?email=${email}&name=${name}`);
      },
    },
  ];

  return (
    <AuthLayout
      title={t('auth_choose_account')}
      description={
        <>
          <div className='text-sm text-gray-700 dark:text-[#E3E3E3]'>
            {t('auth_choose_account_desc', { email })}
          </div>
        </>
      }
    >
      <div className='w-full space-y-6 mb-8'>
        <div className=''>
          {accountOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <>
                <button
                  key={index}
                  className={`w-full flex items-start gap-4 text-left transition-colors group ${option.className}`}
                  onClick={option.onClick}
                >
                  <div className='flex items-start  hover:bg-gray-100 dark:hover:bg-gray-800 gap-4 p-4 rounded-xl w-full'>
                    <div className='mt-1'>
                      <Icon className='w-6 h-6 text-blue-600 dark:text-[#A8C7FA]' />
                    </div>
                    <div>
                      <div className='font-medium text-gray-900 dark:text-gray-100'>
                        {t(option.titleKey)}
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        {t(option.descriptionKey)}
                      </div>
                    </div>
                  </div>
                </button>
                <hr />
              </>
            );
          })}
        </div>

        <div className='pt-2 mb-32!'>
          <Link
            href='#'
            className='text-sm font-medium text-blue-600 dark:text-[#A8C7FA] hover:underline'
          >
            {t('auth_more_info')}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
