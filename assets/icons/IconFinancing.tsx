"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
}

const IconFinancing = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 24 31" xmlns="http://www.w3.org/2000/svg"><title>Page 1</title><g fill="none" fillRule="evenodd"><path d="M23.675 2.161v26.111a2.001 2.001 0 0 1-2.001 2.001H2.326a2.001 2.001 0 0 1-2.001-2.001V2.161c0-1.105.896-2.001 2-2.001h19.349c1.105 0 2 .896 2 2.001" fill="#4CAF50"/><path d="M18.57 22.825a1.862 1.862 0 1 1 .001 3.724 1.862 1.862 0 0 1 0-3.724" fill="#C5E1A5"/><path d="M18.57 17.143a1.862 1.862 0 1 1 .001 3.724 1.862 1.862 0 0 1 0-3.724M18.57 11.165a1.862 1.862 0 1 1 .001 3.723 1.862 1.862 0 0 1 0-3.723" fill="#9CCC65"/><path d="M12 22.825a1.862 1.862 0 1 1 0 3.724 1.862 1.862 0 0 1 0-3.724" fill="#C5E1A5"/><path d="M12 17.143a1.862 1.862 0 1 1 0 3.724 1.862 1.862 0 0 1 0-3.724M12 11.165a1.862 1.862 0 1 1 0 3.723 1.862 1.862 0 0 1 0-3.723" fill="#9CCC65"/><path d="M5.43 22.825a1.862 1.862 0 1 1 0 3.724 1.862 1.862 0 0 1 0-3.724" fill="#C5E1A5"/><path d="M5.43 17.143a1.862 1.862 0 1 1 0 3.724 1.862 1.862 0 0 1 0-3.724M5.43 11.165a1.862 1.862 0 1 1 0 3.723 1.862 1.862 0 0 1 0-3.723M3.567 7.6h16.866V3.884H3.567z" fill="#9CCC65"/></g></svg>
        )
}

export default React.memo(IconFinancing);
