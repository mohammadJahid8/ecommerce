import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '@/components/ui/carousel';
import { ArticlesSectionProps } from '@/utils/interfaces';
import DisCorverWorldPixelItem from '@/components/global/DisCorverWorldPixelItem';

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
              <CarouselPrevious className='h-[64px] w-[64px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] top-[140px] -left-20 hover:bg-[#F8F9FA] bg-white border-[#dadce0] select-none' />
              <CarouselNext className='h-[64px] w-[64px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] top-[140px] -right-24 hover:bg-[#F8F9FA] bg-white border-[#dadce0] select-none' />
              <div className='flex justify-center mt-12'>
                <CarouselDots />
              </div>
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

export default ArticlesSection;
