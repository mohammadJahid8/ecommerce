'use client';
import React, { memo } from 'react';
import { ISpecialOffer } from '@/models/spectialOffer.model';
import MutiCarousel from '@/components/global/MutiSlider';
import SpecialOffersItem from '@/components/global/SpecialOffersItem';

interface IProps {
  specialOffers: ISpecialOffer[];
}

const breakPoints = [
  { width: 200, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 2, itemsToScroll: 1 },
  { width: 900, itemsToShow: 3, itemsToScroll: 1 },
];

const SliderSpecialOffer = (props: IProps) => {
  const { specialOffers } = props;

  if (specialOffers.length > 0) {
    return (
      <MutiCarousel breakPoints={breakPoints}>
        {specialOffers.map((specialOffer, index) => {
          const addClass = index === 0 ? 'mr-2' : index == 1 ? 'mr-1' : 'ml-1';
          return (
            <div
              className={'flex-1 ' + addClass}
              key={specialOffer?.id + index.toString()}
            >
              <SpecialOffersItem specialOffer={specialOffer} />
            </div>
          );
        })}
      </MutiCarousel>
    );
  }
  return <></>;
};

export default memo(SliderSpecialOffer);
