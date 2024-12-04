'use client';
import React from 'react';
import Image from 'next/image';
import { IPopularProduct } from '@/utils/interfaces';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

const ProductItem = (props: { popularProduct: IPopularProduct }) => {
  const { popularProduct } = props;
  const { t } = useTranslation();
  return (
    <div className='flex flex-col m-2 cursor-pointer w-[200px] relative'>
      <div className='flex justify-center items-center w-[212px] h-[252px] bg-[#F8F9FA] rounded-xl dark:bg-[#202124]'>
        <Image
          className='transition ease-in-out duration-500 hover:-translate-y-1 hover:scale-105 object-cover w-full h-full'
          unoptimized={true}
          src={popularProduct?.imageUrl}
          width={100}
          height={150}
          alt={'image website' + popularProduct?.name}
        />
      </div>
      <div className='mt-5'>
        <p className='text-base font-semibold text-[#3C4043] truncate dark:text-white'>
          {t('name') + ': ' + popularProduct?.name}
        </p>
        <p className='mt-2 text-sm mb-20'>
          {t('from') + ' ' + popularProduct?.price + '$'}
        </p>

        <div className='flex items-center absolute bottom-0 mb-6'>
          <p className='text-base font-semibold text-[#1967D2] dark:text-[#8ab4f8]'>
            {t('recharge')}
          </p>
          <ChevronRight className='dark:text-[#8ab4f8]' />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
