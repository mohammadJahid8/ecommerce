'use client';
import React from 'react';

interface IProps {
  width?: number;
  height?: number;
}

const IconFacebook = (props: IProps) => {
  return (
    <svg
      style={{ ...props }}
      className='w-[22px] h-[22px] text-gray-800 dark:text-white'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 8 19'
    >
      <path
        fillRule='evenodd'
        d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default React.memo(IconFacebook);
