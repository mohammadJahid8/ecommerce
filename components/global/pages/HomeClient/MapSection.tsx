import { CommonProps } from '@/utils/interfaces';
import Map from '../../Map/Map';
import IconGoogleWireless from '@/assets/icons/IconGoogleWireless';

const MapSection: React.FC<CommonProps> = ({ t }) => {
  return (
    <div className='grid md:grid-cols-2 sm:flex-col-reverse mt-10 mb-10'>
      <Map />

      <div className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col rounded-2xl'>
        <div className='mt-5 md:mt-0 w-4/5'>
          <div className='mt-2 mb-2 flex justify-center items-center'>
            <IconGoogleWireless />
          </div>
          <p className='text-2xl md:text-4xl text-center text-[#3C4043] font-bold dark:text-white'>
            {t('interactive_your_travel_map')}
          </p>
          <p className='mt-2 text-center text-[#3C4043] dark:text-white'>
            {t('download_map_description')}
          </p>
          <div className='flex justify-center items-center'>
            <button className='px-5 py-2.5 font-bold border-2 border-gray-500 rounded-md mt-4 hover:bg-gray-500 hover:text-white'>
              {t('download_map')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
