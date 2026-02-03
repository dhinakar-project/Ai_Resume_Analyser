import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '~/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl',
                        'text-white placeholder:text-gray-500',
                        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:shadow-[0_0_40px_-5px_rgba(99,102,241,0.4)]',
                        'hover:border-brand-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]',
                        'transition-all duration-200',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
