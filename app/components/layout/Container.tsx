import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Container({
    children,
    className,
    size = 'xl',
    ...props
}: ContainerProps) {
    const sizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
    };

    return (
        <div
            className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
            {...props}
        >
            {children}
        </div>
    );
}
