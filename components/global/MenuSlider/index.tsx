'use client';
import React, { memo } from 'react';
import { IMenu } from '@/models/menuOffer.model';
import MenuSliderItem from '../MenuSliderItem';

interface IProps {
  menus: IMenu[];
  offerItemChoose: any;
  onFilter: any;
}

const MenuSlider = (props: IProps) => {
  const { menus, offerItemChoose, onFilter } = props;

  return menus.map((menus, index) => {
    return (
      <React.Fragment key={menus?.id + index.toString()}>
        <MenuSliderItem
          onFilter={onFilter}
          offerItemChoose={offerItemChoose}
          menu={menus}
        />
      </React.Fragment>
    );
  });
};

export default memo(MenuSlider);
