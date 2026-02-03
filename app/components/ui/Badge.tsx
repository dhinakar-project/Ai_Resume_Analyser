import { type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink';
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({
    className,
    variant = 'default',
    size = 'md',
    children,
    ...props
}: BadgeProps) {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

    const variants = {
        default: 'bg-white/10 text-white border border-white/20',
        success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        error: 'bg-red-500/20 text-red-400 border border-red-500/30',
        info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </span>
    );
}
