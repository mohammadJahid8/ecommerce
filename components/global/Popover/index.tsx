'use client';
import React, { useCallback, useState, useMemo, memo } from 'react';

export interface IOption {
  id: string;
  name: string;
  isChoose: boolean;
}

interface IProps {
  options: IOption[];
  onChooseItem: (options: IOption) => void;
}

const Popover = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const nameChoose = useMemo(() => {
    if (props.options.length > 0) {
      return props.options.filter((option) => option.isChoose === true)[0]
        ?.name;
    }

    return '';
  }, [isOpen, props]);

  const onChooseItem = useCallback(
    (option: IOption) => {
      props.onChooseItem(option);
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  const renderOptionItem = (option: IOption) => {
    return (
      <li onClick={() => onChooseItem(option)}>
        <a
          href='#'
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          onClick={closeDropdown}
        >
          {option.name}
        </a>
      </li>
    );
  };

  return (
    <div>
      <div className='relative inline-block'>
        <button className='flex flex-row items-center' onClick={toggleDropdown}>
          <p className='mr-2 font-roboto'>{nameChoose}</p>
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className='origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <ul
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {props.options.map((option: IOption, index) => {
                return (
                  <React.Fragment key={option?.id + index.toString()}>
                    {renderOptionItem(option)}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Popover);
