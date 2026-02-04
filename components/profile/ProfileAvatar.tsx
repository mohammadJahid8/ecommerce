'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileAvatarProps {
  userInitial?: string;
  userName?: string;
  userEmail?: string;
}

export default function ProfileAvatar({
  userInitial,
  userName,
  userEmail,
}: ProfileAvatarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(!userInitial);
  const profileRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // If props are provided, don't fetch
    if (userInitial && userName && userEmail) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user for avatar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userInitial, userName, userEmail]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine display values
  // Priority: Props > Fetched Data > Defaults
  const displayInitial =
    userInitial ||
    (user?.username?.charAt(0) || user?.email?.charAt(0))?.toUpperCase() ||
    'J';
  const displayName = userName || user?.username || 'John Doe';
  const displayEmail = userEmail || user?.email || 'example@gmail.com';

  // If loading and no props, show skeleton or nothing?
  // Showing a skeleton might be better than jumping content
  if (loading) {
    return <Skeleton className='w-9 h-9 rounded-full' />;
  }

  // If not logged in (no user and no props), potentially return null?
  // But for now, we keep defaults 'J'/'John Doe' if fetch fails or no user, to match previous behavior purely for safety,
  // OR we can decide to hide it.
  // Given the previous code had defaults, I'll stick to defaults but getting real data is the priority.
  // However, if we really want "real data", falling back to John Doe is confusing if not logged in.
  // But let's assume if localStorage has no ID, it's a guest.

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  // If we are strictly in a mode where we expect real data:
  // If no props and no fetched user (and not loading), it means we are anonymous.
  if (!userInitial && !user && !userId && !loading) {
    return null; // Don't show avatar if not logged in
  }

  return (
    <div ref={profileRef} className='relative'>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className='ml-2 w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-medium uppercase hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600 transition-all'
        aria-label='Profile'
      >
        {displayInitial}
      </button>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className='absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50'>
          <div className='p-4 text-center'>
            <div className='w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-medium uppercase mx-auto mb-3'>
              {displayInitial}
            </div>
            <div className='font-medium text-slate-900 dark:text-slate-100'>
              {displayName}
            </div>
            <div className='text-sm text-slate-500 dark:text-slate-400'>
              {displayEmail}
            </div>
          </div>

          <div className='border-t border-slate-200 dark:border-slate-700 p-3'>
            <button className='w-full py-2 px-4 rounded-full border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors'>
              {t('manage_account') || 'Manage your Google Account'}
            </button>
          </div>

          <div className='border-t border-slate-200 dark:border-slate-700 py-2'>
            <button className='w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left text-sm text-slate-700 dark:text-slate-300'>
              {t('sign_out') || 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
