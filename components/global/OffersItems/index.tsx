'use client';
import React, { memo, useState } from 'react';
import Image from 'next/image';
import { IOffer } from '@/models/spectialOffer.model';
import IconTag from '@/assets/icons/IconTag';
import Toast from '../Toast';

interface IProps {
  offers: IOffer[];
}
const termMessage =
  'Save $80 on Pixel Buds Pro. Starts November 16, 2023 at 12:00 am PT and ends November 29, 2023 at 11:59pm PT, while supplies last and subject to availability. US residents only. Must be 18 years or older. Except for eligible phone trade-in, offer cannot be combined with any promotional codes, or with other bundle offers running at the same time. It’s non-transferable, and it isn’t valid for cash or a cash equivalent. Purchase must be made on Google Store US. Void where prohibited.';
const SpecialOffersItem = (props: IProps) => {
  const { offers } = props;
  const [isOpenToast, setIsOpenToast] = useState(false);
  const openToast = () => setIsOpenToast(true);
  const closeToast = () => setIsOpenToast(false);

  return (
    <div className='grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5 '>
      {offers.map((offer, index) => {
        return (
          <div
            key={offer.id + index.toString()}
            className='rounded-3xl cursor-pointer my-4'
          >
            <div className='bg-slate-100 rounded-3xl py-10'>
              <Image
                priority={true}
                src={offer?.image}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  borderRadius: 20,
                }}
                width={369.33}
                height={295.45}
                alt={'image website' + offer?.imageAlt}
              />
            </div>

            <div className='m-3 '>
              <h3 className='text-lg  font-roboto font-bold  pt-2'>
                {offer?.name}
              </h3>
              <p className='text-sm tracking-wide font-roboto font-light py-3'>
                {offer?.productDetail}
              </p>
              <div className='flex flex-row'>
                <h4 className='text-lg font-roboto'> ${offer?.price} </h4>
                <h4 className='pl-2 text-slate-300 text-lg text-thin font-roboto line-through text-md'>
                  {' '}
                  ${offer?.price}
                </h4>{' '}
              </div>

              <div className='py-2'>
                <h2 className=' flex flex-row bg-green-100 mt-2 w-[130px] justify-center rounded-xl'>
                  <IconTag width={20} height={20} color={''} />

                  <span className='text-md'>
                    &nbsp; Save ${offer?.savePrice}
                  </span>
                </h2>
              </div>
              <div>
                <button
                  onClick={openToast}
                  className='py-2 rounded underline underline-offset-2 text-blue-500'
                >
                  View Terms
                </button>
                <Toast
                  isOpen={isOpenToast}
                  message={termMessage}
                  onClose={closeToast}
                />
              </div>
              {/* <div className="py-5 align-bottom">
                <button className="  bg-transparent hover:bg-white  font-semibold hover:text-slate-500 py-2 px-4 border border-white hover:border-transparent rounded">
                  Buy
                </button>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(SpecialOffersItem);
