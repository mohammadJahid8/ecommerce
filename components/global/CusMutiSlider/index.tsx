'use client';
import React, { useState, useRef } from 'react';
import styles from './index.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface IProps {
  children?: any;
  pHideLeftIcon?: boolean;
  pHideRightIcon?: boolean;
}

const CusMutiSlider = (props: IProps) => {
  const { pHideLeftIcon = false, pHideRightIcon = false } = props;
  const sliderRef = useRef(null);
  const scrollAmount = 800;
  const containerRef = useRef(null);
  const [hideLeftIcon, setHideLeftIcon] = useState(true);
  const [hideRightIcon, setRightIcon] = useState(false);

  return (
    <div
      ref={containerRef}
      className='flex justify-center items-center relative gap-5'
    >
      <div
        className={`absolute z-10 top-32 left-10 transition-opacity duration-300 ${
          hideLeftIcon || pHideLeftIcon ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          className='p-0 cursor-pointer bg-white flex items-center justify-center rounded-full h-[60px] w-[60px] border border-gray-200 shadow-md dark:bg-[#202124] dark:text-white dark:border-black'
          onClick={() => {
            const container: any = sliderRef.current;
            container.scrollLeft -= scrollAmount;
          }}
        >
          <ArrowLeft className='dark:text-white' />
        </button>
      </div>
      <div
        onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const scrollWidth = e.currentTarget.scrollWidth;
          const offsetScrollWidth = e.currentTarget.offsetWidth;

          if (Math.floor(scrollWidth - scrollLeft) <= offsetScrollWidth) {
            setRightIcon(true);
          } else {
            setRightIcon(false);
          }

          if (scrollLeft <= 10) {
            setHideLeftIcon(true);
          } else {
            setHideLeftIcon(false);
          }
        }}
        className={styles.imagesContainer}
        ref={sliderRef}
      >
        {props.children}
      </div>
      <div
        className={`absolute z-10 top-32 right-10 transition-opacity duration-300 ${
          hideRightIcon || pHideRightIcon ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          className='p-0 cursor-pointer bg-white flex items-center justify-center rounded-full h-[60px] w-[60px] border border-gray-200 dark:border-black shadow-md dark:bg-[black] dark:text-white'
          onClick={() => {
            const container: any = sliderRef.current;
            container.scrollLeft += scrollAmount;
          }}
        >
          <ArrowRight className='dark:text-white' />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CusMutiSlider);
