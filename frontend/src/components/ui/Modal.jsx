
import { clsx } from 'clsx';

const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    className
}) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal content */}                <div className={clsx(
                    'relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all font-["Hanken_Grotesk"]',
                    sizes[size],
                    'w-full',
                    className
                )}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ModalHeader = ({ children, onClose, className }) => (
    <div className={clsx('flex items-center justify-between px-6 py-4 border-b border-gray-200', className)}>
        <div className="flex-1">
            {children}
        </div>
        {onClose && (
            <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        )}
    </div>
);

const ModalContent = ({ children, className }) => (
    <div className={clsx('px-6 py-4', className)}>
        {children}
    </div>
);

const ModalFooter = ({ children, className }) => (
    <div className={clsx('flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50', className)}>
        {children}
    </div>
);

export { Modal, ModalHeader, ModalContent, ModalFooter };
