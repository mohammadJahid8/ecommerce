"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconPlusWeight = (props: IProps) => {
    return (
        <svg {...props} viewBox="0 0 24 24" className=""><g className=""><path d="M9.5 4a.5.5 0 00-.5.5V9H4.5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5H9v4.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V15h4.5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5H15V4.5a.5.5 0 00-.5-.5h-5z" fill="#5F6368"></path></g></svg>
    )
}

export default React.memo(IconPlusWeight);