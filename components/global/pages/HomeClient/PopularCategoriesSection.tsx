import React from 'react';
import CategoryItem from '../../CategoryItem';

const PopularCategoriesSection = ({ t, popularCategories }: any) => {
  return (
    <div className='flex-col flex flex-1 mt-32 mb-10'>
      <p className='text-center md:text-4xl text-2xl text-[#3C4043] font-bold mb-10 dark:text-white'>
        {t('shop_popular_categories')}
      </p>
      <div className='grid md:grid-cols-4 sm:grid-cols-1 gap-6 md:mx-20 sm:mx-0'>
        {popularCategories?.length > 0 &&
          popularCategories
            .slice(-4)
            .map((popularCategory: any, index: number) => (
              <React.Fragment key={index}>
                <CategoryItem popularCategory={popularCategory} />
              </React.Fragment>
            ))}
      </div>
    </div>
  );
};

export default PopularCategoriesSection;
