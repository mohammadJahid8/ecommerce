"use client"
import React from 'react';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const IconGoogle = (props: IProps) => {
    return (
        <svg style={{ ...props }} width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle fill="#F8F8F8" cx="25" cy="25" r="25" /><path d="M36.321 25.169c0-.858-.078-1.675-.221-2.459H24.899v4.561h6.409a5.45 5.45 0 01-2.387 3.657v2.982h3.847c2.253-2.061 3.553-5.116 3.553-8.741" fill="#4285F4" /><path d="M24.899 36.798c3.213 0 5.902-1.063 7.877-2.88l-3.847-2.983c-1.063.715-2.428 1.136-4.03 1.136-3.094 0-5.72-2.095-6.656-4.912h-3.965v3.079c1.96 3.887 5.973 6.56 10.62 6.56" fill="#34A853" /><path d="M14.277 30.238l3.967-3.079a7.116 7.116 0 01-.373-2.26c0-.786.134-1.547.373-2.26V19.56h-3.967A11.848 11.848 0 0013 24.899c0 1.92.468 3.729 1.277 5.339" fill="#FBBC04" /><path d="M24.899 17.736c1.745 0 3.316.602 4.553 1.776l3.412-3.41C30.8 14.182 28.112 13 24.899 13c-4.648 0-8.662 2.673-10.621 6.56l3.965 3.079c.936-2.817 3.562-4.903 6.656-4.903" fill="#EA4335" /></g></svg>

    )
}

export default React.memo(IconGoogle);
