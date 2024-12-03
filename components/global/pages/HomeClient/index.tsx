'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from '../../MainLayout';
import MutipleSliderProducts from '../../containers/MutipleSliderProducts';
import { IPopularProduct } from '@/models/popularProduct.model';
import AutoPlay from 'embla-carousel-autoplay';
import tab from '@/assets/images/tab.png';
import tab1 from '@/assets/images/tab1.png';
import tab2 from '@/assets/images/tab2.png';
import tabback from '@/assets/images/tab-back.png';
import pixelWatch2 from '@/assets/images/pixel-watch-2.png';
import pixelPof from '@/assets/images/pixel-portfolio.png';

import { IPopularCategory } from '@/models/popular.category.model';
import CategoryItem from '@/components/global/CategoryItem';
import IconTag from '@/assets/icons/IconTag';
import IconShipping from '@/assets/icons/IconShipping';
import css from './index.module.css';
import { IArticle } from '@/models/artile.model';
import SliderArticles from '@/components/global/containers/SliderArticles';
import pixelFold from '@/assets/images/pixel-fold.png';
import pixelTablet from '@/assets/images/pixel-tablet.png';
import pixel7A from '@/assets/images/pixel-7a.png';
import IconGoogleWireless from '@/assets/icons/IconGoogleWireless';
import IconPriceMatch from '@/assets/icons/IconPriceMatch';
import IconFreeAndReturn from '@/assets/icons/IconFreeAndReturn';
import MutiSlider from '@/components/global/MutiSlider';
import Map from '@/components/global/Map/Map';
import Faq from '@/components/global/Faq/Faq';
import { useTranslation } from 'react-i18next';
import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import DisCorverWorldPixelItem from '../../DisCorverWorldPixelItem';

const vrPromotions = [
  {
    id: '222223333444',
    name: 'Free shipping.†',
    icon: <IconShipping />,
  },
  {
    id: '2222233334ffff333344',
    name: 'Get our price match promise.',
    icon: <IconPriceMatch />,
  },
  {
    id: '2222233334ffffffff44',
    name: 'Free and easy returns.',
    icon: <IconFreeAndReturn />,
  },
];

const vrBreakPoints = [
  { width: 400, itemsToScroll: 1, itemsToShow: 1 },
  { width: 450, itemsToScroll: 1, itemsToShow: 2 },
  { width: 600, itemsToScroll: 1, itemsToShow: 2 },
  { width: 888, itemsToShow: 2, itemsToScroll: 0 },
  { width: 900, itemsToShow: 3, itemsToScroll: 0 },
];

interface IProps {
  popularProducts: IPopularProduct[];
  popularCategories: IPopularCategory[];
  articles: IArticle[];
}

const vrImages = [tab2, tabback, tab, tab1];

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  return (
    <div className='flex flex-col gap-1 mt-4 md:mt-10'>
      <div className='bg-[#202124] dark:bg-[#373a3e] text-white rounded-t-2xl md:rounded-t-3xl px-4 py-2.5 md:text-center text-left text-xs md:text-sm'>
        <p>Too good to pass up: save $120 on the Pixel Tablet. Ends 12/4.</p>
      </div>
      <div className='grid lg:grid-cols-2 sm:grid-cols-1 bg-[#efeae6] dark:bg-[#202124] rounded-b-2xl md:rounded-b-3xl relative'>
        <div className='flex flex-1 justify-center items-center flex-col relative'>
          <div className='mt-5 md:mt-0 w-3/4 mx-auto'>
            <div>
              <p className='text-3xl md:text-6xl text-center md:text-start font-bold text-[#3C4043] dark:text-white'>
                {t('hero_title')}
              </p>
              <p className='my-4 text-center md:text-start'>
                {t('hero_description')}
              </p>
              <div className='flex justify-center items-center md:justify-start md:items-start'>
                <Button className='bg-[#1967D2] text-white px-3 py-2 font-medium rounded-md mt-4 sm:px-5 sm:py-2.5 text-xs md:text-sm'>
                  {t('signup')}
                </Button>
              </div>
            </div>
            <div className='lg:absolute bottom-6 flex lg:flex-row flex-col items-center lg:space-x-2 w-full max-w-[400px] mx-auto mt-5 gap-2'>
              <input
                type='text'
                placeholder={t('hero_input_placeholder')}
                className='rounded-md px-4 py-2 w-full h-10 dark:bg-[#373a3e] dark:text-white'
              />
              <button className='px-3 bg-[#1967D2] text-white rounded-md w-full lg:w-auto h-10 whitespace-nowrap font-medium text-xs md:text-sm'>
                {t('check_balance')}
              </button>
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[AutoPlay({ delay: 2000 })]}
        >
          <CarouselContent>
            {vrImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  unoptimized
                  className='w-full h-auto'
                  height={400}
                  src={image}
                  alt='image banners'
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselButton />
        </Carousel>
      </div>
    </div>
  );
};

