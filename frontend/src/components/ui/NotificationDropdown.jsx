import React from 'react';
import { Link } from 'react-router';
import { X, Check, CheckCheck, Trash2, Bell, Heart, Star, MessageSquare } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications
    } = useNotifications();

    if (!isOpen) return null;

    const handleMarkAsRead = (e, notificationId) => {
        e.stopPropagation();
        markAsRead(notificationId);
    };

    const handleClearNotification = (e, notificationId) => {
        e.stopPropagation();
        clearNotification(notificationId);
    }; const formatTime = (timestamp) => {
        try {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHours > 0) {
                return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else if (diffMins > 0) {
                return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
            } else {
                return 'just now';
            }
        } catch {
            return 'just now';
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'favorite':
                return <Heart className="h-4 w-4 text-red-500" />;
            case 'rating':
                return <Star className="h-4 w-4 text-yellow-500" />;
            case 'comment':
                return <MessageSquare className="h-4 w-4 text-blue-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 z-50 font-['Hanken_Grotesk']">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            title="Mark all as read"
                        >
                            <CheckCheck className="h-4 w-4" />
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAllNotifications}
                            className="text-sm text-gray-400 hover:text-red-600 font-medium"
                            title="Clear all notifications"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        title="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No notifications</h3>
                        <p className="text-xs text-gray-500">
                            You're all caught up! No new notifications.
                        </p>
                    </div>
                ) : (
                    <div className="py-2">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${notification.read
                                    ? 'border-transparent'
                                    : 'border-blue-500 bg-blue-50/30'
                                    }`}
                            >
                                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatTime(notification.timestamp)}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-1 ml-2">
                                            {!notification.read && (
                                                <button
                                                    onClick={(e) => handleMarkAsRead(e, notification.id)}
                                                    className="text-blue-600 hover:text-blue-700"
                                                    title="Mark as read"
                                                >
                                                    <Check className="h-3 w-3" />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => handleClearNotification(e, notification.id)}
                                                className="text-gray-400 hover:text-red-600"
                                                title="Clear notification"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div className="border-t border-gray-100 p-3">
                    <Link
                        to="/notifications"
                        className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        onClick={onClose}
                    >
                        View all notifications
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
