'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  ChevronRight,
  Camera,
  Globe,
  Keyboard,
  Accessibility,
  Mail,
  HelpCircle,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LanguageSelector from '@/components/global/LanguageSelector';

import { Skeleton } from '@/components/ui/skeleton';
import { API_BASE_URL } from '@/lib/api-config';
import Header from '@/components/global/Header';
import ProfilePictureDialog from '@/components/profile/profile-picture-dialog';
import { ThemeToggle } from '@/components/global/ThemeToggle/ThemeToggle';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState('/image.png');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          // ... inside component
          const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileClick = () => {
    setIsDialogOpen(true);
  };

  const handleSaveProfilePicture = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans'>
        <div className='max-w-[850px] mx-auto space-y-4'>
          <div className='text-center mb-8'>
            <Skeleton className='h-8 w-48 mx-auto mb-2' />
            <Skeleton className='h-4 w-64 mx-auto' />
          </div>

          <div className='border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-[#1f1f1f] p-6'>
            <Skeleton className='h-6 w-32 mb-2' />
            <Skeleton className='h-4 w-full max-w-lg mb-6' />
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-14 w-14 rounded-full' />
              </div>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          </div>

          <div className='border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-[#1f1f1f] p-6'>
            <Skeleton className='h-6 w-32 mb-6' />
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-48' />
              </div>
              <div className='flex justify-between items-center'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans'>
        <div className='max-w-[850px] mx-auto space-y-4'>
          {/* Page Header */}
          <div className='text-center mb-8'>
            <h1 className='text-[28px] font-normal mb-2'>
              {t('profile_personal_info')}
            </h1>
            <p className='text-slate-600 dark:text-slate-300 text-base'>
              {t('profile_personal_info_desc')}
            </p>
          </div>

          {/* Basic Info Section */}
          <SectionCard
            title={t('profile_basic_info')}
            subtitle={t('profile_basic_info_desc')}
            showHelpIcon
          >
            <InfoRow
              label={t('profile_picture')}
              value={t('profile_picture_desc')}
              isProfilePhoto
              imageSrc={profileImage}
              onClick={handleProfileClick}
            />
            <InfoRow label={t('name')} value={user?.username || 'John Doe'} />
            <InfoRow
              label={t('profile_birthday')}
              value={
                user?.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : 'August 8, 2001'
              }
            />
            <InfoRow label={t('auth_gender')} value={user?.gender} isLast />
          </SectionCard>

          {/* Contact Info Section */}
          <SectionCard title={t('profile_contact_info')}>
            <InfoRow
              label={t('profile_email')}
              value={user?.email || 'example@gmail.com'}
            />
            <InfoRow
              label={t('profile_phone')}
              value={user?.phoneNumber || '13434343456'}
            />

            <div className='p-4 sm:p-6'>
              <div className='text-sm font-medium mb-3 text-slate-600 dark:text-slate-400'>
                {t('profile_more_options')}
              </div>
              <button className='flex items-center gap-2 px-4 py-2 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-blue-600 dark:text-blue-400'>
                <Mail className='w-4 h-4' />
                {t('profile_manage_emails')}
              </button>
            </div>
          </SectionCard>

          {/* Addresses Section */}
          <SectionCard
            title={t('profile_addresses')}
            subtitle={t('profile_addresses_desc')}
            showHelpIcon
          >
            <InfoRow
              label={t('profile_home')}
              value='123 Main St, Anytown, USA'
            />
            <InfoRow label={t('profile_work')} value={t('profile_not_set')} />
            <InfoRow
              label={t('profile_other')}
              value={t('profile_other_addresses')}
              isLast
            />
          </SectionCard>

          {/* Split Section: Password & Preferences */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Password Card */}
            <div className='border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer group'>
              <div className='p-4 sm:p-6 h-full flex flex-col relative'>
                <h2 className='text-[22px] font-normal mb-2'>
                  {t('profile_password')}
                </h2>
                <p className='text-sm text-slate-600 dark:text-slate-400 mb-8'>
                  {t('profile_password_desc')}
                </p>

                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-lg tracking-[0.2em] font-bold mb-1 text-gray-800 dark:text-gray-200'>
                      ••••••••
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      {t('profile_last_changed')}
                    </div>
                  </div>

                  <div className='ml-4'>
                    <ChevronRight className='w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors' />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className='border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-[#1f1f1f]'>
              <div className='p-4 sm:p-6 pb-2'>
                <h2 className='text-[22px] font-normal mb-2'>
                  {t('profile_preferences')}
                </h2>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  {t('profile_preferences_desc')}
                </p>
              </div>

              <div className='flex flex-col'>
                <PreferenceRow
                  icon={<Globe className='w-5 h-5' />}
                  label={t('profile_language')}
                  value={t('profile_language_value')}
                />
                <PreferenceRow
                  icon={<Keyboard className='w-5 h-5' />}
                  label={t('profile_input_tools')}
                  value={t('profile_input_tools_desc')}
                />
                <PreferenceRow
                  icon={<Accessibility className='w-5 h-5' />}
                  label={t('profile_accessibility')}
                  value={t('profile_accessibility_desc')}
                  isLast
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className='mt-12 pt-8 border-t border-slate-200 dark:border-slate-700'>
            <div className='flex items-center justify-between text-sm text-gray-600 dark:text-[#E3E3E3]'>
              <div className='flex items-center gap-2'>
                <LanguageSelector />
                <ThemeToggle isAuth={true} />
              </div>
              <nav className='flex items-center gap-3 md:gap-6 text-xs md:text-sm'>
                <Link href='#' className='hover:underline'>
                  {t('footer_help')}
                </Link>
                <Link href='#' className='hover:underline'>
                  {t('footer_privacy')}
                </Link>
                <Link href='#' className='hover:underline'>
                  {t('footer_terms')}
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </div>

      <ProfilePictureDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveProfilePicture}
      />
    </>
  );
}

