import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    ...props
}, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden';

    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
        secondary: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-500 border border-gray-200 shadow-sm hover:shadow-md',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 transition-colors duration-300 backdrop-blur-sm',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 rounded-lg',
        danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-500 shadow-lg hover:shadow-xl',
        success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 focus:ring-green-500 shadow-lg hover:shadow-xl',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 shadow-lg hover:shadow-xl',
        glass: 'backdrop-blur-lg bg-white/20 border border-white/30 text-gray-800 hover:bg-white/30 shadow-lg hover:shadow-xl'
    };

    const sizes = {
        sm: 'px-4 py-2.5 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
        xl: 'px-10 py-5 text-lg'
    };

    return (
        <button
            className={clsx(
                baseClasses,
                variants[variant],
                sizes[size],
                loading && 'cursor-wait',
                className
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {/* Ripple effect overlay */}
            <span className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 bg-white rounded-xl"></span>

            {loading && (
                <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
