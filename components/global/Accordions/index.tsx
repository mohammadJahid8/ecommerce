'use client';
import React, { useCallback, useState } from 'react';
import IconMinus from '@/assets/icons/IconMinus';
import IconPlus from '@/assets/icons/IconPlus';

interface IProps {
  name: string;
  body: JSX.Element | string;
}

const Accordions = (props: IProps) => {
  const { name } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  return (
    <div className='w-full'>
      <div
        className='flex flex-1 flex-row items-center cursor-pointer'
        onClick={toggleDropdown}
      >
        <div className='flex-1 flex w-full mr-2'>
          <p className='mr-2 font-roboto text-md text-[grey]'>{name}</p>
        </div>
        <div>
          {isOpen ? (
            <IconMinus width={22} height={22} />
          ) : (
            <IconPlus width={22} height={22} />
          )}
        </div>
      </div>
      {isOpen ? props.body : null}
    </div>
  );
};

export default React.memo(Accordions);
