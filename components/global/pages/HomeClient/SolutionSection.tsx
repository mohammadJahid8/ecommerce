import IconTag from '@/assets/icons/IconTag';
import { Button } from '@/components/ui/button';
import { CommonProps } from '@/utils/interfaces';

const SolutionSection: React.FC<CommonProps> = ({ t }) => {
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

export default SolutionSection;
