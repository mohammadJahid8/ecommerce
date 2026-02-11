'use client';
import React from 'react';
import Image from 'next/image';
import { IPopularProduct } from '@/utils/interfaces';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

interface ProductItemProps {
  popularProduct: IPopularProduct;
  showNewBadge?: boolean;
}

const ProductItem = (props: ProductItemProps) => {
  const { popularProduct, showNewBadge = true } = props;
  const { t } = useTranslation();

  return (
    <div className='flex flex-col cursor-pointer w-full'>
      {/* Product Image Container */}
      <div className='relative flex justify-center items-center w-full h-[265px] bg-[#f9f9f9] rounded-[28px] dark:bg-[#202124] overflow-hidden group border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300'>
        {/* New Badge */}
        {showNewBadge && (
          <span className='absolute top-4 left-4 z-10 bg-[#E8F0FE] text-[#1967D2] text-sm font-medium px-3 py-1 rounded-full'>
            New
          </span>
        )}
        <Image
          className='transition ease-in-out duration-300 group-hover:scale-105 object-contain p-0 w-auto h-auto max-h-[212px] max-w-full'
          unoptimized={true}
          src={popularProduct?.imageUrl}
          width={212}
          height={215}
          alt={'image website' + popularProduct?.name}
        />
      </div>

      {/* Product Info */}
      <div className='mt-6 flex flex-col'>
        <p className='text-[18px] font-bold text-[#202124] truncate dark:text-white leading-snug'>
          {popularProduct?.name}
        </p>
        <p className='text-[16px] text-[#202124] dark:text-[#e8eaed] mt-3 font-normal'>
          {t('from')} ${popularProduct?.price}
        </p>

        {/* Buy Button */}
        <div className='flex items-center mt-10 cursor-pointer group/buy'>
          <span className='text-[16px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] group-hover/buy:underline'>
            {t('buy')}
          </span>
          <ChevronRight
            size={20}
            className='text-[#1a73e8] dark:text-[#8ab4f8] ml-0.5'
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
