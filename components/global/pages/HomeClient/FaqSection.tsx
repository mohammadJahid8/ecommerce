import { CommonProps } from '@/utils/interfaces';
import Faq from '../../Faq/Faq';

const FaqSection: React.FC<CommonProps> = ({ t }) => {
  return (
    <div className='mt-5 mb-20 md:p-10 p-6 flex flex-col justify-center items-center bg-[#F8F9FA] rounded-2xl dark:bg-[#202124]'>
      <h1 className='text-center text-[#3C4043] md:text-4xl text-2xl font-bold mb-10 dark:text-white'>
        Preguntas frecuentes
      </h1>
      <Faq />
    </div>
  );
};

export default FaqSection;
