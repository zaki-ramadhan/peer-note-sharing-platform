import React from 'react';
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
    Share2
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui';
import { Badge, Avatar } from '../ui';
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
    };

    if (compact) {
        return (
            <Card variant="glass" className="hover:shadow-xl transition-all duration-300 border border-white/20 font-['Hanken_Grotesk']">
                <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className={`w-14 h-14 bg-gradient-to-br ${getSubjectGradient(subject)} rounded-xl flex items-center justify-center shadow-lg`}>
                                <FileText className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <Link to={`/notes/${id}`} className="group">
                                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                                    {title}
                                </h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">{subject}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                    {getRatingStars(averageRating).slice(0, 3)}
                                    <span className="text-xs text-gray-500">({reviewCount})</span>
                                </div>
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Download className="w-3 h-3" />
                                        <span>{downloadCount}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Eye className="w-3 h-3" />
                                        <span>{downloadCount * 3}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    } return (
        <Card variant="elevated" className="group hover:shadow-2xl transition-all duration-500 overflow-hidden font-['Hanken_Grotesk']">
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
                        <Badge className="bg-black/20 backdrop-blur-sm text-white border-white/30 font-medium">
                            {fileType?.toUpperCase() || 'PDF'}
                        </Badge>
                    </div>

                    {/* Quick Actions - appear on hover */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex space-x-2">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                                <Heart className="w-4 h-4 text-white" />
                            </button>
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                                <Bookmark className="w-4 h-4 text-white" />
                            </button>
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                                <Share2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                {/* Title and Description */}
                <div className="mb-4">
                    <Link to={`/notes/${id}`} className="group">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-tight">
                            {title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                #{tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                                +{tags.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                        {getRatingStars(averageRating)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                        {averageRating.toFixed(1)}
                    </span>
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
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                    <Button
                        className="flex-1"
                        size="md"
                        onClick={() => onDownload?.(note)}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => onRate?.(note)}
                        className="px-4"
                    >
                        <Star className="w-4 h-4" />
                    </Button>
                    <Link to={`/notes/${id}`}>
                        <Button variant="ghost" size="md" className="px-4">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
