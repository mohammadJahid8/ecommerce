'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={cn(className)} viewBox='0 0 24 24'>
      <path
        fill='#4285F4'
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      />
      <path
        fill='#34A853'
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      />
      <path
        fill='#FBBC05'
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      />
      <path
        fill='#EA4335'
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      />
    </svg>
  );
}

interface AuthLayoutProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <main className='min-h-screen flex items-center justify-center bg-white md:bg-[#f0f3f8] dark:bg-[#0e0e0e]  md:dark:bg-[#1e1f21] text-neutral-900 dark:text-neutral-100'>
      <div className='w-full mx-auto max-w-[1040px] flex flex-col gap-10 md:gap-0 justify-between'>
        <Card className='mx-auto rounded-3xl bg-white dark:bg-[#0e0e0e] shadow-none border-none w-full'>
          <CardContent className='p-6 sm:p-8 md:p-10'>
            <GoogleMark className='w-12 h-12' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start mt-6'>
              <div className='space-y-5 max-w-[280px]'>
                <h1 className='text-3xl md:text-[40px] font-medium tracking-tight leading-[1.2]'>
                  {title}
                </h1>
                <div className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] max-w-prose'>
                  {description}
                </div>
              </div>
              {children}
            </div>
          </CardContent>
        </Card>

        <footer className='mt-4 md:px-2 px-6'>
          <div className='flex md:flex-row flex-col md:items-center gap-10 md:gap-0 justify-between text-sm text-gray-600 dark:text-[#E3E3E3]'>
            <div className='flex items-center gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded transition-colors'>
                  English (United States)
                  <ChevronDown className='w-4 h-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuItem>English (United States)</DropdownMenuItem>
                  <DropdownMenuItem>Español (España)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <nav className='flex items-center gap-6'>
              <Link href='#' className='hover:underline'>
                Help
              </Link>
              <Link href='#' className='hover:underline'>
                Privacy
              </Link>
              <Link href='#' className='hover:underline'>
                Terms
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  );
}
