"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconPriceMatch = (props: IProps) => {
    return (
        <svg style={{ ...props }} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M36 2a2 2 0 00-2-2H21.71a3 3 0 00-2.12.877L1.412 19.03a2 2 0 00-.005 2.826L14.072 34.58a2 2 0 002.83.004L35.12 16.391a3 3 0 00.88-2.123V2z" fill="#34A853" /><path fillRule="evenodd" clipRule="evenodd" d="M29.079 9.692a2.77 2.77 0 100-5.538 2.77 2.77 0 000 5.538z" fill="#137333" /><path d="M15.428 24.686c0-5.678 4.608-10.286 10.286-10.286S36 19.008 36 24.686c0 5.677-4.608 10.285-10.286 10.285-5.677 0-10.285-4.608-10.285-10.285z" fill="#E6F4EA" /><path d="M29.307 20.872l-6.069 6.069-1.954-1.954a1.012 1.012 0 00-1.44 0 1.012 1.012 0 000 1.44l2.664 2.664c.401.4 1.049.4 1.45 0l6.789-6.779a1.012 1.012 0 000-1.44 1.012 1.012 0 00-1.44 0z" fill="#188038" /></svg>

    )
}

export default React.memo(IconPriceMatch);
