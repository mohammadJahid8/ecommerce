'use client';
import { memo } from 'react';
import { ICategory } from '@/models/popular.category.model';
import Image from 'next/image';
import IconQuestion from '@/assets/icons/IconQuestion';
import IconOrderMenu from '@/assets/icons/IconOrderMenu';

interface IProps {
  categories: ICategory[];
}

const MenuReponsive = (props: IProps) => {
  return (
    <div className=' lg:hidden absolute left- right-0 top-10 z-20 w-full py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800'>
      {props?.categories?.length > 0
        ? props.categories.map((category, index) => {
            return (
              <div
                key={category.id + index.toString()}
                className='flex flex-1 cursor-pointer flex-row items-center hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white pl-3'
              >
                <Image
                  src={category.imageUrl}
                  alt={category.altImage}
                  width={50}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
                <p className='ml-2 dark:text-white'>{category.name}</p>
              </div>
            );
          })
        : null}
      <hr className='border-gray-200 dark:border-gray-700' />

      <div className='cursor-pointer mt-2 items-center flex flex-1 flex-row pl-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
        <IconOrderMenu width={20} height={20} />
        <p className='cursor-pointer block px-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
          Order
        </p>
      </div>
      <div className='cursor-pointer items-center flex flex-1 flex-row pl-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
        <IconQuestion />
        <p className='cursor-pointer block px-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
          Help
        </p>
      </div>
    </div>
  );
};

export default memo(MenuReponsive);
