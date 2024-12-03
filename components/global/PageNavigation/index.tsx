import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface PageNavigationProps {
  currentPage: number;
  totalPage: number;
  navigateToPage: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPage,
  navigateToPage,
}) => {
  const pageNumber = [];
  let startPage = currentPage - 2;
  if (startPage <= 0) {
    startPage = 1;
  }

  for (let i = startPage; i < startPage + 5 && i <= totalPage; i++) {
    pageNumber.push(i);
  }

  return (
    <div className='flex items-center justify-between'>
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        className={`pr-5 py- text-sm rounded ${
          currentPage === 1 ? 'cursor-not-allowed' : ' text-white'
        }`}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          color={`${currentPage === 1 ? '#e8e8e9' : '#050505'}`}
        />{' '}
        {/* left arrow icon */}
      </button>
      {pageNumber.map((num) => (
        <button
          key={num}
          onClick={() => navigateToPage(num)}
          className={`px-4 text-sm py-2  rounded-full ${
            currentPage === num ? ' bg-slate-100 rounded-full' : 'bg-white'
          }`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => navigateToPage(currentPage + 1)}
        className={`pl-5 py-2 text-sm rounded ${
          currentPage === totalPage ? 'cursor-not-allowed' : ' text-white'
        }`}
        disabled={currentPage === totalPage}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          color={`${currentPage === totalPage ? '#e8e8e9' : '#050505'}`}
        />{' '}
        {/* right arrow icon */}
      </button>
    </div>
  );
};
export default memo(PageNavigation);
