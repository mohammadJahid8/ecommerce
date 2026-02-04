'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  Search,
  HelpCircle,
  X,
  Keyboard,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileAvatar from './ProfileAvatar';

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
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setIsHelpOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-[#1f1f1f] border-b border-slate-200 dark:border-slate-700'>
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
          <div ref={helpRef} className='relative'>
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className={cn(
                'p-3 rounded-full transition-colors',
                isHelpOpen
                  ? 'bg-slate-100 dark:bg-slate-700'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700',
              )}
              aria-label='Help'
            >
              <HelpCircle className='w-5 h-5 text-slate-600 dark:text-slate-300' />
            </button>

            {/* Help Dropdown */}
            {isHelpOpen && (
              <div className='absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50'>
                <div className='px-4 py-3 border-b border-slate-200 dark:border-slate-700'>
                  <h3 className='font-medium text-slate-900 dark:text-slate-100'>
                    {t('help_title') || 'Help'}
                  </h3>
                </div>

                <div className='py-1'>
                  <button className='w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left'>
                    <BookOpen className='w-5 h-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-900 dark:text-slate-100'>
                        {t('help_center') || 'Help'}
                      </div>
                    </div>
                  </button>

                  <button className='w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left'>
                    <MessageCircle className='w-5 h-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-900 dark:text-slate-100'>
                        {t('send_feedback') || 'Send feedback'}
                      </div>
                    </div>
                  </button>

                  <button className='w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left'>
                    <Keyboard className='w-5 h-5 text-slate-500 dark:text-slate-400' />
                    <div>
                      <div className='text-sm text-slate-900 dark:text-slate-100'>
                        {t('keyboard_shortcuts') || 'Keyboard shortcuts'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <ProfileAvatar
            userInitial={userInitial}
            userName={userName}
            userEmail={userEmail}
          />
        </div>
      </div>
    </header>
  );
}
