'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { ISmartHome } from '@/models/smart-home.model';
import css from './index.module.css';

interface IProps {
  smartHome: ISmartHome;
}

const SmartHomeItem = (props: IProps) => {
  const { smartHome } = props;
  return (
    <div className={css.containerCategoryItem}>
      <div className={'flex justify-center items-center ' + css.wrapImage}>
        <div
          className={'flex justify-center items-center  ' + css.containerImage}
        >
          <Image
            className='transition ease-in-out hover:-translate-y-1 hover:scale-110'
            priority={true}
            src={smartHome?.imageUrl}
            style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }}
            width={100}
            height={200}
            alt={smartHome?.imageAlt}
          />
        </div>
      </div>
      <div className='mt-5'>
        <p className={css.styleNameCate}>{smartHome?.name}</p>
      </div>
    </div>
  );
};

export default memo(SmartHomeItem);
