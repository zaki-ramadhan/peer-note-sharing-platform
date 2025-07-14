import React from 'react';
import { clsx } from 'clsx';

const Card = React.forwardRef(({ className, children, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-white shadow-sm border border-gray-200/50 hover:shadow-lg hover:shadow-gray-200/25',
        glass: 'backdrop-blur-lg bg-white/70 border border-white/20 shadow-xl',
        gradient: 'bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-200/50',
        elevated: 'bg-white shadow-xl border-0 hover:shadow-2xl'
    };

    return (<div
        ref={ref}
        className={clsx(
            'rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] font-["Hanken_Grotesk"]',
            variants[variant],
            className
        )}
        {...props}
    >
        {children}
    </div>
    );
});

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-5 border-b border-gray-100/50', className)}
        {...props}
    >
        {children}
    </div>
));

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-5', className)}
        {...props}
    >
        {children}
    </div>
));

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-4 border-t border-gray-100/50 bg-gray-50/50', className)}
        {...props}
    >
        {children}
    </div>
));

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
    <h3
        ref={ref}
        className={clsx('text-xl font-bold text-gray-900 leading-tight', className)}
        {...props}
    >
        {children}
    </h3>
));

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={clsx('text-sm text-gray-600 mt-2 leading-relaxed', className)}
        {...props}
    >
        {children}
    </p>
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
