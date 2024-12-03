'use client';
import React, { memo } from 'react';
import CusMutiSlider from '@/components/global/CusMutiSlider';
import SmartHomeSliderItem from '../../components/SmartHomeSliderItem';
import { ISmartHome } from '@/models/smart-home.model';

const accessoriesWall: ISmartHome[] = [
  {
    id: 44445555666677444444778888,
    name: 'Thermostats',
    imageAlt: 'alt-Thermostats',
    imageUrl: '/images/smart-home/Thermostats.png',
    url: '',
  },
  {
    id: 44445555666677335555553333778888,
    name: 'Lighting',
    imageAlt: 'alt-Lighting',
    imageUrl: '/images/smart-home/lighting.png',
    url: '',
  },
  {
    id: 44445555666644444666664477333333778888,
    name: 'Chargers',
    imageAlt: 'alt-smart-Chargers',
    imageUrl: '/images/smart-home/Chargers.png',
    url: '',
  },
  {
    id: 4444555555556666666644444666664477333333778888,
    name: 'Smart Light Starter Package',
    imageAlt: 'alt-smart-Smart Light Starter Package',
    imageUrl: '/images/smart-home/smart-light.png',
    url: '',
  },
];

const SliderAccessoriesWall = () => {
  if (accessoriesWall?.length > 0) {
    return (
      <CusMutiSlider pHideLeftIcon={true} pHideRightIcon={true}>
        {accessoriesWall.map((accessoriesWall, index) => {
          return (
            <React.Fragment key={accessoriesWall.name + index.toString()}>
              <SmartHomeSliderItem smartHome={accessoriesWall} />
            </React.Fragment>
          );
        })}
      </CusMutiSlider>
    );
  }

  return <></>;
};

export default memo(SliderAccessoriesWall);
