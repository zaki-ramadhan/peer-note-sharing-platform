import React, { useState } from 'react';
import { Star, X, MessageSquare } from 'lucide-react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@ui/Modal';
import { Button, Rating } from '@ui';

const RatingModal = ({ isOpen, onClose, note, onSubmitRating }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) return;

        setLoading(true);
        try {
            await onSubmitRating?.(note, rating, comment);
            onClose();
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setRating(0);
        setComment('');
    };

    if (!note) return null;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
            <ModalHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Rate this Note
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </ModalHeader>

            <ModalContent className="space-y-6">
                {/* Note Preview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">{note.title}</h4>
                    <p className="text-sm text-gray-600">{note.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">by {note.author?.name}</p>
                </div>

                {/* Rating Input */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        How would you rate this note?
                    </p>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        size="lg"
                        className="justify-center"
                    />
                    {rating > 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                            {rating === 1 && "Poor"}
                            {rating === 2 && "Fair"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Very Good"}
                            {rating === 5 && "Excellent"}
                        </p>
                    )}
                </div>

                {/* Comment Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        Comment (optional)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this note..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                        maxLength={500}
                    />                    <p className="text-xs text-gray-500 mt-1">
                        {comment.length}/500 karakter
                    </p>
                </div>
            </ModalContent>

            <ModalFooter>
                <div className="flex justify-end space-x-3">                    <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={loading}
                >
                    Batal
                </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={rating === 0 || loading}
                        loading={loading}
                    >
                        Kirim Rating
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default RatingModal;
