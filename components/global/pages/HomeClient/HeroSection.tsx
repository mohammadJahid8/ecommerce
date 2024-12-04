import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselButton,
} from '@/components/ui/carousel';
import { CommonProps } from '@/utils/interfaces';
import AutoPlay from 'embla-carousel-autoplay';
import Image from 'next/image';
import tab from '@/assets/images/tab.png';
import tab1 from '@/assets/images/tab1.png';
import tab2 from '@/assets/images/tab2.png';
import tabback from '@/assets/images/tab-back.png';

const vrImages = [tab2, tabback, tab, tab1];
const HeroSection: React.FC<CommonProps> = ({ t }) => {
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

export default HeroSection;
