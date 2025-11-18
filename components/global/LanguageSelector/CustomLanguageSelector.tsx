'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useLanguageChanger } from '@/hooks/useLanguageChanger';
import iconEs from '../../../assets/images/es.png';
import iconUs from '../../../assets/images/us.png';

interface CustomLanguageSelectorProps {
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
}

export default function CustomLanguageSelector({
  className,
  buttonClassName,
  dropdownClassName,
}: CustomLanguageSelectorProps) {
  const { currentLocale, handleLanguageChange } = useLanguageChanger();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', icon: iconUs },
    { code: 'es', label: 'Español', icon: iconEs },
  ];

  const selectedLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (lang: typeof selectedLang) => {
    setIsOpen(false);
    handleLanguageChange(lang.code);
  };

  return (
    <div className={clsx('relative inline-block w-max text-left', className)}>
      <button
        onClick={toggleDropdown}
        className={clsx('flex items-center gap-2 text-xs', buttonClassName)}
      >
        <img
          src={selectedLang.icon.src}
          alt={selectedLang.label}
          className='h-4 w-4'
        />
        {selectedLang.label}
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 dark:bg-black dark:border-gray-800',
            'bottom-full',
            dropdownClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800',
                lang.code === selectedLang.code &&
                  'bg-gray-100 font-bold dark:bg-gray-800'
              )}
            >
              <img src={lang.icon.src} alt={lang.label} className='h-4 w-4' />
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
