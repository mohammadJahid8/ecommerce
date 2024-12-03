'use client';
import React from 'react';
import IconFaceBook from '@/assets/icons/IconFaceBook';
import IconYoutube from '@/assets/icons/IconYoutube';
import LanguageMenu from '../Language/Language';
import { Instagram, Twitter } from 'lucide-react';

const footerItems1 = [
  'Delivery options',
  'Tracking a package',
  'Country availability',
  'Repairs',
  'Installation',
  'Ideas & Info',
  'Disability support',
];

const footerItems2 = [
  'Help centre',
  'Contact us',
  'Device recycling',
  'Financing',
  'Sustainability',
  'Device recycling',
  'Gift returns',
  'Refurbished',
  'Trade-in',
  'Pixel for Business',
  'Locations',
];

const Footer = () => {
  return (
    <div className='max-w-[1392px] mx-auto px-4 sm:px-6 2xl:px-0'>
      <div className='grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1'>
        <div className='sm:hidden md:flex'></div>
        <div className='sm:hidden md:flex'></div>
        <div className='gird'>
          <div className='flex md:flex-row flex-col md:justify-start sm:justify-start mb-3'>
            <div className='flex flex-1 md:justify-end sm:justify-start md:mr-0 mr-0'>
              <div className='flex flex-col'>
                {footerItems1.map((item, index) => (
                  <p
                    key={index}
                    className={
                      'mb-4 hover:text-blue-500 cursor-pointer text-sm'
                    }
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className='flex flex-1 md:justify-end sm:justify-start mt-4 md:mt-0'>
              <div>
                {footerItems2.map((item, index) => (
                  <p
                    key={index}
                    className={
                      'mb-4 hover:text-blue-500 cursor-pointer text-sm'
                    }
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex flex-1 md:flex-row flex-col mt-2'>
        <div className='flex flex-row  space-x-3 py-2'>
          <span className='cursor-pointer'>
            <Twitter className='w-5 h-5 text-gray-800 dark:text-white fill-current' />
          </span>

          <span className='cursor-pointer'>
            <IconFaceBook width={20} height={20} />
          </span>
          <span className='cursor-pointer'>
            <IconYoutube width={20} height={20} />
          </span>
          <span className='cursor-pointer'>
            <Instagram className='w-5 h-5 text-gray-800 dark:text-white' />
          </span>
        </div>
        <div className='flex flex-col md:flex-row flex-1 justify-center md:justify-end items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0'>
          <LanguageMenu />

          <div className='flex cursor-pointer'>
            <p className='text-xs'>Privacy</p>
          </div>
          <div className='flex cursor-pointer'>
            <p className='text-xs'>Google Nest Commitment to Privacy</p>
          </div>
          <div className='flex cursor-pointer'>
            <p className='text-xs'>Sales Terms</p>
          </div>
          <div className='flex cursor-pointer'>
            <p className='text-xs'>Terms of Service</p>
          </div>
          <div className='flex cursor-pointer'>
            <p className='text-xs'>Careers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
