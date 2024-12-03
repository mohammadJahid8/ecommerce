'use client';
import React, { memo } from 'react';
import { IArticle } from '@/models/artile.model';
import MutiCarousel from '@/components/global/MutiSlider';
import DisCorverWorldPixelItem from '@/components/global/DisCorverWorldPixelItem';

interface IProps {
  articles: IArticle[];
}

const breakPoints = [
  { width: 200, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 900, itemsToShow: 3, itemsToScroll: 1 },
];

const SliderArticles = (props: IProps) => {
  const { articles } = props;

  if (articles.length > 0) {
    return (
      <MutiCarousel breakPoints={breakPoints}>
        {articles.map((article, index) => {
          return (
            <React.Fragment key={article?.id + index.toString()}>
              <DisCorverWorldPixelItem article={article} />
            </React.Fragment>
          );
        })}
      </MutiCarousel>
    );
  }
  return <></>;
};

export default memo(SliderArticles);
