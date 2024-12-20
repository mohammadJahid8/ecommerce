"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconNestAware = (props: IProps) => {
    return (
        <svg style={{...props}} fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><mask id="a" height="30" maskUnits="userSpaceOnUse" width="48" x="0" y="9"><path clipRule="evenodd" d="M.75 9h46.5v29.76H.75z" fill="#fff" fillRule="evenodd" /></mask><path clipRule="evenodd" d="M17.959 33.103v5.237h12.083v-5.237l-6.041-6.042z" fill="#4284f4" fillRule="evenodd" /><g mask="url(#a)"><path clipRule="evenodd" d="M38.417 20.183C36.773 13.753 30.942 9 24 9 15.782 9 9.12 15.662 9.12 23.88l.002.064a7.495 7.495 0 00-.932-.064 7.44 7.44 0 000 14.88h4.185v-7.212c.013-.31.139-.59.338-.806l10.376-10.387c.234-.232.59-.378.913-.378.323 0 .678.146.91.378L35.29 30.742c.199.216.338.496.336.806v7.212h2.325a9.3 9.3 0 009.3-9.3c0-4.979-3.915-9.032-8.833-9.277" fill="#4284f4" fillRule="evenodd" /></g></svg>

    )
}

export default React.memo(IconNestAware);
