import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

export default ArticlesSection;
