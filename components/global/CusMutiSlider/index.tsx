'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface IProps {
  children?: any;
  pHideLeftIcon?: boolean;
  pHideRightIcon?: boolean;
}

const CusMutiSlider = (props: IProps) => {
  const { pHideLeftIcon = false, pHideRightIcon = false } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hideLeftIcon, setHideLeftIcon] = useState(true);
  const [hideRightIcon, setRightIcon] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressWidth, setProgressWidth] = useState(50);

  // No fixed scrollAmount, calculated dynamically

  const getScrollAmount = () => {
    if (!sliderRef.current) return 0;
    const container = sliderRef.current;
    const items = container.children;
    if (items.length === 0) return 0;

    const item = items[0] as HTMLElement;
    const itemWidth = item.getBoundingClientRect().width;
    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.gap) || 0;
    const containerWidth = container.clientWidth;

    // Calculate effective item width (item + gap)
    const effectiveItemWidth = itemWidth + gap;

    // Determine how many items are fully visible
    // We aim to scroll by the number of visible items (pagination style) or at least 1
    const itemsPerView = Math.floor(containerWidth / effectiveItemWidth);
    const scrollCount = itemsPerView > 0 ? itemsPerView : 1;

    return scrollCount * effectiveItemWidth;
  };

  const updateScrollState = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, offsetWidth } = sliderRef.current;
    const maxScroll = scrollWidth - offsetWidth;

    setHideLeftIcon(scrollLeft <= 10);
    setRightIcon(Math.floor(scrollWidth - scrollLeft) <= offsetWidth);

    if (maxScroll > 0) {
      const progress = (scrollLeft / maxScroll) * 100;
      const visibleRatio = (offsetWidth / scrollWidth) * 100;
      setScrollProgress(progress);
      setProgressWidth(Math.max(visibleRatio, 30));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || !containerRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    const { scrollWidth, offsetWidth } = sliderRef.current;
    const maxScroll = scrollWidth - offsetWidth;
    const scrollTo = maxScroll * percentage;

    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      const amount = getScrollAmount();
      sliderRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      const amount = getScrollAmount();
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className='relative'>
      {/* Left Arrow */}
      <div
        className={`absolute z-10 top-[140px] -translate-y-1/2 left-0 md:-left-[40px] xl:-left-[80px] flex transition-opacity duration-300 ${
          hideLeftIcon || pHideLeftIcon
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <button
          className='p-0 cursor-pointer bg-white flex items-center justify-center rounded-full h-[48px] w-[48px] md:h-[60px] md:w-[60px] border border-[#dadce0] shadow-md transition-all duration-200 hover:bg-[#F8F9FA] active:bg-[#F1F3F4] dark:bg-[#202124] dark:text-white dark:border-[#5f6368] dark:hover:bg-[#303134] select-none'
          onClick={handleScrollLeft}
          aria-label='Scroll left'
        >
          <ArrowLeft
            size={24}
            strokeWidth={2}
            className='text-[#3c4043] dark:text-white'
          />
        </button>
      </div>

      {/* Slider Container */}
      <div
        onScroll={updateScrollState}
        className={`${styles.imagesContainer} grid grid-flow-col xl:gap-6 gap-3 auto-cols-[minmax(280px,1fr)] md:auto-cols-[calc((100%-48px)/3)] lg:auto-cols-[calc((100%-96px)/5)]`}
        ref={sliderRef}
      >
        {props.children}
      </div>

      {/* Right Arrow */}
      <div
        className={`absolute z-10 top-[140px] -translate-y-1/2 right-0 md:-right-[40px] xl:-right-[80px] flex transition-opacity duration-300 ${
          hideRightIcon || pHideRightIcon
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <button
          className='p-0 cursor-pointer bg-white flex items-center justify-center rounded-full h-[48px] w-[48px] xl:h-[60px] xl:w-[60px] border border-[#dadce0] shadow-md transition-all duration-200 hover:bg-[#F8F9FA] active:bg-[#F1F3F4] dark:bg-[#202124] dark:text-white dark:border-[#5f6368] dark:hover:bg-[#303134] select-none'
          onClick={handleScrollRight}
          aria-label='Scroll right'
        >
          <ArrowRight
            size={24}
            strokeWidth={2}
            className='text-[#3c4043] dark:text-white'
          />
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className='mt-12 mx-auto w-full cursor-pointer group'
        onClick={handleProgressClick}
      >
        <div className='relative h-[3px] bg-[#e8eaed] dark:bg-[#3c4043] rounded-full overflow-hidden'>
          <div
            className='absolute h-full bg-[#202124] dark:bg-[#e8eaed] rounded-full transition-all duration-300 ease-out'
            style={{
              width: `${progressWidth}%`,
              left: `${(scrollProgress / 100) * (100 - progressWidth)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CusMutiSlider);
