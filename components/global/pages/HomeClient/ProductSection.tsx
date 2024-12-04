import { ProductSectionProps } from '@/utils/interfaces';
import MutipleSliderProducts from '../../MutipleSliderProducts';

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

export default ProductSection;
