"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
}

const IconFreeship = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>Page 1</title><g fill="none" fillRule="evenodd"><path fill="#FFBC00" d="M14.995 31.955L15 16.119 29.533 8.12v15.987z"/><path fill="#FF8F00" d="M14.995 31.955V16.119L.467 8.12v15.932z"/><path fill="#FFD400" d="M.467 8.12l14.528 8 14.538-8L15.093.324z"/></g></svg>
        )
}

export default React.memo(IconFreeship);
