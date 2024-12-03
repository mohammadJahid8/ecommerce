'use client';
import { memo } from 'react';
import Carousel from 'react-elastic-carousel';
import IconArrowLeft from '@/assets/icons/IconArrowLeft';
import IconArrowRight from '@/assets/icons/IconArrowRight';
import css from './index.module.css';
import IconChevronLeft from '@/assets/icons/IconChevronLeft';
import IconChevronRight from '@/assets/icons/IconChevronRight';

const breakPoints = [
  { width: 200, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 900, itemsToShow: 5, itemsToScroll: 1 },
];

const MutiCarousel = (props: any) => {
  const { isArrow = true, iconType = 0 } = props;
  return (
    <Carousel
      {...props}
      renderArrow={(props: any) => {
        if (isArrow === false) {
          return <></>;
        } else {
          if (iconType === 1) {
            if (props.type == 'NEXT' && props.isEdge === false) {
              return (
                <div
                  onClick={props.onClick}
                  className={css.wrapbtnArrow + '  text-primary cursor-pointer'}
                >
                  <IconChevronRight width={20} height={20} color={''} />
                </div>
              );
            } else if (props.type == 'PREV' && props.isEdge === false) {
              return (
                <div
                  onClick={props.onClick}
                  className={css.wrapbtnArrow + '  text-primary cursor-pointer'}
                >
                  <button
                    className={
                      'flex justify-center items-center cursor-pointer' +
                      css.styleBtnArrow
                    }
                  >
                    <IconChevronLeft width={20} height={20} color={''} />
                  </button>
                </div>
              );
            }
          } else if (props.type == 'NEXT' && props.isEdge === false) {
            return (
              <div onClick={props.onClick} className={css.wrapbtnArrow}>
                <button
                  className={
                    'shadow-lg flex justify-center items-center cursor-pointer ' +
                    css.styleBtnArrow
                  }
                >
                  <IconArrowRight width={22} height={22} color={''} />
                </button>
              </div>
            );
          } else if (props.type == 'PREV' && props.isEdge === false) {
            return (
              <div onClick={props.onClick} className={css.wrapbtnArrow}>
                <button
                  className={
                    'shadow-lg flex justify-center items-center cursor-pointer ' +
                    css.styleBtnArrow
                  }
                >
                  <IconArrowLeft width={22} height={22} color={''} />
                </button>
              </div>
            );
          }
          return <></>;
        }
      }}
      showEmptySlots={true}
      pagination={false}
      breakPoints={(props?.breakPoints && props.breakPoints) || breakPoints}
    >
      {props?.children}
    </Carousel>
  );
};

export default memo(MutiCarousel);
