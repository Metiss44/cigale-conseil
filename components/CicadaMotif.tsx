
import React from 'react';

interface CicadaMotifProps {
    style?: React.CSSProperties;
    className?: string;
}

export const CicadaMotif: React.FC<CicadaMotifProps> = ({ style, className }) => {
    return (
        <div
            aria-hidden="true"
            className={`fixed -z-10 text-brand-sage-light transition-opacity,transform duration-500 ease-out ${className}`}
            style={style}
        >
            <svg
                width="150"
                height="150"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50"
            >
                <path
                    d="M63.5 66.5C63.5 83.5 50 93 50 93C50 93 36.5 83.5 36.5 66.5C36.5 49.5 42 34.5 50 34.5C58 34.5 63.5 49.5 63.5 66.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M50 34.5C41 29.5 31.5 13 31.5 13C31.5 13 38.5 30 42 34.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M50 34.5C59 29.5 68.5 13 68.5 13C68.5 13 61.5 30 58 34.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <circle cx="44" cy="29" r="1.5" fill="currentColor" />
                <circle cx="56" cy="29" r="1.5" fill="currentColor" />
                <path
                    d="M36.5 66.5C11.5 76.5 5 57 5 57C5 57 26.5 51.5 36.5 66.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M63.5 66.5C88.5 76.5 95 57 95 57C95 57 73.5 51.5 63.5 66.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M36.5 55C18.5 55 15 42 15 42C15 42 30.5 45 36.5 55Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M63.5 55C81.5 55 85 42 85 42C85 42 69.5 45 63.5 55Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
};
