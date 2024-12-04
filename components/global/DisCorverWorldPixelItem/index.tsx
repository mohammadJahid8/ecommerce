'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { IArticle } from '@/utils/interfaces';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

const DisCoverWorldPixelItem = (props: { article: IArticle }) => {
  const { article } = props;
  const { t } = useTranslation();

  return (
    <div className='flex flex-col w-full md:m-2.5 cursor-pointer'>
      <Image
        priority={true}
        src={article?.imageUrl}
        className='w-full h-[377px] rounded-3xl object-cover'
        width={600}
        height={600}
        alt={'image website' + article?.imageAlt}
      />
      <div className='mt-7 text-center max-w-[350px] mx-auto'>
        <p className='text-base md:text-xl font-bold text-[#3C4043] truncate dark:text-white'>
          {article.label}
        </p>
        <div
          className={'mt-2 flex items-center justify-center gap-2 font-medium'}
        >
          <p className='text-base text-[#1967D2] dark:text-[#8ab4f8]'>
            {t('see_more')}
          </p>
          <ChevronRight className='text-[#1967D2] w-5 h-5 stroke-[2.5] dark:text-[#8ab4f8]' />
        </div>
      </div>
    </div>
  );
};

export default memo(DisCoverWorldPixelItem);
