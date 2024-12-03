'use client';
import React from 'react';
import ProductItem from '@/components/global/ProductItem';
import { IPopularProduct } from '@/models/popularProduct.model';
import CusMutiSlider from '@/components/global/CusMutiSlider';

interface IProps {
  popularProducts: IPopularProduct[];
}

const MutipleSliderProducts = (props: IProps) => {
  if (props?.popularProducts?.length > 0) {
    return (
      <CusMutiSlider>
        {props.popularProducts.map((product, index) => {
          return (
            <React.Fragment key={product.name + index.toString()}>
              <ProductItem popularProduct={product} />
            </React.Fragment>
          );
        })}
      </CusMutiSlider>
    );
  }

  return <></>;
};

export default React.memo(MutipleSliderProducts);
