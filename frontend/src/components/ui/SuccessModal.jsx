import { useEffect } from "react";
import { CheckCircle, X, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { Modal, ModalContent } from "./Modal";
import Button from "./Button";

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Berhasil!",
  message = "Operasi telah berhasil dilakukan",
  points = null,
  actionText = "Lanjutkan",
  onAction = null,
}) => {
  // Auto close after 5 seconds if no action is required
  useEffect(() => {
    if (isOpen && !onAction) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAction, onClose]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-md w-full mx-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full transform -translate-x-12 translate-y-12"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative p-6 sm:p-8 text-center">
          {/* Success icon with animation */}
          <div className="relative mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg transform animate-bounce">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            {/* Animated sparkles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 absolute -bottom-2 -left-2 animate-pulse delay-200" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 absolute top-2 -left-3 animate-pulse delay-500" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>

          {/* Message */}
          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed px-2">
            {message}
          </p>

          {/* Points reward (if applicable) */}
          {points && (
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 mb-6 border border-orange-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Trophy className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  Poin Reward
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                +{points} Poin
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Terus berbagi untuk mendapatkan lebih banyak poin!
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 order-2 sm:order-1"
            >
              Tutup
            </Button>
            {onAction && (
              <Button
                onClick={() => {
                  onAction();
                  onClose();
                }}
                className="px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center space-x-2 order-1 sm:order-2"
              >
                <span>{actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Auto close indicator */}
          {!onAction && (
            <p className="text-xs text-gray-400 mt-4">
              Modal ini akan tertutup otomatis dalam 5 detik
            </p>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
