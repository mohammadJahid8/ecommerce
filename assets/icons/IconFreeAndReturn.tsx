"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconFreeAndReturn = (props: IProps) => {
    return (
        <svg style={{ ...props }} width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.985 0v3.628h3.6V0h-3.6zm18 0v3.628h3.6V0h-3.6z" fill="#FDE293" /><path d="M28.8 3.349H3.6C1.602 3.349.018 4.98.018 6.977L0 32.372C0 34.367 1.602 36 3.6 36h25.2c1.98 0 3.6-1.633 3.6-3.628V6.977c0-1.996-1.62-3.628-3.6-3.628z" fill="#FBBC04" /><path d="M29.077 32.693H3.323V12.6h25.754v20.093z" fill="#FEF7E0" /><path fillRule="evenodd" clipRule="evenodd" d="M16.299 15.924l-2.67 2.67 2.67 2.67a.9.9 0 101.273-1.273l-.373-.372a4.189 4.189 0 013.168 4.06 4.187 4.187 0 01-4.185 4.185 4.187 4.187 0 01-4.185-4.185.9.9 0 00-1.8 0 5.987 5.987 0 005.985 5.985 5.987 5.987 0 005.985-5.985 5.988 5.988 0 00-5.15-5.927l.555-.556a.9.9 0 00-1.273-1.273z" fill="#EA8600" /></svg>
    )
}

export default React.memo(IconFreeAndReturn);
