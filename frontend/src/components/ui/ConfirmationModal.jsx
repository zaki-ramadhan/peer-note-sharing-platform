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
    confirmText = 'Konfirmasi',
    cancelText = 'Batal',
    loading = false
}) => {
    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <XCircle className="w-6 h-6 text-red-600" />;
            case 'success':
                return <CheckCircle className="w-6 h-6 text-green-600" />;
            case 'info':
                return <Info className="w-6 h-6 text-blue-600" />;
            default:
                return <AlertTriangle className="w-6 h-6 text-amber-600" />;
        }
    };

    const getIconBackground = () => {
        switch (type) {
            case 'danger':
                return 'bg-red-50 border border-red-100';
            case 'success':
                return 'bg-green-50 border border-green-100';
            case 'info':
                return 'bg-blue-50 border border-blue-100';
            default:
                return 'bg-amber-50 border border-amber-100';
        }
    };

    const getHeaderBackground = () => {
        switch (type) {
            case 'danger':
                return 'bg-red-50/50 border-red-100';
            case 'success':
                return 'bg-green-50/50 border-green-100';
            case 'info':
                return 'bg-blue-50/50 border-blue-100';
            default:
                return 'bg-amber-50/50 border-amber-100';
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
    }; return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalHeader onClose={onClose} className={`${getHeaderBackground()}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getIconBackground()}`}>
                        {getIcon()}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {type === 'warning' && 'Konfirmasi diperlukan'}
                            {type === 'danger' && 'Tindakan berbahaya'}
                            {type === 'info' && 'Informasi penting'}
                            {type === 'success' && 'Berhasil'}
                        </p>
                    </div>
                </div>
            </ModalHeader>

            <ModalContent className="py-6">
                <p className="text-gray-700 leading-relaxed text-base">{message}</p>

                {type === 'danger' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 font-medium">
                            ⚠️ Peringatan: Tindakan ini tidak dapat dibatalkan
                        </p>
                    </div>
                )}

                {type === 'warning' && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700 font-medium">
                            💡 Pastikan Anda yakin dengan tindakan ini
                        </p>
                    </div>
                )}
            </ModalContent>

            <ModalFooter className="bg-gray-50/50 px-6 py-4">
                <div className="flex gap-3 w-full sm:w-auto sm:flex-row-reverse">
                    <Button
                        variant={getButtonVariant()}
                        onClick={onConfirm}
                        loading={loading}
                        className="w-full sm:w-auto"
                    >
                        {confirmText}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:w-auto border border-gray-200 hover:bg-gray-50"
                    >
                        {cancelText}
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;
