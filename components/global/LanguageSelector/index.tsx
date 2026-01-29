'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLanguageChanger } from '@/hooks/useLanguageChanger';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'simple';
  className?: string;
  triggerClassName?: string;
  showIcon?: boolean;
}

export default function LanguageSelector({ 
  variant = 'dropdown',
  className,
  triggerClassName,
  showIcon = false 
}: LanguageSelectorProps) {
  const { languages, getCurrentLanguage, handleLanguageChange } = useLanguageChanger();
  const currentLanguage = getCurrentLanguage();

  if (variant === 'simple') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              'px-2 py-1 text-sm rounded transition-colors',
              lang.code === currentLanguage.code
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              triggerClassName
            )}
          >
            {showIcon && lang.icon && (
              <img src={lang.icon.src} alt={lang.label} className='h-4 w-4 inline mr-1' />
            )}
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger 
          className={cn(
            'flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded transition-colors',
            triggerClassName
          )}
        >
          {showIcon && currentLanguage.icon && (
            <img 
              src={currentLanguage.icon.src} 
              alt={currentLanguage.label} 
              className='h-4 w-4' 
            />
          )}
          {currentLanguage.label}
          <ChevronDown className='w-4 h-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className='cursor-pointer'
            >
              {showIcon && lang.icon && (
                <img 
                  src={lang.icon.src} 
                  alt={lang.label} 
                  className='h-4 w-4 mr-2' 
                />
              )}
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
