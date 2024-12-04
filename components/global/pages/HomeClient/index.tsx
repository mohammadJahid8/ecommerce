'use client';
import React, { useState } from 'react';
import MainLayout from '../../MainLayout';
import { HomeClientProps } from '@/utils/interfaces';
import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';
import ProductSection from './ProductSection';
import PixelWatchSection from './PixelWatchSection';
import PixelPortfolioSection from './PixelPortfolioSection';
import ProductSections from './ProductSections';
import PopularCategoriesSection from './PopularCategoriesSection';
import ArticlesSection from './ArticlesSection';
import MapSection from './MapSection';
import PromotionsSection from './PromotionsSection';
import SolutionSection from './SolutionSection';
import FaqSection from './FaqSection';

const HomeClient: React.FC<HomeClientProps> = (
  props: HomeClientProps = {
    t: () => '',
    popularProducts: [],
    popularCategories: [],
    articles: [],
  }
) => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className='flex flex-col flex-1 max-w-[1392px] mx-auto px-4 sm:px-6 2xl:px-0'>
        <HeroSection t={t} />
        <ProductSection t={t} popularProducts={props.popularProducts} />
        <PixelWatchSection t={t} />
        <PixelPortfolioSection
          t={t}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <ProductSections t={t} />
        <PopularCategoriesSection
          t={t}
          popularCategories={props.popularProducts}
        />
        <ArticlesSection t={t} articles={props.articles} />
        <MapSection t={t} />
        <PromotionsSection t={t} />
        <SolutionSection t={t} />
        <FaqSection t={t} />
      </div>
    </MainLayout>
  );
};

export default React.memo(HomeClient);
