"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
}

const IconSearch = (props: IProps = {width: 20, height: 20}) => {
    return (
        <svg style={{width: props.width, height: props.height}} className="text-grey w-6 h-6  dark:text-white hover:text-[#1967D2] hover:fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
    )
}

export default React.memo(IconSearch);