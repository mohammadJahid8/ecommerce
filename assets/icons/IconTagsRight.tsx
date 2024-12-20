"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
}

const IconTagsRight = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1_87609)"><path fillRule="evenodd" clipRule="evenodd" d="M38 4H26.26c-1.6 0-3.12.64-4.24 1.76L5.76 22.02a6 6 0 000 8.48L17.5 42.24A5.983 5.983 0 0021.74 44c1.52 0 3.08-.58 4.24-1.76L42.24 26A6.03 6.03 0 0044 21.76V10c0-3.32-2.68-6-6-6zm-5.334 14.667a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z" fill="#1967D2"/></g><defs><clipPath id="clip0_1_87609"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
        )
}

export default React.memo(IconTagsRight);
