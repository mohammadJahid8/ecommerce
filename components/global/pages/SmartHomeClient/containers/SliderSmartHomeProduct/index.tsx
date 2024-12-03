'use client';
import React, { memo } from 'react';
import SmartHomeSliderItem from '../../components/SmartHomeSliderItem';
import { ISmartHome } from '@/models/smart-home.model';
import CusMutiSlider from '@/components/global/CusMutiSlider';

const smartHomeCategories: ISmartHome[] = [
  {
    id: 44445555666677778888,
    name: 'Camera',
    imageAlt: 'alt-camera',
    imageUrl: '/images/smart-home/camera.png',
    url: '',
  },
  {
    id: 44445555666677333333778888,
    name: 'Doorbells',
    imageAlt: 'alt-doorbells',
    imageUrl: '/images/smart-home/doorbells.png',
    url: '',
  },
  {
    id: 444455556666444444477333333778888,
    name: 'Smart lock',
    imageAlt: 'alt-smart-lock',
    imageUrl: '/images/smart-home/doorbells.png',
    url: '',
  },
  {
    id: 444455554444446666444444477333333778888,
    name: 'Displays',
    imageAlt: 'alt-displays',
    imageUrl: '/images/smart-home/displays.png',
    url: '',
  },
  {
    id: 4444555544444466644444446444444477333333778888,
    name: 'Wi-Fi',
    imageAlt: 'alt-wi-fi',
    imageUrl: '/images/smart-home/wi-fi.png',
    url: '',
  },
  {
    id: 4444555333333544444466644444446444444477333333778888,
    name: 'Smoke and CO alarm',
    imageAlt: 'Smoke and CO alarm',
    imageUrl: '/images/smart-home/smoke&COAlarm.png',
    url: '',
  },
  {
    id: 4444555333333544444465555556644444446444444477333333778888,
    name: 'Front Door Monitoring Package',
    imageAlt: 'Front Door Monitoring Package alit image',
    imageUrl: '/images/smart-home/Front-Door-Monitoring.png',
    url: '',
  },
  {
    id: 444455533333354444446555666677775556644444446444444477333333778888,
    name: 'Outdoor Door Monitoring Package',
    imageAlt: 'Outdoor Door Monitoring Package alit image',
    imageUrl: '/images/smart-home/out-door-monitoring.png',
    url: '',
  },
  {
    id: 444455544444433333354444446555666677775556644444446444444477333333778888,
    name: 'Total Sercurity Package',
    imageAlt: 'Total Sercurity Package alt image',
    imageUrl: '/images/smart-home/total-sercurity-package.png',
    url: '',
  },
];

const SliderSmartHomeProduct = () => {
  if (smartHomeCategories?.length > 0) {
    return (
      <CusMutiSlider>
        {smartHomeCategories.map((smartHomeCate, index) => {
          return (
            <React.Fragment key={smartHomeCate.name + index.toString()}>
              <SmartHomeSliderItem smartHome={smartHomeCate} />
            </React.Fragment>
          );
        })}
      </CusMutiSlider>
    );
  }

  return <></>;
};

export default memo(SliderSmartHomeProduct);
