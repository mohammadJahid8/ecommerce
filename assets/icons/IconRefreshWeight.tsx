"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconRefreshWeight = (props: IProps) => {
    return (
        <svg {...props} viewBox="0 0 24 24" className=""><g className=""><path d="M11.82 4.01c2.11-.05 4.23.72 5.84 2.33 3.12 3.13 3.12 8.19-.01 11.33l-1.41-1.41a6.011 6.011 0 000-8.49c-1.2-1.21-2.8-1.77-4.38-1.73l1.05 1.05L11.5 8.5 8 5l3.5-3.5 1.42 1.41-1.1 1.1zm-.73 12.9l1.41-1.41L16 19l-3.51 3.49-1.41-1.41 1.1-1.1c-2.11.05-4.23-.72-5.84-2.33-3.12-3.12-3.12-8.19 0-11.31l1.42 1.4a6.011 6.011 0 000 8.49c1.2 1.21 2.8 1.77 4.38 1.73l-1.05-1.05z" fill="#5F6368"></path></g></svg>
    )
}

export default React.memo(IconRefreshWeight);