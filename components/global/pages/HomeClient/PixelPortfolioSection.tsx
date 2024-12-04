import Image from 'next/image';
import { useEffect, useState } from 'react';
import pixelFold from '@/assets/images/pixel-fold.png';
import pixelTablet from '@/assets/images/pixel-tablet.png';
import pixel7A from '@/assets/images/pixel-7a.png';
import pixelPof from '@/assets/images/pixel-portfolio.png';
import { PixelPortfolioSectionProps } from '@/utils/interfaces';
const PixelPortfolioSection: React.FC<PixelPortfolioSectionProps> = ({
  t,
  activeStep,
  setActiveStep,
}) => {
  const vrStepsImages = [pixelPof, pixelFold, pixelTablet, pixel7A];
  const vrSteps = [t('step_1'), t('step_2'), t('step_3'), t('step_4')];
  const stepDuration = 3000; // 3 seconds

  const [isPaused, setIsPaused] = useState(false); // Controls whether animation is paused

  useEffect(() => {
    if (isPaused) return; // Skip interval setup when paused

    const interval = setInterval(() => {
      // @ts-ignore
      setActiveStep((prevStep: number) => (prevStep + 1) % vrSteps.length);
    }, stepDuration);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [setActiveStep, vrSteps.length, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true); // Pause the automatic timer
    setActiveStep(index); // Set the clicked step as active
  };

  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8'>
      <div className='flex flex-col justify-center items-center rounded-2xl md:rounded-3xl bg-[#efeae6] p-6 dark:bg-[#202124]'>
        <div className='flex flex-col justify-center items-center w-full max-w-md'>
          <p className='text-base font-medium text-[#3C4043] dark:text-white'>
            {t('avoid_lines')}
          </p>
          <p className='text-3xl md:text-4xl text-center font-bold text-[#3C4043] dark:text-white'>
            {t('never_been_easier')}
          </p>
          <div className='flex justify-center items-center mt-4'>
            <button className='px-4 py-2 font-bold border border-gray-500 rounded hover:bg-gray-500 hover:text-white dark:border-white dark:text-white'>
              {t('browse_the_pixel_portfolio')}
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center mt-6'>
          <Image
            className='w-full h-[20rem] object-cover'
            src={vrStepsImages[activeStep]}
            alt='image banners pixelwatch2'
          />
        </div>
      </div>
      <div className='flex flex-col justify-start items-center rounded-2xl md:rounded-3xl bg-[#efeae6] p-6 dark:bg-[#202124]'>
        <div className='w-full max-w-md'>
          <p className='text-center text-base font-medium text-[#3C4043] dark:text-white  '>
            {t('join_now')}
          </p>
          <p className='text-3xl md:text-4xl font-bold text-[#3C4043] text-center mb-10 dark:text-white '>
            {t('recharge_in_few_steps')}
          </p>
          <div className='space-y-6 mt-4'>
            {vrSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`flex items-start cursor-pointer ${
                  index === activeStep
                    ? 'text-[#3C4043] dark:text-white'
                    : 'text-[#3C4043] dark:text-white'
                }`}
              >
                <div
                  className={`relative mr-5 self-stretch p-[1.3px] overflow-hidden rounded ${
                    index === activeStep
                      ? 'bg-white'
                      : 'bg-[#3C4043] dark:bg-white'
                  }`}
                >
                  {index === activeStep && (
                    <div
                      className='absolute inset-0 bg-[#3C4043] transition-all duration-[3000ms] animate-progress'
                      style={{ animationDuration: `${stepDuration}ms` }}
                    ></div>
                  )}
                </div>
                <p
                  className={`text-lg md:text-[22px] leading-normal transition-colors duration-200 text-[#3C4043] dark:text-white ${
                    index === activeStep
                      ? 'font-semibold'
                      : 'font-medium opacity-50'
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelPortfolioSection;
