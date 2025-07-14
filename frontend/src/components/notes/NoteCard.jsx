
import { Link } from 'react-router';
import {
    Download,
    Star,
    MessageSquare,
    Calendar,
    User,
    FileText,
    MoreVertical
} from 'lucide-react';
import { Card, CardContent, Button, Badge, Avatar } from '../ui';
import { formatDistanceToNow } from 'date-fns';

const NoteCard = ({ note, onDownload, onRate, compact = false }) => {
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
    } = note;

    const formatDate = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    const getRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
        }

        return stars;
    };

    if (compact) {
        return (
            <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <Link to={`/notes/${id}`} className="group">
                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {title}
                                </h3>
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">{subject}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-1">
                                    {getRatingStars(averageRating).slice(0, 3)}
                                    <span className="text-xs text-gray-500">({reviewCount})</span>
                                </div>
                                <span className="text-xs text-gray-500">{downloadCount} downloads</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="hover:shadow-lg transition-all duration-200 group">
            {/* Thumbnail/Preview */}
            <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-xl">
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={title}
                            className="object-cover rounded-t-xl"
                        />
                    ) : (
                        <div className="flex items-center justify-center">
                            <FileText className="w-12 h-12 text-blue-400" />
                        </div>
                    )}
                </div>

                {/* Subject Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="primary" size="sm">
                        {subject}
                    </Badge>
                </div>

                {/* File Type Badge */}
                <div className="absolute top-3 right-3">
                    <Badge variant="default" size="sm">
                        {fileType?.toUpperCase() || 'PDF'}
                    </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="shadow-lg">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <CardContent className="p-4">
                {/* Title and Description */}
                <div className="mb-3">
                    <Link to={`/notes/${id}`} className="group">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {title}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="default" size="sm">
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <Badge variant="default" size="sm">
                                +{tags.length - 3}
                            </Badge>
                        )}
                    </div>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                        {getRatingStars(averageRating)}
                    </div>
                    <span className="text-sm text-gray-600">
                        {averageRating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                </div>

                {/* Author and Stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Avatar
                            src={author.avatar}
                            alt={author.name}
                            size="sm"
                            initials={author.name?.split(' ').map(n => n[0]).join('')}
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{author.name}</p>
                            <p className="text-xs text-gray-500">{formatDate(uploadDate)}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{downloadCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{reviewCount}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => onDownload?.(note)}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRate?.(note)}
                    >
                        <Star className="w-4 h-4 mr-1" />
                        Rate
                    </Button>
                    <Link to={`/notes/${id}`}>
                        <Button variant="ghost" size="sm">
                            View Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
