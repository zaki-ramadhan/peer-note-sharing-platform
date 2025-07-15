import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    className
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    }; const modalContent = (
        <div className={`fixed inset-0 z-[9999] overflow-y-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop with smooth animation */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop click handler */}
                <div
                    className="fixed inset-0 cursor-pointer"
                    onClick={onClose}
                />

                {/* Modal content with improved shadow and animation */}
                <div className={clsx(
                    `relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all duration-300 ease-out font-["Hanken_Grotesk"] z-10 border border-gray-100`,
                    isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4',
                    sizes[size],
                    'w-full max-h-[90vh] overflow-y-auto',
                    className
                )}>
                    {children}
                </div>
            </div>
        </div>
    );

    // Render modal in document.body to escape any positioning contexts
    return createPortal(modalContent, document.body);
};

const ModalHeader = ({ children, onClose, className }) => (
    <div className={clsx('flex items-center justify-between px-6 py-5 border-b border-gray-200', className)}>
        <div className="flex-1">
            {children}
        </div>
        {onClose && (
            <button
                onClick={onClose}
                className="ml-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className={clsx('flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200', className)}>
        {children}
    </div>
);

export { Modal, ModalHeader, ModalContent, ModalFooter };


