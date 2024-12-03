"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconNestRenew = (props: IProps) => {
    return (
        <svg style={{ ...props }} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48 0v24c0 6.15-2.34 12.27-7.02 16.98A23.99 23.99 0 0124 48c-5.55 0-10.65-1.89-14.7-5.07L5.13 47.1a2.988 2.988 0 01-4.23 0 2.988 2.988 0 010-4.23l4.17-4.17A23.707 23.707 0 010 24C0 10.29 11.19 0 24 0h24zM18.182 38.236l1.527.41L34.93 24.68l-7.673-2.056 4.425-10.33-1.527-.41L14.87 25.872l7.696 2.042-4.383 10.322z" fill="#188038" /></svg>

    )
}

export default React.memo(IconNestRenew);
