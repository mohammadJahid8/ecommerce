'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { ISpecialOffer } from '@/models/spectialOffer.model';

interface IProps {
  specialOffer: ISpecialOffer;
}

const SpecialOffersItem = (props: IProps) => {
  const { specialOffer } = props;

  return (
    <div className='flex flex-col flex-1 bg-black rounded-3xl cursor-pointer'>
      <div className='text-center max-h-[250px] m-3 p-5'>
        <h3 className='text-lg text-white font-roboto  pt-2'>
          {specialOffer?.title}
        </h3>
        <p className='text-sm text-t tracking-wide font-light	 text-white py-5'>
          {specialOffer?.detail}
        </p>
        <h4 className='text-white'>
          {' '}
          From ${specialOffer?.salePrice}{' '}
          <span className='text-slate-300 line-through'>
            {' '}
            ${specialOffer?.originalPrice}
          </span>{' '}
          <span className='text-green-600'>
            Save ${specialOffer?.savePrice}
          </span>
        </h4>
        <a
          className='text-white text-sm/8 font-thin pt underline mt-[-5px]'
          href={specialOffer?.termsUrl}
        >
          view terms
        </a>
        <div className='py-5 align-bottom'>
          <button className='  bg-transparent hover:bg-white text-white font-semibold hover:text-slate-500 py-2 px-4 border border-white hover:border-transparent rounded'>
            Buy
          </button>
        </div>
      </div>
      <div>
        <Image
          priority={true}
          src={specialOffer?.imageUrl}
          style={{
            objectFit: 'contain',
            width: '100%',
            borderRadius: 20,
          }}
          width={369.33}
          height={295.45}
          alt={'image website' + specialOffer?.imageAlt}
        />
      </div>
    </div>
  );
};

export default memo(SpecialOffersItem);