interface ProductSectionProps {
  t: (key: string) => string;
  popularProducts: IPopularProduct[];
}

const ProductSection: React.FC<ProductSectionProps> = ({
  t,
  popularProducts,
}) => {
  return (
    <>
      <div className='flex justify-center font-bold mt-28 mb-10'>
        <p className='text-center md:text-4xl text-2xl text-[#3C4043] dark:text-white'>
          {t('product_title')}
        </p>
      </div>
      {popularProducts?.length > 0 && (
        <div className='md:mx-24 sm:mx-0'>
          <MutipleSliderProducts popularProducts={popularProducts} />
        </div>
      )}
    </>
  );
};

interface PixelWatchSectionProps {
  t: (key: string) => string;
}

const PixelWatchSection: React.FC<PixelWatchSectionProps> = ({ t }) => {
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 mt-20 bg-[#efeae6] dark:bg-[#202124] rounded-2xl md:rounded-3xl'>
      <div className='flex flex-1 justify-center items-center flex-col rounded-2xl order-last lg:order-first'>
        <div className='flex justify-center items-center w-full lg:w-auto'>
          <Image
            className='w-full lg:w-full object-contain'
            src={pixelWatch2}
            alt='image banners pixelwatch2'
          />
        </div>
      </div>
      <div className='flex flex-1 justify-center items-center flex-col rounded-2xl'>
        <div className='w-3/4 mt-10 lg:mt-0 text-center lg:text-left'>
          <p className='font-medium text-[#3C4043] dark:text-white'>
            {t('experience')}
          </p>
          <p className='mt-2 mb-2 text-3xl lg:text-5xl font-bold text-[#3C4043] dark:text-white'>
            {t('take_control')}
          </p>
          <p className='text-[#3C4043] dark:text-white'>{t('enjoy')}</p>
          <div className='flex justify-center lg:justify-start'>
            <Button
              variant='outline'
              className='rounded-md mt-4 bg-transparent border-gray-500 hover:bg-gray-500 hover:text-white'
            >
              {t('read_more')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PixelPortfolioSectionProps {
  t: (key: string) => string;
  activeStep: number;
  setActiveStep: (index: number) => void;
}

const PixelPortfolioSection: React.FC<PixelPortfolioSectionProps> = ({
  t,
  activeStep,
  setActiveStep,
}) => {
  const vrStepsImages = [pixelPof, pixelFold, pixelTablet, pixel7A];
  const vrSteps = [t('step_1'), t('step_2'), t('step_3'), t('step_4')];
  const stepDuration = 3000; // 3 seconds

  const [isPaused, setIsPaused] = useState(false); // Controls whether animation is paused

  useEffect(() => {
    if (isPaused) return; // Skip interval setup when paused

    const interval = setInterval(() => {
      // @ts-ignore
      setActiveStep((prevStep: number) => (prevStep + 1) % vrSteps.length);
    }, stepDuration);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [setActiveStep, vrSteps.length, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true); // Pause the automatic timer
    setActiveStep(index); // Set the clicked step as active
  };

  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8'>
      <div className='flex flex-col justify-center items-center rounded-2xl md:rounded-3xl bg-[#efeae6] p-6 dark:bg-[#202124]'>
        <div className='flex flex-col justify-center items-center w-full max-w-md'>
          <p className='text-base font-medium text-[#3C4043] dark:text-white'>
            {t('avoid_lines')}
          </p>
          <p className='text-3xl md:text-4xl text-center font-bold text-[#3C4043] dark:text-white'>
            {t('never_been_easier')}
          </p>
          <div className='flex justify-center items-center mt-4'>
            <button className='px-4 py-2 font-bold border border-gray-500 rounded hover:bg-gray-500 hover:text-white dark:border-white dark:text-white'>
              {t('browse_the_pixel_portfolio')}
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center mt-6'>
          <Image
            className='w-full h-[20rem] object-cover'
            src={vrStepsImages[activeStep]}
            alt='image banners pixelwatch2'
          />
        </div>
      </div>
      <div className='flex flex-col justify-start items-center rounded-2xl md:rounded-3xl bg-[#efeae6] p-6 dark:bg-[#202124]'>
        <div className='w-full max-w-md'>
          <p className='text-center text-base font-medium text-[#3C4043] dark:text-white  '>
            {t('join_now')}
          </p>
          <p className='text-3xl md:text-4xl font-bold text-[#3C4043] text-center mb-10 dark:text-white '>
            {t('recharge_in_few_steps')}
          </p>
          <div className='space-y-6 mt-4'>
            {vrSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`flex items-start cursor-pointer ${
                  index === activeStep
                    ? 'text-[#3C4043] dark:text-white'
                    : 'text-[#3C4043] dark:text-white'
                }`}
              >
                <div
                  className={`relative mr-5 self-stretch p-[1.3px] overflow-hidden rounded ${
                    index === activeStep
                      ? 'bg-white'
                      : 'bg-[#3C4043] dark:bg-white'
                  }`}
                >
                  {index === activeStep && (
                    <div
                      className='absolute inset-0 bg-[#3C4043] transition-all duration-[3000ms] animate-progress'
                      style={{ animationDuration: `${stepDuration}ms` }}
                    ></div>
                  )}
                </div>
                <p
                  className={`text-lg md:text-[22px] leading-normal transition-colors duration-200 text-[#3C4043] dark:text-white ${
                    index === activeStep
                      ? 'font-semibold'
                      : 'font-medium opacity-50'
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductSectionsProps {
  t: (key: string) => string;
}

const ProductSections: React.FC<ProductSectionsProps> = ({ t }) => {
  const vrProductSections = [
    {
      title: 'Pixel Fold',
      description: 'Power and innovation. Folded into one.',
      image: pixelFold,
    },
    {
      title: 'Pixel Tablet',
      description: 'Help in your hand. And at home.',
      image: pixelTablet,
    },
    {
      title: 'Pixel 7a',
      description: 'Build to perform. Priced just right.',
      image: pixel7A,
    },
  ];

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-1 mt-20 gap-5'>
      {vrProductSections.map((section, index) => (
        <div
          key={index}
          className='flex flex-1 flex-col justify-center items-center rounded-2xl md:rounded-3xl bg-[#efeae6] dark:bg-[#202124]'
        >
          <div className='my-10 pl-6 pr-6 flex flex-1 justify-center items-center flex-col w-3/4'>
            <p className='font-medium text-[#3C4043] dark:text-white'>
              {section.title}
            </p>
            <p className='text-2xl md:text-4xl text-center font-bold text-[#3C4043] dark:text-white'>
              {section.description}
            </p>
            <div className='flex justify-center items-center md:justify-start md:items-start'>
              <Button
                variant='outline'
                className='bg-transparent font-bold border-2 border-gray-500 rounded-md mt-4 hover:bg-gray-500 hover:text-white'
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <Image
              unoptimized
              className='md:w-full h-auto object-contain'
              src={section.image}
              alt={`image banners ${section.title.toLowerCase()}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

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

interface ArticlesSectionProps {
  t: (key: string) => string;
  articles: IArticle[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ t, articles }) => {
  return (
    <div className='md:my-40 my-20'>
      {articles?.length > 0 && (
        <>
          <p className='text-center md:text-4xl text-2xl text-[#3C4043] font-bold mb-10 dark:text-white'>
            {t('inspire_with_the_most_popular_routes')}
          </p>

          <div className='md:mx-20 sm:mx-0 hidden md:block'>
            <Carousel
              opts={{
                align: 'start',
              }}
              className='w-full'
            >
              <CarouselContent>
                {articles.map((article, index) => (
                  <CarouselItem
                    key={index}
                    className='md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='p-1'>
                      <DisCorverWorldPixelItem article={article} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='h-[60px] w-[60px] shadow-md top-[40%] -left-12' />
              <CarouselNext className='h-[60px] w-[60px] shadow-md top-[40%] -right-16' />
            </Carousel>
          </div>

          <div className='md:hidden flex flex-col gap-10'>
            {articles.map((article, index) => (
              <DisCorverWorldPixelItem key={index} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface MapSectionProps {
  t: (key: string) => string;
}

const MapSection: React.FC<MapSectionProps> = ({ t }) => {
  return (
    <div className='grid md:grid-cols-2 sm:flex-col-reverse mt-10 mb-10'>
      <Map />

      <div className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col rounded-2xl'>
        <div className='mt-5 md:mt-0 w-4/5'>
          <div className='mt-2 mb-2 flex justify-center items-center'>
            <IconGoogleWireless />
          </div>
          <p className='text-2xl md:text-4xl text-center text-[#3C4043] font-bold dark:text-white'>
            {t('interactive_your_travel_map')}
          </p>
          <p className='mt-2 text-center text-[#3C4043] dark:text-white'>
            {t('download_map_description')}
          </p>
          <div className='flex justify-center items-center'>
            <button className='px-5 py-2.5 font-bold border-2 border-gray-500 rounded-md mt-4 hover:bg-gray-500 hover:text-white'>
              {t('download_map')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PromotionsSectionProps {
  t: (key: string) => string;
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ t }) => {
  return (
    <div className='my-20 flex flex-col items-center '>
      <h1 className='text-center text-[#3C4043] text-2xl md:text-4xl font-bold mb-10 dark:text-white'>
        {t('why_buy_on_the_google_store')}
      </h1>
      <div className='flex flex-col md:flex-row justify-center gap-4  max-w-6xl w-full'>
        {vrPromotions.map((promo) => (
          <div
            key={promo.id}
            className='flex flex-col items-center w-full bg-[#f8f9fb] rounded-2xl px-10 py-14 dark:bg-[#202124]'
          >
            <div className='mb-4'>{promo.icon}</div>
            <p className='text-center text-xl text-[#3C4043] font-bold mb-4 dark:text-white'>
              {promo.name}
            </p>
            <Button
              variant='outline'
              className='bg-transparent px-4 py-2 font-bold border border-gray-400 rounded-md hover:bg-[#f8f9fb]'
            >
              Learn more
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FooterSectionProps {
  t: (key: string) => string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ t }) => {
  return (
    <div className='mt-5 p-10 flex flex-col items-center bg-[#f8f9fb] rounded-2xl md:rounded-3xl dark:bg-[#202124]'>
      <IconTag width={42} height={42} color='#1967D2' />
      <p className='text-2xl md:text-4xl text-[#3C4043] font-bold text-center md:w-1/2 my-8 dark:text-white'>
        {t('your_integral_solution_for_recharges')}
      </p>
      <Button
        variant='outline'
        className='bg-transparent font-bold border-2 border-gray-500 rounded-md hover:bg-gray-500 hover:text-white'
      >
        {t('register')}
      </Button>
    </div>
  );
};

interface FaqSectionProps {
  t: (key: string) => string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ t }) => {
  return (
    <div className='mt-5 mb-20 md:p-10 p-6 flex flex-col justify-center items-center bg-[#F8F9FA] rounded-2xl dark:bg-[#202124]'>
      <h1 className='text-center text-[#3C4043] md:text-4xl text-2xl font-bold mb-10 dark:text-white'>
        Preguntas frecuentes
      </h1>
      <Faq />
    </div>
  );
};

const HomeClient: React.FC<IProps> = (
  props: IProps = { popularProducts: [], popularCategories: [], articles: [] }
) => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className='flex flex-col flex-1 max-w-[1392px] mx-auto px-4 sm:px-6 2xl:px-0'>
        <HeroSection
          t={t}
          // currentImageIndex={currentImageIndex}
          // fnHandlePrevClick={fnHandlePrevClick}
          // fnHandleNextClick={fnHandleNextClick}
        />
        <ProductSection t={t} popularProducts={props.popularProducts} />
        <PixelWatchSection t={t} />
        <PixelPortfolioSection
          t={t}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <ProductSections t={t} />
        <PopularCategoriesSection
          t={t}
          popularCategories={props.popularProducts}
        />
        <ArticlesSection t={t} articles={props.articles} />
        <MapSection t={t} />
        <PromotionsSection t={t} />
        <FooterSection t={t} />
        <FaqSection t={t} />
      </div>
    </MainLayout>
  );
};

export default React.memo(HomeClient);
