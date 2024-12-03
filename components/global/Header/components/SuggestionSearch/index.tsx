'use client';
import { memo } from 'react';
import IconSearch from '@/assets/icons/IconSearch';
import css from '../../index.module.css';

interface IProps {
  widthSearch: number;
}

const SuggestionSearch = (props: IProps) => {
  return (
    <div
      className={css.customScrollContent + ' ' + css.containerSearch}
      style={{ width: props.widthSearch }}
    >
      <div className={css.wrapSuggestionSearch}>
        <div className='flex-1 flex items-center'>
          <IconSearch width={15} height={15} />
          <span className='ml-2'>{'Result search'}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(SuggestionSearch);
