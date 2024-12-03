'use client';
import { useState, useEffect } from 'react';
import { OverLay } from '../OverLay';
import IconClose from '@/assets/icons/IconClose';
import IconDrawer from '@/assets/icons/IconDrawer';
import MenuReponsive from './components/MenuReponsive';
import { ICategory } from '@/models/popular.category.model';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface IProps {
  categories: ICategory[];
}

export default function Header({ categories }: IProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isShadow, setShadow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isOpen = openDrawer;

  return (
    <header className='sticky top-0 z-20'>
      {isOpen && (
        <OverLay
          onClick={() => {
            setOpenDrawer(false);
          }}
        />
      )}

      <nav
        className={`flex w-full items-center justify-between dark:bg-[#202124] bg-white py-2 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700  ${
          isShadow ? 'shadow-lg' : ''
        }`}
      >
        <div className='flex w-full justify-between px-4 max-w-[1392px] mx-auto sm:px-6 2xl:px-0'>
          <div className='flex items-center lg:hidden'>
            <button
              onClick={() => setOpenDrawer(!openDrawer)}
              className='border-0 bg-transparent px-2 text-xl transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700'
              type='button'
            >
              <span className='[&>svg]:w-5'>
                {openDrawer ? <IconClose /> : <IconDrawer />}
              </span>
            </button>
          </div>

          {openDrawer && <MenuReponsive categories={categories} />}

          <div className=''>
            <ul className='flex'>
              <li className='cursor-pointer border-2 flex justify-center items-center rounded-full w-10 h-10 dark:border-gray-500'>
                <Link href='/'>
                  <span className='block transition dark:text-white'>E</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex space-x-4 w-full justify-end'>
            <button className='border border-gray-300 rounded px-3 sm:px-6 py-2 text-gray-700 text-xs sm:text-sm font-medium w-fit dark:border-gray-500 dark:text-white'>
              {t('signin')}
            </button>
            <button className='bg-blue-600 text-white rounded px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium w-fit hidden md:block'>
              {t('signup')}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
