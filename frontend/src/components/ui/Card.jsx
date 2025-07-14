import React from 'react';
import { clsx } from 'clsx';

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx(
            'rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden',
            className
        )}
        {...props}
    >
        {children}
    </div>
));

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-4 border-b border-gray-100', className)}
        {...props}
    >
        {children}
    </div>
));

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-4', className)}
        {...props}
    >
        {children}
    </div>
));

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}
        {...props}
    >
        {children}
    </div>
));

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
    <h3
        ref={ref}
        className={clsx('text-lg font-semibold text-gray-900', className)}
        {...props}
    >
        {children}
    </h3>
));

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={clsx('text-sm text-gray-600 mt-1', className)}
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
