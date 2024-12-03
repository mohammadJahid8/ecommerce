'use client';
import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import SliderSpecialOffer from '@/components/global/containers/SliderSpecialOffer';
import MenuSlider from '@/components/global/MenuSlider';
import Popover, { IOption } from '@/components/global/Popover';
import OffersItems from '@/components/global/OffersItems';
import IconTagsRight from '@/assets/icons/IconTagsRight';
import googleGiftOffer from '@/assets/images/googleGiftOffer.png';
import Image from 'next/image';
import IconFinancing from '@/assets/icons/IconFinancing';
import IconFreeShip from '@/assets/icons/IconFreeShip';
import IconTagsChecked from '@/assets/icons/IconTagsChecked';
import IconFreeReturn from '@/assets/icons/IconFreeReturn';
import IconChevronRight from '@/assets/icons/IconChevronRight';
import css from './index.module.css';

const OfferClient = (props: any) => {
  const { specialOffers } = props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [s_options, setOptions] = useState<IOption[]>([
    {
      id: '2345678',
      name: 'Relevance',
      isChoose: false,
    },
    {
      id: '456789',
      name: 'Ending soon',
      isChoose: true,
    },
    {
      id: '1111111',
      name: 'Price (Low-High)',
      isChoose: false,
    },
    {
      id: '222222',
      name: 'Price (High-Low)',
      isChoose: false,
    },
  ]);

  const menuOffers = useMemo(() => {
    const newMenuOffers = [...props.menuOffers];
    newMenuOffers.unshift({
      id: 'All',
      name: 'All offers',
    });

    return newMenuOffers;
  }, [props.menuOffers]);

  const [offerItemChoose, setItemChoose] = useState(menuOffers[0]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onChooseItem = useCallback(
    (option: IOption) => {
      const newOptions = s_options.map((_option) => {
        if (_option.id === option.id) {
          return {
            ..._option,
            isChoose: true,
          };
        }

        return {
          ..._option,
          isChoose: false,
        };
      });
      setOptions(newOptions);
    },
    [s_options]
  );

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const onFilter = (menuOffer: any) => {
    setItemChoose(menuOffer);
  };

  const offerItems = useMemo(() => {
    if (offerItemChoose.id === 'All') {
      return props.offersItem;
    }

    return props.offersItem.filter(
      (offerItem: any) => offerItem.offer_id === offerItemChoose.id
    );
  }, [offerItemChoose, props.offersItem]);

  return (
    <div className='md:mx-[7rem] mx-5'>
      <section
        id='special-offers'
        aria-label='Special offers'
        className='py-20'
      >
        <div className='mx-auto lg:max-w-screen-xl'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-center text-lg mb-5 font-roboto tracking-tight text-gray-900'>
              Special offers
            </h2>
            <p
              style={{ width: '70%' }}
              className='text-center text-3xl lg:text-6xl font-bold font-roboto tracking-tight text-gray-900 pb-20'
            >
              Black Friday deals. Here. Now.
            </p>
          </div>
          {specialOffers?.length > 0 ? (
            <>
              <div className='py-2'></div>
              <SliderSpecialOffer specialOffers={specialOffers} />
            </>
          ) : null}
        </div>
      </section>
      <section aria-label='Offers deals'>
        {menuOffers?.length > 0 ? (
          <>
            <div
              className={`flex justify-center py-2 sticky top-[56px] ${
                isScrolled ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <div className='flex flex-row md:mx-20 sm:mx-0 no-scrollbar overflow-x-auto'>
                <MenuSlider
                  onFilter={onFilter}
                  offerItemChoose={offerItemChoose}
                  menus={menuOffers}
                />
              </div>
            </div>
          </>
        ) : null}
        <div className='flex mx-auto justify-between py-5 max-w-screen-xl'>
          <div className='flex'>
            <h5 className=' font-roboto text-slate-500 text-thin text-sm/4'>
              {offerItems?.length ?? 0} offers
            </h5>
          </div>
          <div className='flex items-center justify-center'>
            <h5 className='flex font-roboto text-slate-500 text-sm mr-3'>
              Sort by
            </h5>
            <Popover options={s_options} onChooseItem={onChooseItem} />
          </div>
        </div>
        <div className='mx-auto max-w-screen-xl'>
          {offerItems.length > 0 ? (
            <>
              <div className='px-10'></div>
              <div>
                <OffersItems offers={offerItems} />
              </div>
            </>
          ) : null}
        </div>
      </section>
      <section
        id='never-miss-a-beat'
        aria-label='Never miss a beat'
        className='my-20'
      >
        <div className=' max-w-screen-xl xl:mx-auto bg-slate-100 flex flex-col items-center justify-center rounded-3xl py-20'>
          <IconTagsRight width={50} height={50} />

          <h2 className='text-center text-md lg:text-4xl  font-semibold tracking-tight text-gray-900'>
            Never miss a beat
          </h2>
          <p className='py-5 font-roboto'>
            Get news, offers, cart reminders, personalized emails, and surveys
            from the Google Store.
          </p>
          <button className='  bg-transparent hover:bg-white  font-semibold hover:text-slate-500 py-2 px-4 border border-black hover:border-transparent rounded'>
            Sign in and sign up
          </button>
          <div
            style={{ width: 200 }}
            className='mb-5 mt-5 flex items-center justify-end cursor-pointer'
          >
            <p
              style={{ fontWeight: 'bold' }}
              className={
                'hover:decoration-solid font-roboto text-[#1967D2] text-base' +
                css.wrapLearnMore
              }
            >
              {'or enter email address'}
            </p>
            <div style={{ marginTop: 3 }}>
              <IconChevronRight color='#1967D2' width={20} height={20} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className=' max-w-screen-xl xl:mx-auto items-center justify-center rounded-3xl grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='sm:text-center md:text-left'>
            <h4 className='text-2xl font-semibold'>Give the gift of Google</h4>
            <h5 className='py-5'>
              Shop the Google gift guide and find the right kind of help for the
              one you most appreciate.
            </h5>
            <div className='flex flex-row items-center justify-center'>
              <a className='text-center mt-[-5px] text-blue-600' href=''>
                View gift guide
              </a>
            </div>
          </div>

          <div className='center'>
            <Image
              className='justify-self-center sm:max-h-[400] '
              style={{
                height: 'auto',
                objectFit: 'contain',
                width: '100%',
              }}
              height={800}
              src={googleGiftOffer}
              alt={'image banners'}
            />
          </div>
        </div>
      </section>
      <section>
        <div className=' max-w-screen-xl my-20 xl:mx-auto items-center justify-center rounded-3xl grid lg:grid-cols-4 grid-cols-2 gap-4'>
          <div className='rounded-3xl  py-10 place-items-center flex flex-col item-center justify-center bg-slate-100'>
            <div className='w-12 h-12 items-center'>
              <IconFinancing width={50} height={50} />
            </div>
            <h5 className='py-5 font-semibold  text-sm xl:text-lg'>
              Finance your device.
            </h5>
            <div
              style={{ width: 120 }}
              className='flex items-center justify-end cursor-pointer'
            >
              <p
                className={
                  'hover:decoration-solid font-roboto ' + css.wrapLearnMore
                }
                style={{ fontSize: 16, fontWeight: '700', color: '#1967D2' }}
              >
                {'Learn more'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>

          <div className='rounded-3xl py-10 place-items-center flex flex-col item-center justify-center bg-slate-100'>
            <div className='w-12 h-12'>
              <IconFreeShip width={80} height={80} />
            </div>
            <h5 className='py-5 font-semibold  text-sm xl:text-lg'>
              Free shipping.
            </h5>
            <div
              style={{ width: 120 }}
              className='flex items-center justify-end cursor-pointer'
            >
              <p
                className={
                  'hover:decoration-solid font-roboto ' + css.wrapLearnMore
                }
                style={{ fontSize: 16, fontWeight: '700', color: '#1967D2' }}
              >
                {'Learn more'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>
          <div className='rounded-3xl py-10 place-items-center flex flex-col item-center justify-center bg-slate-100'>
            <div className='w-12 h-12'>
              <IconTagsChecked width={50} height={50} />
            </div>
            <h5 className='py-5 font-semibold  text-sm xl:text-lg'>
              Get our price match promise.
            </h5>
            <div
              style={{ width: 120 }}
              className='flex items-center justify-end cursor-pointer'
            >
              <p
                className={
                  'hover:decoration-solid font-roboto ' + css.wrapLearnMore
                }
                style={{ fontSize: 16, fontWeight: '700', color: '#1967D2' }}
              >
                {'Learn more'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>
          <div className='rounded-3xl py-10 place-items-center flex flex-col item-center justify-center bg-slate-100'>
            <div className='w-12 h-12'>
              <IconFreeReturn width={50} height={50} />
            </div>
            <h5 className='py-5 font-semibold  text-sm xl:text-lg'>
              Free and easy returns.
            </h5>
            <div
              style={{ width: 120 }}
              className='flex items-center justify-end cursor-pointer'
            >
              <p
                className={
                  'hover:decoration-solid font-roboto ' + css.wrapLearnMore
                }
                style={{ fontSize: 16, fontWeight: '700', color: '#1967D2' }}
              >
                {'Learn more'}
              </p>
              <div style={{ marginTop: 3 }}>
                <IconChevronRight color='#1967D2' width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(OfferClient);
