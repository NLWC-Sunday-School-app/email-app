import React from "react";
export const DocumentUploadIcon = ({ size = 24, width = 24, height = 24, ...props }) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
    >
        <path
            d="M9 17v-6l-2 2M9 11l2 2"
            stroke="#FF8A65"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
            stroke="#FF8A65"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z"
            stroke="#FF8A65"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />

    </svg>

);