// --- Components ---

function SectionCard({
  title,
  subtitle,
  children,
  showHelpIcon = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHelpIcon?: boolean;
}) {
  return (
    <div className='border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-[#1f1f1f]'>
      <div className='p-4 sm:p-6 pb-2'>
        <h2 className='text-[22px] font-normal mb-2'>{title}</h2>
        {subtitle && (
          <p className='text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed'>
            {subtitle}
            {showHelpIcon && (
              <HelpCircle className='w-4 h-4 inline-block ml-1 text-slate-400 align-text-bottom cursor-pointer hover:text-slate-600' />
            )}
          </p>
        )}
      </div>
      <div className='flex flex-col mt-2'>{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  isProfilePhoto = false,
  isLast = false,
  imageSrc,
  onClick,
}: {
  label: string;
  value: string;
  isProfilePhoto?: boolean;
  isLast?: boolean;
  imageSrc?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between p-4 sm:px-6 sm:py-4 hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer group',
        !isLast && 'border-b border-slate-200 dark:border-slate-700'
      )}
    >
      <div className={cn('flex-1 pr-4', isProfilePhoto ? 'py-2' : '')}>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-center'>
          <div className='text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase sm:normal-case sm:font-normal'>
            {label}
          </div>
          <div className='sm:col-span-2 text-base text-slate-900 dark:text-slate-200 truncate sm:whitespace-normal'>
            {value}
          </div>
        </div>
      </div>

      <div className='flex-shrink-0 ml-4'>
        {isProfilePhoto ? (
          <div className='relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700'>
            <Image
              src={imageSrc || '/diverse-person-portrait.png'}
              alt='Profile'
              width={56}
              height={56}
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <Camera className='w-5 h-5 text-white' />
            </div>
          </div>
        ) : (
          <ChevronRight className='w-5 h-5 text-slate-500 dark:text-slate-400 hidden sm:block' />
        )}
      </div>
    </div>
  );
}

function PreferenceRow({
  icon,
  label,
  value,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer',
        !isLast && 'border-b border-slate-200 dark:border-slate-700'
      )}
    >
      <div className='flex-shrink-0 mr-4 text-slate-500 dark:text-slate-400'>
        {icon}
      </div>
      <div className='flex-1'>
        <div className='text-base text-slate-900 dark:text-slate-200 mb-0.5'>
          {label}
        </div>
        <div className='text-sm text-slate-500 dark:text-slate-400'>
          {value}
        </div>
      </div>
      <div className='flex-shrink-0 ml-4'>
        <ChevronRight className='w-5 h-5 text-slate-500 dark:text-slate-400' />
      </div>
    </div>
  );
}
