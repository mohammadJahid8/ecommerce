"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconTotalControl = (props: IProps) => {
    return (
        <svg style={{ ...props }} fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><radialGradient id="a" cx="2.667" cy="2.25" gradientUnits="userSpaceOnUse" r="62.402"><stop offset="0" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient><path d="M6 32.001h36v8H6z" fill="#34a853" /><path d="M41.999 20.001l-18-18-5.75 5.5 15.75 15.75v16.75h8v-8.685z" fill="#3e82f7" /><path d="M6 20.001h8v20H6z" fill="#fdbd00" /><path d="M24 2.001l-18 18v11.25l23.75-23.75z" fill="#eb4335" /><path d="M41.477 19.503L25.41 3.42c-.36-.36-.91-.585-1.41-.585s-1.05.225-1.413.585L6.52 19.503A1.956 1.956 0 006 20.75V21c.018-.48.215-.912.522-1.247L22.59 3.67c.36-.36.91-.585 1.41-.585s1.05.225 1.413.585L41.48 19.753c.308.335.523.767.523 1.247v-.25c-.003-.48-.218-.912-.525-1.247z" fill="#fff" opacity=".2" /><path d="M8 39.749a2 2 0 01-2-2v.25a2 2 0 002 2h6v-.25z" fill="#bf360c" opacity=".2" /><path d="M39.999 39.749h-6v.25h6a2 2 0 002-2v-.25a2 2 0 01-2 2z" fill="#1a237e" opacity=".2" /><path d="M24 39.75H14V40h20v-.25z" fill="#263238" opacity=".2" /><path d="M24.001 32.001h-10v.25h20v-.25z" fill="#fff" opacity=".2" /><path d="M41.477 19.503L25.41 3.42c-.36-.36-.91-.585-1.41-.585s-1.05.225-1.413.585L6.52 19.503A1.956 1.956 0 006 20.75V38a2 2 0 002 2h32a2 2 0 002-2V20.75c0-.48-.215-.912-.522-1.247zM34 32H14v-8.75l10-10 10 10z" fill="url(#a)" /><path d="M24.177 13.073L24 13.25l10 10v-.352z" fill="#1a237e" opacity=".2" /><path d="M14.001 22.9v.352l10-10 .177-.178-.177-.175z" fill="#3e2723" opacity=".2" /></svg>

    )
}

export default React.memo(IconTotalControl);