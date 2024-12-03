"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconOrder = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 24 24" className=""><g className=""><path d="M10 13h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1z" fill="#5F6368"></path><path d="M20.16 1.99L17.81 7H6.19L3.84 1.99l-1.81.85L4 7.04V20h16V7.04l1.97-4.2-1.81-.85zM18 18H6V9h12v9z" fill="#5F6368"></path></g></svg>
    )
}

export default React.memo(IconOrder);