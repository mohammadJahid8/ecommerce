'use client';
import React, { useState, useMemo } from 'react';
import MainLayout from '../../MainLayout';
import SmartHomeItem from './components/SmartHomeItem';
import { ISmartHome } from '@/models/smart-home.model';

import Image from 'next/image';
import IconTotalControl from '@/assets/icons/IconTotalControl';
import IconChevronRight from '@/assets/icons/IconChevronRight';
import css from './index.module.css';
import SliderSmartHomeCategory from './containers/SliderSmartHomeCategory';
import IconNestAware from '@/assets/icons/IconNestAware';
import SliderSmartHomeProduct from './containers/SliderSmartHomeProduct';
import SliderArticles from '@/components/global/containers/SliderArticles';
import { IArticle } from '@/models/artile.model';

// static images
import imagePhone from '@/assets/images/phone.png';
import imgInstruction02 from '@/assets/images/imgInstruction02.png';
import imgInstruction03 from '@/assets/images/imgInstruction03.png';
import peaceofmind from '@/assets/images/peaceofmind.png';
import imgTab02 from '@/assets/images/imgTab02.png';
import imgTab03 from '@/assets/images/imgTab03.png';
import smartHomePerson from '@/assets/images/smart-home-person.png';
import imgInstruction04 from '@/assets/images/instruction04.png';
import imgInstruction05 from '@/assets/images/instruction05.png';
import imgInstruction06 from '@/assets/images/instruction06.png';
import imgInstruction07 from '@/assets/images/instructions07.png';
import imgInstruction08 from '@/assets/images/instructions08.png';
import imgInstruction09 from '@/assets/images/instructions09.png';
import SliderAccessoriesWall from './containers/SliderAccessoriesWall';
import IconNestRenew from '@/assets/icons/IconNestRenew';
import imgPixelPorfolio from '@/assets/images/smart-home-pixel-portfolio.png';
import imgRepairCamera from '@/assets/images/repair-camera.png';
import imgGird01 from '@/assets/images/grid01.png';
import imgGirdReponsive from '@/assets/images/image-grid-responsive.png';
import IconGoogle from '@/assets/icons/IconGoogle';

const articles: IArticle[] = [
  {
    id: 'xxxx222ff44444rrrrfff',
    label: 'Your home is getting more helpful with Matter and Thread.',
    imageUrl: '/images/cameraafraid.png',
    imageAlt: 'Alt This camera is not afraid of the dark.',
    url: '',
  },
  {
    id: 'xxxx224444444444555455552fffff',
    label: '4 ways to keep your home running smoothly.',
    imageUrl: '/images/home/pixel-8-pro-articles.png',
    imageAlt:
      'Alt Pixel 8 and Pixel 8 Pro have arrived. And they brought deals.',
    url: '',
  },
  {
    id: 'xxxx224455555666666ffff667774444455552fffff',
    label: 'Keep your home running smoothly even when you’re away.',
    imageUrl: '/images/home/fitness-go.png',
    imageAlt: 'alt Fitness goals smoothly even when you’re away.',
    url: '',
  },
  {
    id: 'xxxx224455555634344444444444667774444455552fffff',
    label: 'Curious about smart home devices? Start here.',
    imageUrl: '/images/home/run.png',
    imageAlt: 'alt A new trainerCurious about smart home devices? Start here.',
    url: '',
  },
  {
    id: 'xxxx2244533333555563434444667774444455552fffff',
    label: 'Your Matter-compatible smart home devices can truly work together.',
    imageUrl: '/images/home/dogs.png',
    imageAlt:
      'alt A new trainer for your Your Matter-compatible smart home devices can truly work together.',
    url: '',
  },
];

interface IProps {
  smartHomes: ISmartHome[];
}

