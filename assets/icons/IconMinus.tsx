"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconMinus = (props: IProps) => {
    return (
        <svg style={{ ...props }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>

    )
}

export default React.memo(IconMinus);
