import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(({
    className,
    type = 'text',
    error,
    label,
    icon: Icon,
    disabled = false,
    ...props
}, ref) => {
    return (
        <div className="w-full">            {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2 font-['Hanken_Grotesk']">
                {label}
            </label>
        )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}                <input
                    type={type}
                    className={clsx(
                        'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors duration-200 font-["Hanken_Grotesk"]',
                        'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                        'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
                        Icon && 'pl-10',
                        error && 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500',
                        className
                    )}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;


