import React, { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, CheckCheck, Trash2, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router';
import Layout from '../components/layout/Layout';
import { Button, Card, Badge } from '../components/ui';
import { useNotifications } from '../hooks/useNotifications';
import { useAuth } from '../contexts/AuthContext';
import AOS from 'aos';

const NotificationsPage = () => {
    const { user } = useAuth();
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications
    } = useNotifications();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out',
        });
    }, []);

    const formatTime = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    const getIconForType = (type) => {
        switch (type) {
            case 'download': return '📥';
            case 'favorite': return '❤️';
            case 'rating': return '⭐';
            case 'share': return '📤';
            default: return '🔔';
        }
    };

    const getBadgeColorForType = (type) => {
        switch (type) {
            case 'download': return 'bg-blue-100 text-blue-800';
            case 'favorite': return 'bg-red-100 text-red-800';
            case 'rating': return 'bg-yellow-100 text-yellow-800';
            case 'share': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const groupedNotifications = notifications.reduce((groups, notification) => {
        const today = new Date();
        const notificationDate = new Date(notification.timestamp);
        const diffTime = today - notificationDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let group;
        if (diffDays === 0) {
            group = 'Today';
        } else if (diffDays === 1) {
            group = 'Yesterday';
        } else if (diffDays <= 7) {
            group = 'This Week';
        } else if (diffDays <= 30) {
            group = 'This Month';
        } else {
            group = 'Older';
        }

        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(notification);
        return groups;
    }, {});

    return (
        <Layout user={user}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Hanken_Grotesk']">
                {/* Header */}
                <div className="mb-8" data-aos="fade-up">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            to="/dashboard"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                                Notifications
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Stay updated with your latest activities ({unreadCount} unread)
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4" data-aos="fade-up" data-aos-delay="200">
                        {unreadCount > 0 && (
                            <Button
                                variant="outline"
                                onClick={markAllAsRead}
                                className="flex items-center gap-2"
                            >
                                <CheckCheck className="h-4 w-4" />
                                Mark All as Read
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button
                                variant="ghost"
                                onClick={clearAllNotifications}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                                Clear All
                            </Button>
                        )}
                        <Badge variant="secondary" className="px-3 py-1">
                            {notifications.length} Total Notifications
                        </Badge>
                    </div>
                </div>

                {/* Notifications Content */}
                {notifications.length === 0 ? (
                    <div className="text-center py-20" data-aos="fade-up" data-aos-delay="300">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-md">
                            <Bell className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                            No notifications yet
                        </h3>
                        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                            When you interact with notes, receive ratings, or get updates, they'll appear here.
                        </p>
                        <Link to="/notes">
                            <Button variant="gradient">
                                Browse Notes
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8" data-aos="fade-up" data-aos-delay="300">
                        {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
                            <div key={group}>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span>{group}</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {groupNotifications.length}
                                    </Badge>
                                </h2>

                                <div className="space-y-4">
                                    {groupNotifications.map((notification, index) => (
                                        <Card
                                            key={notification.id}
                                            className={`transition-all duration-300 hover:shadow-lg ${!notification.read ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
                                                }`}
                                            data-aos="fade-up"
                                            data-aos-delay={400 + (index * 100)}
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start gap-4">
                                                    {/* Icon */}
                                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'
                                                        }`}>
                                                        <span className="text-xl">
                                                            {getIconForType(notification.type)}
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'
                                                                        }`}>
                                                                        {notification.title}
                                                                    </h3>
                                                                    <Badge
                                                                        className={`text-xs ${getBadgeColorForType(notification.type)}`}
                                                                    >
                                                                        {notification.type}
                                                                    </Badge>
                                                                    {!notification.read && (
                                                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-600 mb-3 leading-relaxed">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {formatTime(notification.timestamp)}
                                                                </p>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-2">
                                                                {!notification.read && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => markAsRead(notification.id)}
                                                                        className="text-blue-600 hover:text-blue-700"
                                                                        title="Mark as read"
                                                                    >
                                                                        <Check className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => clearNotification(notification.id)}
                                                                    className="text-gray-400 hover:text-red-600"
                                                                    title="Remove notification"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NotificationsPage;
