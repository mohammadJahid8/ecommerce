'use client';
import React, { memo, useCallback, useState } from 'react';
import SliderImageProductItem from '../../components/SliderImageProductItem';
import IconGird2Column from '@/assets/icons/IconGird2Column';
import IconGird3Column from '@/assets/icons/IconGird3Column';
import Popover, { IOption } from '@/components/global/Popover';

const products = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];

const ListAccessortyProduct = () => {
  const [layout, setLayout] = useState('md:grid-cols-3 sm:grid-cols-2');
  const [gridLayout, setGridLayout] = useState('3');

  const changeToThreeColumns = () => (
    setLayout('md:grid-cols-3 sm:grid-cols-2 '), setGridLayout('3')
  );

  const changeToTwoColumns = () => (
    setLayout('grid-cols-2 xl:grid-cols-3'), setGridLayout('2')
  );

  const [s_options, setOptions] = useState<IOption[]>([
    {
      id: '2345678',
      name: 'Featured',
      isChoose: true,
    },
    {
      id: '456789',
      name: 'Newest',
      isChoose: false,
    },
  ]);
  const onChooseItem = useCallback(
    (option: IOption) => {
      const newOptions = s_options.map((_option) => {
        if (_option.id === option.id) {
          return {
            ..._option,
            isChoose: true,
          };
        }

        return {
          ..._option,
          isChoose: false,
        };
      });
      setOptions(newOptions);
    },
    [s_options]
  );
  return (
    <div className='w-full'>
      <div className='mt-2 mx-auto flex flex-row justify-end pb-10'>
        <div className='flex-row flex items-center justify-center'>
          <div className='flex-1 mr-2'>
            <p>{'Sort By'}</p>
          </div>
          <Popover options={s_options} onChooseItem={onChooseItem} />
          <button
            className='mx-1 ml-5 hidden md:block sm:hidden'
            onClick={changeToThreeColumns}
          >
            <IconGird3Column
              color={gridLayout === '3' ? '#1967D2' : 'grey'}
              width={18}
              height={18}
            />
          </button>
          <button
            className='mx-1  hidden md:block  sm:hidden'
            onClick={changeToTwoColumns}
          >
            <IconGird2Column
              color={gridLayout === '2' ? '#1967D2' : 'grey'}
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      <div className={` grid ${layout} gap-5`}>
        {products.map((product, index) => {
          return (
            <React.Fragment key={product + index.toString()}>
              <SliderImageProductItem gridLayout={Number(gridLayout)} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ListAccessortyProduct);
