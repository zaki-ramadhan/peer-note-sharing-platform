/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({
    value = 0,
    onChange,
    size = 'md',
    readonly = false,
    showValue = false,
    className = ''
}) => {
    const [hover, setHover] = useState(0);

    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    const getRatingStars = () => {
        const stars = [];
        const currentRating = readonly ? value : (hover || value);

        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= currentRating;
            const isHalf = !readonly && currentRating === i - 0.5;

            stars.push(
                <button
                    key={i}
                    type="button"
                    disabled={readonly}
                    className={`${sizeClasses[size]} ${readonly
                            ? 'cursor-default'
                            : 'cursor-pointer hover:scale-110 transition-transform'
                        } ${isFilled ? 'text-yellow-400' : 'text-gray-300'} ${!readonly && hover >= i ? 'text-yellow-400' : ''
                        }`}
                    onClick={() => !readonly && onChange?.(i)}
                    onMouseEnter={() => !readonly && setHover(i)}
                    onMouseLeave={() => !readonly && setHover(0)}
                >
                    <Star className={`w-full h-full ${isFilled ? 'fill-current' : ''}`} />
                </button>
            );
        }

        return stars;
    };

    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <div className="flex items-center space-x-1">
                {getRatingStars()}
            </div>
            {showValue && (
                <span className="text-sm font-medium text-gray-700 ml-2">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default Rating;
