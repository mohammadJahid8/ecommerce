'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams } from 'next/navigation';
import { User, CreditCard } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface ProfileDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeItem?: 'personal-info' | 'payment-methods';
  onItemClick?: (item: 'personal-info' | 'payment-methods') => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, isActive = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors text-left',
        isActive
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300',
      )}
    >
      <span className='flex-shrink-0'>{icon}</span>
      <span className='text-sm font-medium'>{label}</span>
    </button>
  );
}

export default function ProfileDrawer({
  isOpen,
  onOpenChange,
  activeItem = 'personal-info',
  onItemClick,
}: ProfileDrawerProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';

  const handleItemClick = (item: 'personal-info' | 'payment-methods') => {
    onOpenChange(false);
    onItemClick?.(item);

    // Navigate to the appropriate page
    if (item === 'personal-info') {
      router.push(`/${locale}/profile`);
    } else if (item === 'payment-methods') {
      router.push(`/${locale}/profile/payment-methods`);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side='left' className='w-[280px] sm:w-[320px] p-0'>
        {/* Header with Logo */}
        <SheetHeader className='p-4 pb-2 border-b border-slate-200 dark:border-slate-700'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white font-medium text-sm'>G</span>
            </div>
            <SheetTitle className='text-xl font-normal text-slate-600 dark:text-slate-300'>
              Account
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Navigation Items */}
        <nav className='p-3 space-y-1'>
          <NavItem
            icon={<User className='w-5 h-5' />}
            label={t('profile_personal_info') || 'Personal information'}
            isActive={activeItem === 'personal-info'}
            onClick={() => handleItemClick('personal-info')}
          />
          <NavItem
            icon={<CreditCard className='w-5 h-5' />}
            label={t('profile_payment_methods') || 'Payment methods'}
            isActive={activeItem === 'payment-methods'}
            onClick={() => handleItemClick('payment-methods')}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
