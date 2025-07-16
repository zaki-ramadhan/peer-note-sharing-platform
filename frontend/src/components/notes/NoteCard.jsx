import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    Download,
    Star,
    MessageSquare,
    Calendar,
    User,
    FileText,
    MoreVertical,
    Eye,
    Heart,
    Bookmark,
    Share2,
    ThumbsUp
} from 'lucide-react';
import { Card, CardContent } from '@ui/Card';
import { Button, Rating } from '@ui';
import { Badge, Avatar } from '@ui';
import { formatDistanceToNow } from 'date-fns';
import { useFavorites } from '@hooks/useFavorites';
import RatingModal from './RatingModal';
import {
    showDownloadStartToast,
    showDownloadSuccessToast,
    showDownloadErrorToast,
    showRatingSuccessToast,
    showRatingErrorToast,
    showFeatureComingSoonToast,
    showShareSuccessToast,
    showCopySuccessToast,
    showShareErrorToast,
    showGenericErrorToast
} from '@utils/toastUtils';

const NoteCard = ({ note, onDownload, onRate, compact = false, mini = false, showFavoriteButton = true }) => {
    const { toggleFavorite, isFavorite, loading: favLoading } = useFavorites();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const {
        id,
        title,
        description,
        subject,
        author,
        uploadDate,
        downloadCount,
        averageRating,
        reviewCount,
        fileType,
        tags,
        thumbnail
    } = note; const formatDate = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }; const handleFavorite = async () => {
        if (favLoading) return;

        try {
            const result = await toggleFavorite(note.id);
            // Toast is already handled in FavoritesContext
            if (result.success) {
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            showGenericErrorToast('Something went wrong!');
        }
    };

    const handleRateClick = () => {
        setShowRatingModal(true);
    }; const handleDownload = async () => {
        try {
            showDownloadStartToast(note.title);

            // Call the original onDownload callback if provided
            if (onDownload) {
                onDownload(note);
            }

            // Simulate download delay
            setTimeout(() => {
                showDownloadSuccessToast(note.title);
            }, 1000);

        } catch (error) {
            console.error('Error downloading note:', error);
            showDownloadErrorToast();
        }
    };

    const handleBookmark = () => {
        showFeatureComingSoonToast('Bookmark');
    };

    const handleShare = async () => {
        try {
            // Check if Web Share API is supported
            if (navigator.share) {
                await navigator.share({
                    title: note.title,
                    text: `Check out this note: ${note.title}`,
                    url: window.location.href
                });
                showShareSuccessToast();
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                showCopySuccessToast();
            }
        } catch (error) {
            console.error('Error sharing note:', error);
            showShareErrorToast();
        }
    };

    const handleSubmitRating = async (note, rating, comment) => {
        try {
            console.log('Rating submitted:', { note: note.id, rating, comment });

            // Call the original onRate callback if provided
            if (onRate) {
                onRate(note, rating, comment);
            }

            // Here you would typically send the rating to your backend
            // await api.submitRating(note.id, rating, comment);

            showRatingSuccessToast(note.title);

        } catch (error) {
            console.error('Error submitting rating:', error);
            showRatingErrorToast();
        }
    };

    const getSubjectGradient = (subject) => {
        const gradients = {
            'Matematika': 'from-blue-500 to-cyan-500',
            'Fisika': 'from-purple-500 to-pink-500',
            'Kimia': 'from-green-500 to-teal-500',
            'Biologi': 'from-emerald-500 to-lime-500',
            'Komputer': 'from-gray-700 to-gray-900',
            'Bahasa Inggris': 'from-red-500 to-orange-500',
            'Bahasa Indonesia': 'from-yellow-500 to-amber-500',
            'Sejarah': 'from-amber-600 to-orange-600',
            'Geografi': 'from-teal-500 to-cyan-500',
            'Ekonomi': 'from-indigo-500 to-purple-500'
        };
        return gradients[subject] || 'from-gray-500 to-gray-600';
    }; if (mini) {
        return (
            <Card variant="glass" className="h-full flex flex-col transition-all duration-300 border border-white/20 font-['Hanken_Grotesk']">
                <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getSubjectGradient(subject)} rounded-lg flex items-center justify-center shadow-md mx-auto mb-3`}>
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <Link to={`/notes/${id}`} className="group flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-tight">
                                {title}
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-3 min-h-[1.25rem]">{subject}</p>
                        <div className="flex items-center justify-center space-x-1 mb-3">
                            <Rating value={averageRating} readonly size="sm" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                            <div className="flex items-center space-x-1">
                                <Download className="w-4 h-4" />
                                <span>{downloadCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{Math.floor(downloadCount * 1.5)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    } if (compact) {
        return (
            <Card variant="glass" className="h-full flex flex-col transition-all duration-300 border border-white/20 font-['Hanken_Grotesk']">
                <CardContent className="p-5 flex-1">
                    <div className="flex items-start space-x-4 h-full">
                        <div className="flex-shrink-0">
                            <div className={`w-16 h-16 bg-gradient-to-br ${getSubjectGradient(subject)} rounded-xl flex items-center justify-center shadow-md`}>
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                            <div className="flex-1">
                                <Link to={`/notes/${id}`} className="group">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2 leading-tight">
                                        {title}
                                    </h3>
                                </Link>
                                <p className="text-base text-gray-600 mb-3 min-h-[1.5rem]">{subject}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <Rating value={averageRating} readonly size="md" showValue />
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Download className="w-4 h-4" />
                                        <span className="font-medium">{downloadCount}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Eye className="w-4 h-4" />
                                        <span className="font-medium">{downloadCount * 3}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    } return (
        <Card variant="elevated" className="group h-full flex flex-col transition-all duration-500 overflow-hidden font-['Hanken_Grotesk']">
            {/* Header with gradient and thumbnail */}
            <div className="relative">
                <div className={`h-48 bg-gradient-to-br ${getSubjectGradient(subject)} relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Preview icon or thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <FileText className="w-16 h-16 text-white/80" />
                        )}
                    </div>

                    {/* Subject Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-medium">
                            {subject}
                        </Badge>
                    </div>

                    {/* File Type Badge */}
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-medium">
                            {fileType?.toUpperCase() || 'PDF'}
                        </Badge>
                    </div>                    {/* Quick Actions - appear on hover */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex space-x-2">
                            {showFavoriteButton && (
                                <button
                                    onClick={handleFavorite}
                                    disabled={favLoading}
                                    className={`p-2 backdrop-blur-sm rounded-lg transition-colors ${isFavorite(note.id)
                                        ? 'bg-red-500/80 hover:bg-red-600/80'
                                        : 'bg-white/20 hover:bg-white/30'
                                        }`}
                                    title={isFavorite(note.id) ? "Hapus dari favorit" : "Tambahkan ke favorit"}
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite(note.id) ? 'text-white fill-current' : 'text-white'}`} />
                                </button>
                            )}                            <button
                                onClick={handleBookmark}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                                title="Simpan untuk nanti"
                            >
                                <Bookmark className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                                title="Bagikan catatan"
                            >
                                <Share2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>            <CardContent className="p-6 flex-1 flex flex-col">
                {/* Title and Description */}
                <div className="mb-3 flex-1">
                    <Link to={`/notes/${id}`} className="group">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2 leading-tight ">
                            {title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed min-h-[3rem]">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                    {tags && tags.length > 0 ? (
                        <>
                            {tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                    #{tag}
                                </Badge>
                            ))}
                            {tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                                    +{tags.length - 2} more
                                </Badge>
                            )}
                        </>
                    ) : (
                        <div className="text-xs text-gray-400 italic">No tags</div>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                    <Rating value={averageRating} readonly showValue />
                    <span className="text-sm text-gray-500">
                        ({reviewCount} reviews)
                    </span>
                </div>

                {/* Author and Stats */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Avatar
                            src={author.avatar}
                            alt={author.name}
                            size="sm"
                            initials={author.name?.split(' ').map(n => n[0]).join('')}
                            className="ring-2 ring-gray-100"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{author.name}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(uploadDate)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span className="font-medium">{downloadCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">{downloadCount * 3}</span>
                        </div>
                    </div>
                </div>                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-auto">
                    <Button
                        className="flex-1"
                        size="md"
                        onClick={handleDownload}
                    >
                        <Download className="w-4 h-4 inline mr-2" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        onClick={handleRateClick}
                        className="px-4"
                        title="Rate this note"
                    >
                        <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Link to={`/notes/${id}`}>
                        <Button variant="ghost" size="md" className="px-4" title="View details">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>

            {/* Rating Modal */}
            <RatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                note={note}
                onSubmitRating={handleSubmitRating}
            />
        </Card>
    );
};

export default NoteCard;


