import React from 'react';
import MainLayout from '@/components/global/MainLayout';
import { ISpecialOffer } from '@/models/spectialOffer.model';
import { getOffers, getOfferTypes } from '@/services/offer/offer.services';
import OfferClient from '@/components/global/pages/OfferClient';

const specialOffers: ISpecialOffer[] = [
  {
    id: 'xxxx222ff44444rrrrfff',
    title: 'Save $150 on Pixel 8.',
    detail: 'Get Pixel 8 for as low as $0 with eligible trade-in.',
    salePrice: 549,
    originalPrice: 699,
    savePrice: 150,
    imageUrl: '/images/pixel-8-blackfriday.png',
    imageAlt: 'A Pixel 8 surrounded by holiday icons',
    buyUrl: '',
    termsUrl: '',
  },
  {
    id: 'xxxx333ff44444rrrrfff',
    title: 'Save $80 on the Pixel Watch.',
    detail: '',
    salePrice: 199.0,
    originalPrice: 279.99,
    savePrice: 80,
    imageUrl: '/images/pixel-watch-blackfriday.png',
    imageAlt: 'A Google Pixel Watch surrounded by holiday icons.',
    buyUrl: '',
    termsUrl: '',
  },
  {
    id: 'xxxx444ff44444rrrrfff',
    title: 'Save $100 on the Pixel Tablet.',
    detail: '',
    salePrice: 399,
    originalPrice: 499,
    savePrice: 100,
    imageUrl: '/images/pixel-tablet-blackfriday.png',
    imageAlt: 'Pixel Tablet surrounded by holiday icons.',
    buyUrl: '',
    termsUrl: '',
  },
];

const Offers = async () => {
  const offerItems = await getOffers();
  const offerTypes = await getOfferTypes();

  return (
    <MainLayout>
      <OfferClient
        specialOffers={specialOffers}
        menuOffers={offerTypes}
        offersItem={offerItems}
      />
    </MainLayout>
  );
};

export default React.memo(Offers);
