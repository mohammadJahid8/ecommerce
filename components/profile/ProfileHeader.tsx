'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Search, X } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import HelpMenu from './HelpMenu';

interface ProfileHeaderProps {
  userInitial?: string;
  userName?: string;
  userEmail?: string;
  onMenuClick?: () => void;
}

export default function ProfileHeader({
  userInitial = 'J',
  userName = 'John Doe',
  userEmail = 'example@gmail.com',
  onMenuClick,
}: ProfileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [isShadow, setShadow] = useState(false);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className='sticky top-0 z-20'>
      <nav
        className={`w-full items-center justify-between dark:bg-[#202124] bg-white py-2 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700  ${
          isShadow ? 'shadow-lg' : ''
        }`}
      >
        <div className='flex items-center justify-between h-16 px-4'>
          {/* Left side - Hamburger menu */}
          <div className='flex items-center gap-4'>
            <button
              onClick={onMenuClick}
              className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'
              aria-label='Open menu'
            >
              <Menu className='w-6 h-6 text-slate-600 dark:text-slate-300' />
            </button>

            {/* Logo/Title */}
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                <span className='text-white font-medium text-sm'>G</span>
              </div>
              <span className='text-xl text-slate-600 dark:text-slate-300 hidden sm:block'>
                Account
              </span>
            </div>
          </div>

          {/* Right side - Search, Help, Profile */}
          <div className='flex items-center gap-1'>
            {/* Search */}
            {isSearchOpen ? (
              <div className='flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 mr-2'>
                <Search className='w-5 h-5 text-slate-500 dark:text-slate-400 mr-2' />
                <input
                  ref={searchInputRef}
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('profile_search') || 'Search'}
                  className='bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 w-48 sm:w-64'
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className='p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full ml-2'
                >
                  <X className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className='p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'
                aria-label='Search'
              >
                <Search className='w-5 h-5 text-slate-600 dark:text-slate-300' />
              </button>
            )}

            {/* Help Menu */}
            <HelpMenu />

            {/* Profile Avatar */}
            <ProfileAvatar
              userInitial={userInitial}
              userName={userName}
              userEmail={userEmail}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
