import { Button } from '@/components/ui/button';
import Image from 'next/image';
import pixelFold from '@/assets/images/pixel-fold.png';
import pixelTablet from '@/assets/images/pixel-tablet.png';
import pixel7A from '@/assets/images/pixel-7a.png';
import { CommonProps } from '@/utils/interfaces';

const ProductSections: React.FC<CommonProps> = ({ t }) => {
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

export default ProductSections;
