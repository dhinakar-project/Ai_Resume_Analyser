import { type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    value: number; // 0-100
    variant?: 'default' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export default function ProgressBar({
    value,
    variant = 'default',
    size = 'md',
    showLabel = false,
    className,
    ...props
}: ProgressBarProps) {
    const variants = {
        default: 'bg-brand-500',
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        error: 'bg-red-500',
    };

    const sizes = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className={cn('w-full', className)} {...props}>
            {showLabel && (
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-semibold text-white">{clampedValue}%</span>
                </div>
            )}
            <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', sizes[size])}>
                <div
                    className={cn('h-full transition-all duration-500 ease-out rounded-full', variants[variant])}
                    style={{ width: `${clampedValue}%` }}
                />
            </div>
        </div>
    );
}

// Circular Progress Component
interface CircularProgressProps {
    value: number; // 0-100
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'error';
    showLabel?: boolean;
}

export function CircularProgress({
    value,
    size = 'md',
    variant = 'default',
    showLabel = true,
}: CircularProgressProps) {
    const sizes = {
        sm: { width: 80, stroke: 6 },
        md: { width: 120, stroke: 8 },
        lg: { width: 160, stroke: 10 },
    };

    const variants = {
        default: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
    };

    const { width, stroke } = sizes[size];
    const radius = (width - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedValue = Math.min(100, Math.max(0, value));
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width, height: width }}>
                <svg width={width} height={width} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={stroke}
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke={variants[variant]}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-500 ease-out"
                    />
                </svg>
                {showLabel && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{clampedValue}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}