const SmartHomeClient = (props: IProps = { smartHomes: [] }) => {
  const { smartHomes } = props;
  const [image, setImage] = useState(imagePhone);
  const [tabs, setTabs] = useState([
    {
      id: 12344444,
      name: 'Know what’s happening, around the clock.',
      isActive: true,
      image: peaceofmind,
      content:
        'Nest doorbells and cameras can detect the difference between a person, animal, and vehicle. You’ll be the first to know, with notifications for important activity.',
    },
    {
      id: 555595995954444,
      name: 'Check in on your home, even when you’re far away.',
      isActive: false,
      image: imgTab02,
      content:
        'Check in on your Nest cameras and Nest doorbell with the Google Home app. Now you can be anywhere, and still stay in the know.3',
    },
    {
      id: 555595995954444555555,
      name: 'Go back in time with video history.',
      isActive: false,
      image: imgTab03,
      content:
        'With three hours of event video history included, you can catch moments you miss. Subscribe to Nest Aware and get 30 days of event video history and other advanced alerts.',
    },
  ]);

  const [tabs01, setTabs01] = useState([
    {
      id: 12344444,
      name: 'Everything you need to stay entertained.',
      isActive: true,
      image: imgInstruction04,
      content:
        'Catch up on your favorite TV shows, watch YouTube videos, and enjoy music and podcasts from your preferred services.4',
    },
    {
      id: 555595995954444,
      name: 'Instantly stream favorites – effortlessly.',
      isActive: false,
      image: imgInstruction05,
      content:
        'Keep up with all your entertainment, from wherever you are. Stream media on your Nest Hub, Nest Speakers, Pixel Phone, Pixel Tablet, or Chromecast with Google TV.11',
    },
    {
      id: 555595995954444555555,
      name: 'Get hands-free help with Google Assistant.',
      isActive: false,
      image: imgInstruction06,
      content:
        'Play your favorite music, podcasts, and more, using just your voice.4 You can also get answers to just about anything, hands-free.13',
    },
  ]);

  const [tabs02, setTabs02] = useState([
    {
      id: 1234443333344,
      name: 'Eco-conscious comfort.',
      isActive: true,
      image: imgInstruction07,
      content:
        'Get the most out of your home’s energy while spending less with Nest Thermostats and other helpful features.15 Easily adjust the temperature of your home or customize your home’s lighting right from the Google Home app.16',
    },
    {
      id: 33333444455555,
      name: 'Take advantage of cleaner or less expensive energy.',
      isActive: false,
      image: imgInstruction08,
      content:
        'Nest Renew is a service for your compatible Nest thermostat that makes it easy to support a clean energy future, right from home.',
    },
    {
      id: 5555955555555555555995954444555555,
      name: 'Catch many HVAC system issues early.',
      isActive: false,
      image: imgInstruction09,
      content:
        "Receive alerts if something doesn't seem right with your heating or cooling, plus reminders when it’s time to replace your air filter.",
    },
  ]);

  const tabContent = useMemo(() => {
    return tabs.filter((tab) => tab.isActive === true)[0];
  }, [tabs]);

  const tabContent01 = useMemo(() => {
    return tabs01.filter((tab) => tab.isActive === true)[0];
  }, [tabs01]);

  const tabContent02 = useMemo(() => {
    return tabs02.filter((tab) => tab.isActive === true)[0];
  }, [tabs02]);

  return (
    <MainLayout>
      <div
        className={
          'max-w-screen-xl xl:mx-auto md:mx-[7rem] mx-5 flex flex-col flex-1'
        }
      >
        <div className='flex items-center  justify-center font-bold mt-20 mb-20'>
          <div className='w-3/4'>
            <p className='md:text-2xl text-xl text-center'>
              {' '}
              Your helpful home starts here.
            </p>
          </div>
        </div>
        {smartHomes?.length > 0 ? (
          <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3'>
            {smartHomes.map((smartHome, index) => {
              return (
                <React.Fragment key={smartHome.id + index.toString()}>
                  <SmartHomeItem smartHome={smartHome} />
                </React.Fragment>
              );
            })}
          </div>
        ) : null}
        <div className='mt-20 mb-20 flex flex-1 lg:flex-row flex-col'>
          <div
            className='mb-5 md:mb-0 flex justify-center items-center flex-col'
            style={{ borderRadius: 40, flex: 4, backgroundColor: '#F6F4F0' }}
          >
            <div
              className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col'
              style={{ borderRadius: 40, backgroundColor: '#F6F4F0' }}
            >
              <div
                style={{ width: '70%' }}
                className='mb-5 mt-5 flex flex-1 justify-center items-center flex-col'
              >
                <p
                  className='sm:text-xl md:text-2xl'
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#3C4043',
                  }}
                >
                  Build a smarter home, one device at a time.
                </p>
                <p>
                  Bring your devices together for more personalized help around
                  the home.1 And create automations tailored to your needs to
                  simplify everyday tasks.2
                </p>
              </div>
            </div>
          </div>
          <div
            style={{ flex: 6, width: '100%' }}
            className=' ml-0 lg:ml-5 mt-5 lg:mt-0'
          >
            <Image
              className='md:w-full h-full'
              style={{
                borderRadius: 40,
              }}
              src={smartHomePerson}
              alt={'image banners pixelwatch2'}
            />
          </div>
        </div>
        <div className='flex flex-1 flex-col justify-center items-center'>
          <div className='flex flex-1 flex-col justify-center items-center py-10'>
            <IconTotalControl />
            <p className='font-bold md:text-2xl text-xl text-center'>
              Total control with the rebuilt Google Home app.
            </p>
            <p className='text-center mt-5 mb-5'>
              The totally redesigned app has a new five-tab layout that’s more
              personalized, better organized, and easier to use.
            </p>
            <div className='flex flex-row justify-center items-center'>
              <p className={css.styleTextReadArticle}>{'Read the article'}</p>
              <IconChevronRight width={20} height={20} color='#2771D5' />
            </div>
          </div>
        </div>
        <div className='mt-20 mb-20 flex flex-1 lg:flex-row flex-col'>
          <div
            className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col'
            style={{ borderRadius: 40, backgroundColor: '#F6F4F0' }}
          >
            <Image
              className='md:w-full h-full'
              style={{
                borderRadius: 40,
              }}
              src={image}
              alt={'image instructions'}
            />
          </div>
          <div className='flex flex-1 flex-col justify-center items-center ml-0 lg:ml-5 mt-5 lg:mt-0'>
            <div
              onClick={() => setImage(imagePhone)}
              style={{ width: '70%' }}
              className='py-5'
            >
              <details className='group'>
                <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
                  <span className='text-lg'>
                    {' '}
                    Organize your favorites in a single tab.
                  </span>
                  <span className='transition group-open:rotate-180'>
                    <svg
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </summary>
                <p className='text-neutral-600 mt-3 group-open:animate-fadeIn'>
                  See your favorite devices, automations, and actions all in one
                  place. The Favorites tab makes it easier to access the things
                  you care about most.
                </p>
              </details>
            </div>
            <div
              onClick={() => setImage(imgInstruction02)}
              style={{ width: '70%' }}
              className='py-5'
            >
              <details className='group'>
                <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
                  <span className='text-lg'>
                    {' '}
                    Seamless automations are a tap away.
                  </span>
                  <span className='transition group-open:rotate-180'>
                    <svg
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </summary>
                <p className='text-neutral-600 mt-3 group-open:animate-fadeIn'>
                  Create helpful home automations with your devices. Schedule
                  your cameras to turn on and your doors to lock automatically
                  at sunset. Have your TV turn off when you turn off the lights.
                  And that’s just the beginning.1
                </p>
              </details>
            </div>
            <div
              onClick={() => setImage(imgInstruction03)}
              style={{ width: '70%' }}
              className='py-5'
            >
              <details className='group'>
                <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
                  <span className='text-lg'>
                    {' '}
                    Check in on your home with just a tap.
                  </span>
                  <span className='transition group-open:rotate-180'>
                    <svg
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </summary>
                <p className='text-neutral-600 mt-3 group-open:animate-fadeIn'>
                  Now you can easily check your live camera streams or scan your
                  video history directly in the app for peace of mind while
                  you’re away.3
                </p>
              </details>
            </div>
          </div>
        </div>
        <div className='mb-4 flex flex-center flex-col justify-center items-center py-10'>
          <div className='w-3/4'>
            <p className='text-base text-center font-roboto font-light'>
              Security and safety
            </p>
          </div>
          <div className='w-3/4'>
            <p className='mt-4 md:text-2xl text-xl font-bold text-center'>
              Peace of mind, inside and out.
            </p>
          </div>
        </div>
        <div>
          <Image
            className='w-full'
            style={{
              borderRadius: 40,
            }}
            src={tabContent.image}
            alt={'image banners pixelwatch2'}
          />
        </div>
        <div className='flex flex-col mt-6 md:mt-0 py-20'>
          <div className='flex flex-col gap-4'>
            <div className='tabs flex flex-col w-full justify-center items-center'>
              <div className='flex flex-row items-center'>
                {tabs.map((tab, index) => {
                  return (
                    <button
                      onClick={() => {
                        const newTab = tabs.map((_tab) =>
                          _tab.id === tab.id
                            ? { ..._tab, isActive: true }
                            : { ..._tab, isActive: false }
                        );

                        setTabs(newTab);
                      }}
                      key={tab.id + index.toString()}
                      style={
                        tab.isActive
                          ? { borderBottom: '2px solid black' }
                          : { borderBottom: '2px solid #dbdce0' }
                      }
                      className='active flex-1 h-16 px-4 flex flex-col justify-end items-center gap-1 relative py-2 hover:bg-surface-100 dark:hover:bg-surfacedark-100'
                    >
                      <span className='text-md font-semibold md:text-lg'>
                        {tab.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <hr className='border-gray-200 dark:border-gray-700' />
              <div className=' w-1/2 flex flex-col justify-center items-center'>
                <div className='py-4 transition duration-400 ease-in-out'>
                  <p>{tabContent.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SliderSmartHomeCategory />
        <div className='flex-1 p-5 items-center mt-20 mb-20 rounded-[24px] bg-[#F8F9FA]'>
          <div className='md:flex-1 hidden items-center md:flex'>
            <IconNestAware />
            <p className='md:text-3xl text-md ml-5 font-roboto font-bold'>
              Nest Aware
            </p>

            <div
              style={{
                width: 1,
                color: 'grey',
                background: 'grey',
                height: 50,
              }}
              className='ml-5 mr-5'
            ></div>

            <p className='flex-1 font-roboto md:text-base text-sm'>
              Subscriptions start at just $8 a month. Get more video history,
              smart alerts, and other helpful features.
            </p>

            <div
              style={{ width: 120 }}
              className='hidden mb-5 mt-5 md:flex items-center justify-end cursor-pointer'
            >
              <p
                className={'hover:decoration-solid ' + css.wrapLearnMore}
                style={{ fontSize: 16, fontWeight: 'bold', color: '#1967D2' }}
              >
                {'Learn More'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>
          <details className='flex md:hidden group'>
            <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
              <IconNestAware />
              <div className='ml-5 flex-col flex items-start flex-1 justify-center'>
                <p className='md:text-3xl text-md font-roboto font-bold'>
                  Nest Aware
                </p>
                <p className='flex-1 font-roboto md:text-base text-sm'>
                  Subscriptions start at just $8 a month. Get more video
                  history, smart alerts, and other helpful features.
                </p>
              </div>
              <span className='transition group-open:rotate-180'>
                <svg
                  fill='none'
                  height='24'
                  shapeRendering='geometricPrecision'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path d='M6 9l6 6 6-6'></path>
                </svg>
              </span>
            </summary>
            <div className='group-open:animate-fadeIn'>
              <div
                style={{ width: 120 }}
                className='mb-5 mt-5 flex items-center justify-end cursor-pointer'
              >
                <p
                  className={'hover:decoration-solid ' + css.wrapLearnMore}
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#1967D2' }}
                >
                  {'Learn More'}
                </p>
                <div style={{ marginTop: 3 }}>
                  <IconChevronRight color='#1967D2' width={20} height={20} />
                </div>
              </div>
            </div>
          </details>
        </div>
        <div className='mb-4  flex flex-center flex-col justify-center items-center py-10'>
          <div className='w-3/4'>
            <p className='text-base text-center font-light font-roboto'>
              Entertainmenty
            </p>
          </div>
          <div className='w-3/4'>
            <p className='mt-4 md"text-2xl text-xl font-bold font-roboto text-center'>
              All your favorites in one place.
            </p>
          </div>
        </div>
        <div>
          <Image
            className='w-full'
            style={{
              borderRadius: 40,
            }}
            src={tabContent01.image}
            alt={'image banners pixelwatch2'}
          />
        </div>
        <div className='flex flex-col mt-10'>
          <div className='flex flex-col gap-4'>
            <div className='tabs flex flex-col w-full justify-center items-center'>
              <div className='flex flex-row items-center'>
                {tabs01.map((tab, index) => {
                  return (
                    <button
                      onClick={() => {
                        const newTab = tabs01.map((_tab) =>
                          _tab.id === tab.id
                            ? { ..._tab, isActive: true }
                            : { ..._tab, isActive: false }
                        );

                        setTabs01(newTab);
                      }}
                      key={tab.id + index.toString()}
                      style={
                        tab.isActive
                          ? { borderBottom: '2px solid black' }
                          : { borderBottom: '2px solid #dbdce0' }
                      }
                      className='active w-full md:w-full h-20 px-4 flex flex-col justify-end items-center gap-1 relative py-2 hover:bg-surface-100 dark:hover:bg-surfacedark-100'
                    >
                      <span className='text-md font-semibold md:text-lg '>
                        {tab.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <hr className='border-gray-200 dark:border-gray-700 pb-10' />
              <div className=' w-1/2 flex flex-col justify-center items-center'>
                <div className='py-4 transition duration-400 ease-in-out'>
                  <p>{tabContent01.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='py-20'>
          <SliderSmartHomeProduct />
        </div>
        <div className='mb-10 mt-20 flex flex-center flex-col justify-center items-center'>
          <div className='w-3/4'>
            <p className='text-base text-center font-light font-roboto'>
              Energy and savings
            </p>
          </div>
          <div className='w-3/4'>
            <p className='mt-4 text-2xl sm:text-xl text-center font-bold font-roboto'>
              {' '}
              Make saving energy a daily routine.
            </p>
          </div>
        </div>
        <div>
          <Image
            className='w-full'
            style={{
              borderRadius: 40,
            }}
            src={tabContent02.image}
            alt={'image banners tabContent02'}
          />
        </div>
        <div className='flex flex-col mt-10'>
          <div className='flex flex-col gap-4'>
            <div className='tabs flex flex-col w-full justify-center items-center'>
              <div className='flex flex-row items-center'>
                {tabs02.map((tab, index) => {
                  return (
                    <button
                      onClick={() => {
                        const newTab = tabs02.map((_tab) =>
                          _tab.id === tab.id
                            ? { ..._tab, isActive: true }
                            : { ..._tab, isActive: false }
                        );

                        setTabs02(newTab);
                      }}
                      key={tab.id + index.toString()}
                      style={
                        tab.isActive ? { borderBottom: '2px solid black' } : {}
                      }
                      className='active w-full md:w-full h-20 px-4 flex flex-col justify-end items-center gap-1 relative py-2 hover:bg-surface-100 dark:hover:bg-surfacedark-100'
                    >
                      <span className='text-xs md:text-lg'>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
              <hr className='border-gray-200 dark:border-gray-700' />
              <div className=' w-1/2 flex flex-col justify-center items-center'>
                <div className='py-4 transition duration-400 ease-in-out'>
                  <p>{tabContent02.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20'>
          <SliderAccessoriesWall />
        </div>
        <div className='flex-1 p-5 items-center mt-20 mb-20 rounded-[24px] bg-[#F8F9FA]'>
          <div className='md:flex-1 hidden items-center md:flex'>
            <IconNestRenew />
            <p className='md:text-3xl text-md ml-5 font-roboto font-bold'>
              Nest Renew
            </p>

            <div
              style={{
                width: 1,
                color: 'grey',
                background: 'grey',
                height: 50,
              }}
              className='ml-5 mr-5'
            ></div>

            <p className='flex-1 font-roboto md:text-base text-sm'>
              Take advantage of cleaner or less expensive energy.
            </p>

            <div
              style={{ width: 120 }}
              className='hidden mb-5 mt-5 md:flex items-center justify-end cursor-pointer'
            >
              <p
                className={'hover:decoration-solid ' + css.wrapLearnMore}
                style={{ fontSize: 16, fontWeight: 'bold', color: '#1967D2' }}
              >
                {'Learn More'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>
          <details className='flex md:hidden group'>
            <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
              <IconNestRenew />
              <div className='ml-5 flex-col flex items-start flex-1 justify-center'>
                <p className='md:text-3xl text-md font-roboto font-bold'>
                  Nest Renew
                </p>
                <p className='flex-1 font-roboto md:text-base text-sm'>
                  Take advantage of cleaner or less expensive energy.
                </p>
              </div>
              <span className='transition group-open:rotate-180'>
                <svg
                  fill='none'
                  height='24'
                  shapeRendering='geometricPrecision'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path d='M6 9l6 6 6-6'></path>
                </svg>
              </span>
            </summary>
            <div className='group-open:animate-fadeIn'>
              <div
                style={{ width: 120 }}
                className='mb-5 mt-5 flex items-center justify-end cursor-pointer'
              >
                <p
                  className={'hover:decoration-solid ' + css.wrapLearnMore}
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#1967D2' }}
                >
                  {'Learn More'}
                </p>
                <div style={{ marginTop: 3 }}>
                  <IconChevronRight color='#1967D2' width={20} height={20} />
                </div>
              </div>
            </div>
          </details>
        </div>
        <div
          style={{ backgroundColor: '#EEEAE7', borderRadius: 40 }}
          className='grid md:grid-cols-2 sm:grid-cols-1 md:h-[600px]'
        >
          <div
            className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col'
            style={{ borderRadius: 40 }}
          >
            <Image
              style={{ borderRadius: 40 }}
              className='w-full'
              src={imgPixelPorfolio}
              alt={'image banners pixel porfolio smart home'}
            />
          </div>
          <div className='flex flex-1' style={{ borderRadius: 40 }}>
            <div
              className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col'
              style={{ borderRadius: 40 }}
            >
              <div style={{ width: '70%' }} className='mt-5 md:mt-0'>
                <p style={{ fontWeight: '500' }}>Pixel portfolio</p>
                <p
                  className='mt-2 mb-2 sm:text-xl md:text-5xl'
                  style={{ fontWeight: 'bold', color: '#3C4043' }}
                >
                  Nest devices are even better with Pixel.
                </p>
                <div className='flex flex-row mt-5'>
                  <p className={css.styleTextReadArticle}>
                    {'Browse the Pixel portfolio'}
                  </p>
                  <IconChevronRight width={20} height={20} color='#2771D5' />
                </div>
              </div>
            </div>
          </div>
        </div>
        {articles?.length > 0 ? (
          <>
            <div className='flex justify-center font-bold mt-20 mb-10'>
              <p className='text-center md:text-2xl sm:text-xl'>Ideas + Info</p>
            </div>
            <div>
              <SliderArticles articles={articles} />
            </div>
          </>
        ) : null}
        <div className='grid md:grid-cols-2 sm:grid-cols-1 mt-20'>
          <div className='flex flex-1 bg-[#EEEAE7] md:rounded-s-3xl'>
            <div className='mb-5 md:mb-0 flex flex-1 justify-center items-center flex-col'>
              <div style={{ width: '70%' }} className='mt-5 md:mt-0'>
                <p
                  className='sm:text-xl font-roboto md:text-3xl'
                  style={{ fontWeight: '500' }}
                >
                  Book a professional installation.
                </p>
                <p className='mt-2 mb-2'>
                  We partner with OnTech to offer professional device
                  installation. Easily purchase your Nest devices with
                  installation and schedule online any day of the week.
                </p>
                <div className='flex flex-row items-center mt-5'>
                  <p className={css.styleTextReadArticle}>{'Learn more'}</p>
                  <IconChevronRight width={18} height={18} color='#2771D5' />
                </div>
              </div>
            </div>
          </div>
          <div className='mb-5 md:mb-0 flex justify-center items-center flex-col'>
            <Image
              style={{
                objectFit: 'contain',
                width: '100%',
                borderRadius: 40,
              }}
              src={imgRepairCamera}
              alt={'image banners repair camera'}
            />
          </div>
        </div>
        <div className='mb-10 mt-20 flex font-bold font-roboto flex-center flex-col justify-center items-center'>
          <div>
            <p className='text-base'>Our ambition</p>
          </div>
          <div>
            <p className='mt-4 sm:text-md md:text-4xl'>
              Making sustainable and accessible products.
            </p>
          </div>
          <div className='flex justify-center items-center md:justify-start md:items-start'>
            <button
              className={
                'rounded-md mt-4 hover:bg-gray-500 hover:text-white ' +
                css.styleBtnLearnMore
              }
            >
              Learn More
            </button>
          </div>
        </div>
        <div className='hidden md:flex'>
          <Image
            className='w-full'
            src={imgGird01}
            alt='alt iamge Our ambition'
          />
        </div>
        <div className='md:hidden sm:flex'>
          <Image
            className='w-full'
            src={imgGirdReponsive}
            alt='alt iamge  Our ambition responsive'
          />
        </div>
        <div
          style={{ background: '#F8F9FA', borderRadius: 24 }}
          className='mt-5 pt-10 pb-10 flex flex-col justify-center items-center'
        >
          <div>
            <IconGoogle width={42} height={42} color='#1967D2' />
          </div>
          <div className='flex justify-center items-center'>
            <p
              className='sm:text-xl md:text-2xl'
              style={{
                fontWeight: 'bolder',
                color: '#3C4043',
                textAlign: 'center',
                width: '50%',
              }}
            >
              Get news, offers, cart reminders, personalized emails, and surveys
              from the Google Store.
            </p>
          </div>
          <div className='flex justify-center items-center md:justify-start md:items-start'>
            <button
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
                fontWeight: 'bold',
                border: '2px solid grey',
              }}
              className='rounded-md mt-4 hover:bg-gray-500 hover:text-white'
            >
              Sign up
            </button>
          </div>
        </div>
        <div className='mt-5 pt-10 pb-10 flex flex-col md:ml-20 md:mr-20 sm:ml-0 sm:mr-0'>
          <p className={css.styleText}>
            1 Works with most phones running Android 9.0 or newer and requires a
            Google Account, Google Pixel Watch app and internet access. Some
            features require a Fitbit mobile app and/or a paid subscription.
            Google apps and services are not available in all countries or
            languages. See g.co/pixelwatch/specs for technical and device
            specifications.
          </p>
          <p className={css.styleText}>
            2 5G service not available in all areas. 5G service, speed, and
            performance depend on many factors including but not limited to
            device configuration and capabilities, network traffic, location,
            signal strength and signal obstruction. Actual results may vary. For
            info on Fi speeds, see our Broadband Disclosure.
          </p>
          <p className={css.styleText}>
            3 Hotspot tethering counts towards your monthly data usage. On
            Simply Unlimited, you can use up to 5GB of hotspot tethering.
          </p>
          <p className={css.styleText}>
            4 $80/mo for 2-4 lines, plus taxes and government fees. †
          </p>

          <p className={css.styleText}>
            All orders that ship free use the lowest-cost option unless
            otherwise noted.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default React.memo(SmartHomeClient);
