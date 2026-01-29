import { ProductSectionProps } from '@/utils/interfaces';
import MutipleSliderProducts from '../../MutipleSliderProducts';

const ProductSection: React.FC<ProductSectionProps> = ({
  t,
  popularProducts,
}) => {
  return (
    <section className='w-full py-16'>
      <div className='flex justify-center mb-14'>
        <h2 className='text-center text-[2rem] font-bold text-[#202124] dark:text-white leading-tight tracking-tight'>
          {t('product_title')}
        </h2>
      </div>
      {popularProducts?.length > 0 && (
        <div className='mx-auto max-w-[1440px] px-4 md:px-12 xl:px-24'>
          <MutipleSliderProducts popularProducts={popularProducts} />
        </div>
      )}
    </section>
  );
};

export default ProductSection;
