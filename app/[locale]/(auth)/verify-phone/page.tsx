'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import AuthLayout from '@/components/auth/auth-layout';

export default function VerifyPhonePage() {
  return (
    <AuthLayout
      title="Prove you're not a robot"
      // description='Receive a verification code on your phone'
    >
      <form
        className='space-y-3 md:space-y-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p
            // htmlFor='phone-input'
            className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pb-4'
          >
            Receive a verification code on your phone
          </p>
          <PhoneInput
            id='phone-input'
            placeholder='Phone number'
            className='h-[54px] text-base bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0'
          />
        </div>
        <p className='text-sm md:text-base text-gray-700 dark:text-[#E3E3E3] pt-4'>
          Google will verify this number via SMS (charges may apply).
        </p>
        <div className='flex items-center justify-end gap-10 pt-6'>
          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white dark:text-black px-6 h-10 rounded-[20px] dark:bg-[#A8C7FA]'
          >
            Next
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
