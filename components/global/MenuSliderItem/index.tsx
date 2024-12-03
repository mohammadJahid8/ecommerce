'use client';
import React from 'react';
import { IMenu } from '@/models/menuOffer.model';

interface IProps {
  menu: IMenu;
  offerItemChoose: any;
  onFilter: any;
}

const MenuSliderItem = ({ menu, offerItemChoose, onFilter }: IProps) => {
  const itemClasses =
    menu?.id === offerItemChoose.id
      ? 'text-[#1967D2] bg-[#E8F0FE] hover:border-none border-blue-500'
      : 'text-black hover:bg-slate-200';
  return (
    <div onClick={() => onFilter(menu)}>
      <div
        className={`${itemClasses} truncate bg-[#F8F9FA] text-sm text-thin py-2 px-3 mx-2 border rounded-full cursor-pointer`}
      >
        {menu.name}
      </div>
    </div>
  );
};

export default React.memo(MenuSliderItem);
