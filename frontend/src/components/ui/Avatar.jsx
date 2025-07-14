
import { clsx } from 'clsx';

const Avatar = ({
    src,
    alt,
    size = 'md',
    className,
    initials,
    ...props
}) => {
    const sizes = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl'
    };

    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={clsx(
                    'inline-block rounded-full object-cover',
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }

    return (
        <div
            className={clsx(
                'inline-flex items-center justify-center rounded-full bg-gray-500 font-medium text-white',
                sizes[size],
                className
            )}
            {...props}
        >
            {initials || alt?.[0]?.toUpperCase() || 'U'}
        </div>
    );
};

export default Avatar;
