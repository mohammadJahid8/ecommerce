'use client';
import LanguageSelector from '@/components/global/LanguageSelector';
import { ThemeToggle } from '@/components/global/ThemeToggle/ThemeToggle';
import ProfileDrawer from '@/components/profile/ProfileDrawer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { API_BASE_URL } from '@/lib/api-config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  console.log('🚀 ~ ProfileLayout ~ pathname:', pathname);
  const isPaymentMethodsPage = pathname.includes('/profile/payment-methods');
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
  return (
    <>
      <ProfileHeader
        userInitial={user?.username?.charAt(0) || user?.email?.charAt(0) || 'J'}
        userName={user?.username || 'John Doe'}
        userEmail={user?.email || 'example@gmail.com'}
        onMenuClick={() => setIsDrawerOpen(true)}
      />
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        activeItem={isPaymentMethodsPage ? 'payment-methods' : 'personal-info'}
        onItemClick={(item) => {
          // Handle navigation based on selected item
          console.log('Selected:', item);
          // TODO: Add navigation logic when payment methods page is ready
        }}
      />
      <main
        className={cn(!isPaymentMethodsPage ? 'max-w-[850px] mx-auto' : '')}
      >
        {children}
        <footer
          className={cn(
            'pt-12 p-4 md:p-8 border-t border-slate-200 dark:border-slate-700',
            isPaymentMethodsPage ? 'max-w-[850px] mx-auto' : '',
          )}
        >
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
      </main>
    </>
  );
};

export default ProfileLayout;
