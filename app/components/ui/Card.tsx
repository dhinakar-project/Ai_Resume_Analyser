import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'elevated';
    hover?: boolean;
    children: ReactNode;
}

export default function Card({
    className,
    variant = 'default',
    hover = false,
    children,
    ...props
}: CardProps) {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variants = {
        default: 'bg-white/5 border border-white/10',
        glass: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass',
        elevated: 'bg-white/10 shadow-xl border border-white/20',
    };

    const hoverStyles = hover ? 'hover:scale-[1.02] hover:shadow-2xl hover:border-white/30 cursor-pointer' : '';

    return (
        <div
            className={cn(baseStyles, variants[variant], hoverStyles, className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pb-4', className)} {...props}>
            {children}
        </div>
    );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pt-4 border-t border-white/10', className)} {...props}>
            {children}
        </div>
    );
}
