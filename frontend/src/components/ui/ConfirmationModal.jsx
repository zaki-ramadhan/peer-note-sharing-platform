import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'warning', // 'warning', 'danger', 'info', 'success'
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    loading = false
}) => {
    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <XCircle className="w-6 h-6 text-red-500" />;
            case 'success':
                return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'info':
                return <Info className="w-6 h-6 text-blue-500" />;
            default:
                return <AlertTriangle className="w-6 h-6 text-orange-500" />;
        }
    };

    const getButtonVariant = () => {
        switch (type) {
            case 'danger':
                return 'danger';
            case 'success':
                return 'primary';
            case 'info':
                return 'primary';
            default:
                return 'warning';
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalHeader onClose={onClose}>
                <div className="flex items-center gap-3">
                    {getIcon()}
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
            </ModalHeader>

            <ModalContent>
                <p className="text-gray-600 leading-relaxed">{message}</p>
            </ModalContent>

            <ModalFooter>
                <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </Button>
                <Button
                    variant={getButtonVariant()}
                    onClick={onConfirm}
                    loading={loading}
                >
                    {confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;
