'use client';
import React from 'react';
import Image from 'next/image';
import { IPopularCategory } from '@/models/popular.category.model';

interface IProps {
  popularCategory: IPopularCategory;
}

const CategoryItem = ({ popularCategory }: IProps) => {
  return (
    <div className='cursor-pointer '>
      <div className='flex justify-center items-center bg-[#f8f9fb] dark:bg-[#202124] md:rounded-3xl rounded-2xl'>
        <Image
          unoptimized
          src={popularCategory?.imageUrl}
          className='max-w-[250px] max-h-[200px] w-full h-full object-contain'
          width={100}
          height={140}
          alt={popularCategory.alt}
        />
      </div>
      <div className='mt-5'>
        <p className='text-center text-sm text-[#3C4043] font-bold dark:text-white'>
          {popularCategory?.name}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CategoryItem);
