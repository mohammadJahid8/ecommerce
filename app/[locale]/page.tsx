import { Metadata } from 'next';
import MainLayout from '@/components/global/MainLayout';
import HomeClient from '@/components/global/pages/HomeClient';
import {
  getProductPopulars,
  getPopularCategories,
} from '@/services/home/home.services';
import { IArticle } from '@/utils/interfaces';

const articles: IArticle[] = [
  {
    id: 'xxxx222fffff',
    label: 'This camera is not afraid of the dark.',
    imageUrl: '/images/cameraafraid.png',
    imageAlt: 'Alt This camera is not afraid of the dark.',
    url: '',
  },
  {
    id: 'xxxx22444444455552fffff',
    label: 'Pixel 8 and Pixel 8 Pro have arrived. And they brought deals.',
    imageUrl: '/images/home/pixel-8-pro-articles.png',
    imageAlt:
      'Alt Pixel 8 and Pixel 8 Pro have arrived. And they brought deals.',
    url: '',
  },
  {
    id: 'xxxx2244555556ffff667774444455552fffff',
    label: 'Fitness goals deserve a fitness watch.',
    imageUrl: '/images/home/fitness-go.png',
    imageAlt: 'alt Fitness goals deserve a fitness watch.',
    url: '',
  },
  {
    id: 'xxxx22445555563434444667774444455552fffff',
    label: 'A new trainer for your morning run.',
    imageUrl: '/images/home/run.png',
    imageAlt: 'alt A new trainer for your morning run.',
    url: '',
  },
  {
    id: 'xxxx2244533333555563434444667774444455552fffff',
    label: 'A magical new way to become a top creator.',
    imageUrl: '/images/home/dogs.png',
    imageAlt: 'alt A new trainer for your morning run.',
    url: '',
  },
];

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
  openGraph: {
    title: 'Shop',
    type: 'website',
    siteName: 'Shop',
    description:
      'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
    images: [
      {
        url: 'https://raw.githubusercontent.com/NguyenTienHao97/HealthApp/main/dogs.png',
      },
    ],
  },
  twitter: {
    title: 'Shop tiwtter',
    site: 'Shop',
    description:
      'Đây là một trang thương mại điện tử chuyên bán những thiết bị tổng hợp dành cho các bạn chơi xe',
    images: [
      {
        url: 'https://raw.githubusercontent.com/NguyenTienHao97/HealthApp/main/dogs.png',
      },
    ],
  },
};

export default async function Home() {
  const popularProducts = await getProductPopulars();
  const popularCategories = await getPopularCategories();

  return (
    <MainLayout>
      {/* @ts-ignore */}
      <HomeClient
        articles={articles}
        popularCategories={popularCategories}
        popularProducts={popularProducts}
      />
    </MainLayout>
  );
}
