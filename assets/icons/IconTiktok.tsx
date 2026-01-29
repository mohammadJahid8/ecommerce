"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
}

const IconTiktok = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 24 24" className=""><g className=""><path d="M18.12 6.01a4.815 4.815 0 01-2.1-3.14c-.05-.28-.08-.57-.08-.87H12.5v13.78a2.896 2.896 0 01-2.89 2.78 2.89 2.89 0 01-2.89-2.89c0-1.59 1.3-2.89 2.89-2.89.3 0 .58.05.85.13V9.4c-.28-.04-.56-.06-.85-.06-3.49 0-6.33 2.84-6.33 6.33 0 2.14 1.07 4.04 2.7 5.18C7.01 21.57 8.26 22 9.61 22c3.49 0 6.33-2.84 6.33-6.33V8.68c1.35.97 3 1.54 4.78 1.54V6.78c-.96 0-1.85-.29-2.6-.77z"></path></g></svg>
    )
}

export default React.memo(IconTiktok);