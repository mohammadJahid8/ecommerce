'use client';
import React, { memo } from 'react';
import Accordions from '@/components/global/Accordions';
import IconListBullet from '@/assets/icons/IconListBullet';
import LeftFilters from './containers/LeftFilters';
import ColorFilters from './containers/ColorFilters';
import { brands, categories, productTypes } from './datas/categories';
import IconRefresh from '@/assets/icons/IconRefresh';
import ListAccessoryProduct from './containers/ListAccessoryProduct';
import PageNavigation from '@/components/global/PageNavigation';

const AccessoriesClient = () => {
  const navigateToPage = (page: number) => {
    // Implement your page navigation logic here
    console.log(`Navigating to page ${page}`);
  };

  return (
    <div className='max-w-screen-xl xl:mx-auto flex md:ml-[30px] md:mr-[30px] sm:ml-[20px] sm:mr-[20px] ml-[10px] mr-[10px] flex-col flex-1 justify-center py-10'>
      <div className='flex flex-row'>
        <div style={{ flex: 2 }} className='md:flex flex-col hidden'>
          <div>
            <span className='font-bold text-xl mt-0 text-text-primary'>
              {'Accessories'}
            </span>
          </div>
          <div className='flex flex-row items-center mt-5 pt-5 pb-2'>
            <IconListBullet width={20} height={20} />
            <p className='ml-2'>{'Filters'}</p>
          </div>
          <hr />

          <div className='mt-2 mb-2'>
            <Accordions
              name='Compatibility'
              body={<LeftFilters datas={categories} />}
            />
          </div>
          <hr />

          <div className='mt-2 mb-2'>
            <Accordions
              name='Product type'
              body={<LeftFilters datas={productTypes} />}
            />
          </div>
          <hr />

          <div className='mt-2 mb-2'>
            <Accordions name='Colors' body={<ColorFilters />} />
          </div>
          <hr />

          <div className='mt-2 mb-2'>
            <Accordions name='Brands' body={<LeftFilters datas={brands} />} />
          </div>
          <hr />
          <div className='mt-4 mb-2 flex flex-row hover:text-primary items-center cursor-pointer'>
            <IconRefresh width={20} height={20} />
            <p
              style={{ fontWeight: '500' }}
              className='font-roboto ml-3 text-sm'
            >
              {'Reset filters'}
            </p>
          </div>
        </div>
        <div style={{ flex: 8 }}>
          <div className='flex md:ml-[3rem] sm:ml-0'>
            <ListAccessoryProduct />
          </div>
          <div className='max-w-sm mx-auto flex  flex-col flex-1 justify-center py-10'>
            <PageNavigation
              currentPage={1}
              totalPage={12}
              navigateToPage={navigateToPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AccessoriesClient);
