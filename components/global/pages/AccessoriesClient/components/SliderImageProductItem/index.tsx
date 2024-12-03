'use client';
import React, { memo, useState } from 'react';
import Image from 'next/image';
import MutiSlider from '@/components/global/MutiSlider';
interface IProps {
  gridLayout: number;
}

const colors = [
  {
    id: 'colors_1',
    color: '#7E7E7E',
  },
  {
    id: 'colors_2',
    color: 'blue',
  },
  {
    id: 'colors_3',
    color: '#825C41',
  },
  {
    id: 'colors_4',
    color: '#191970',
  },
];

const images = [
  '/images/accessories/pixel-8-pro-case/pixel-8-pro-case-blue.png',
  '/images/accessories/pixel-8-pro-case/pixel-8-pro-case-blue.png',
  '/images/accessories/pixel-8-pro-case/pixel-8-pro-case-blue.png',
];

const SliderImageProductItem = (props: IProps) => {
  const { gridLayout } = props;

  const [colorChoose, setColorChoose] = useState<string>('');

  return (
    <div className='flex flex-col '>
      <div
        className={`bg-[#F8F9FA] flex items-center justify-center p-3 py-[80px]`}
      >
        <MutiSlider isArrow={true} iconType={1}>
          {images.map((image, index) => (
            <React.Fragment key={image + index.toString()}>
              <Image
                className='transition ease-in-out hover:-translate-y-1 hover:scale-110'
                priority={true}
                src={image}
                style={{
                  width: '100%',
                  contain: 'content',
                }}
                width={gridLayout == 3 ? 294.125 : 451.5}
                height={gridLayout == 3 ? 254.531 : 436.359}
                alt={'alt image slider product item'}
              />
            </React.Fragment>
          ))}
        </MutiSlider>
      </div>

      <div className=' gap-2  hidden lg:flex lg:flex-row lg:mt-[-30px] lg:pl-5 '>
        <div className=''></div>
        {colors.map((color, index) => {
          return (
            <div
              onClick={() => {
                if (color.id === colorChoose) {
                  setColorChoose('');
                } else {
                  setColorChoose(color.id);
                }
              }}
              className='cursor-pointer'
              key={color?.id + index.toString()}
              style={
                colorChoose === color.id
                  ? {
                      backgroundColor: color.color,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      border: '2px solid #2F75D6',
                    }
                  : {
                      backgroundColor: color.color,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }
              }
            ></div>
          );
        })}
      </div>
      <div className='mt-2 mb-2 py-5'>
        <p className='font-bold text-md font-roboto'>{'Pixel 8 Pro Case'}</p>
        <p className='font-500 text-md text-[grey] font-roboto mt-2'>
          {'Pixel 8 Pro Case'}
        </p>
      </div>

      <div className=' gap-2 flex flex-row lg:hidden mt-[-20px] pt-2 pb-10 '>
        <div className=''></div>
        {colors.map((color, index) => {
          return (
            <div
              onClick={() => {
                if (color.id === colorChoose) {
                  setColorChoose('');
                } else {
                  setColorChoose(color.id);
                }
              }}
              className='cursor-pointer'
              key={color?.id + index.toString()}
              style={
                colorChoose === color.id
                  ? {
                      backgroundColor: color.color,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      border: '2px solid #2F75D6',
                    }
                  : {
                      backgroundColor: color.color,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SliderImageProductItem);
