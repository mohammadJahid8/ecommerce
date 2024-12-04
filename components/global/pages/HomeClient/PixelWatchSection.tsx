import { Button } from '@/components/ui/button';
import { CommonProps } from '@/utils/interfaces';
import Image from 'next/image';
import pixelWatch2 from '@/assets/images/pixel-watch-2.png';

const PixelWatchSection: React.FC<CommonProps> = ({ t }) => {
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

export default PixelWatchSection;
