import { CommonProps } from '@/utils/interfaces';

import IconFreeAndReturn from '@/assets/icons/IconFreeAndReturn';
import IconPriceMatch from '@/assets/icons/IconPriceMatch';
import IconShipping from '@/assets/icons/IconShipping';
import { Button } from '@/components/ui/button';

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

const PromotionsSection: React.FC<CommonProps> = ({ t }) => {
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

export default PromotionsSection;
