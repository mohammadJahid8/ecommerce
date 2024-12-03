"use client"
import { memo } from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}


const IconHome = (props: IProps) => {
    return (
        <svg style={{...props}} viewBox="0 0 24 24" className=""><g className=""><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M18.203 5.71v2.746L21.5 11.09l-1.595 1.853-1.713-1.37V20.5h-2.364v-5.181a3.62 3.62 0 00-1.184-2.474 3.894 3.894 0 00-2.626-1.01c-.977 0-1.917.362-2.625 1.01a3.62 3.62 0 00-1.184 2.473V20.5H5.81v-8.923l-1.715 1.37L2.5 11.094 12.005 3.5l4.23 3.377V5.71h1.968zm-4.466 8.34c.466.354.74.835.763 1.343V20.5h-5v-5.107c.023-.508.297-.99.763-1.343s1.089-.55 1.737-.55c.648 0 1.27.197 1.737.55z" fill="#5F6368"></path></g></svg>
    )
}

export default memo(IconHome);