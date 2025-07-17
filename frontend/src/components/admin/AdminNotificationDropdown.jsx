import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
    Bell,
    UserPlus,
    FileText,
    AlertTriangle,
    Shield,
    Settings,
    CheckCircle,
    Clock,
    X,
    Trash2,
    CheckCheck
} from 'lucide-react';

const AdminNotificationDropdown = ({ isOpen, onClose, onUnreadCountChange }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Generate dummy admin notifications
    useEffect(() => {
        const adminNotifications = [
            {
                id: 1,
                type: 'user_registration',
                title: 'Pengguna Baru Terdaftar',
                message: '5 pengguna baru mendaftar dalam 1 jam terakhir',
                timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                isRead: false,
                priority: 'medium',
                icon: UserPlus,
                action: '/admin/users',
                data: { count: 5 }
            },
            {
                id: 2,
                type: 'content_report',
                title: 'Konten Dilaporkan',
                message: 'Catatan "Advanced React Patterns" dilaporkan sebagai spam',
                timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
                isRead: false,
                priority: 'high',
                icon: AlertTriangle,
                action: '/admin/content',
                data: { noteId: 123, reason: 'spam' }
            },
            {
                id: 3,
                type: 'system_alert',
                title: 'Backup Sistem Berhasil',
                message: 'Backup otomatis database telah selesai',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                isRead: true,
                priority: 'low',
                icon: CheckCircle,
                action: '/admin/settings',
                data: { backupSize: '2.3GB' }
            },
            {
                id: 4,
                type: 'security',
                title: 'Percobaan Login Gagal',
                message: '3 percobaan login admin gagal dari IP 192.168.1.100',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                isRead: false,
                priority: 'high',
                icon: Shield,
                action: '/admin/settings',
                data: { ip: '192.168.1.100', attempts: 3 }
            },
            {
                id: 5,
                type: 'content_pending',
                title: 'Konten Menunggu Review',
                message: '12 catatan baru menunggu persetujuan moderasi',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                isRead: true,
                priority: 'medium',
                icon: FileText,
                action: '/admin/content',
                data: { count: 12 }
            },
            {
                id: 6,
                type: 'system_update',
                title: 'Update Sistem Tersedia',
                message: 'Versi 2.1.0 tersedia dengan fitur keamanan baru',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                isRead: true,
                priority: 'medium',
                icon: Settings,
                action: '/admin/settings',
                data: { version: '2.1.0' }
            }
        ]; setNotifications(adminNotifications);
        const initialUnreadCount = adminNotifications.filter(n => !n.isRead).length;
        setUnreadCount(initialUnreadCount);
        if (onUnreadCountChange) {
            onUnreadCountChange(initialUnreadCount);
        }
    }, [onUnreadCountChange]);

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

        if (diffInMinutes < 1) return 'Baru saja';
        if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} jam lalu`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} hari lalu`;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-400 bg-red-900/30 border-red-600/30';
            case 'medium':
                return 'text-yellow-400 bg-yellow-900/30 border-yellow-600/30';
            case 'low':
                return 'text-green-400 bg-green-900/30 border-green-600/30';
            default:
                return 'text-blue-400 bg-blue-900/30 border-blue-600/30';
        }
    }; const markAsRead = (notificationId) => {
        setNotifications(prev => {
            const updated = prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            );
            const newUnreadCount = updated.filter(n => !n.isRead).length;
            setUnreadCount(newUnreadCount);
            if (onUnreadCountChange) {
                onUnreadCountChange(newUnreadCount);
            }
            return updated;
        });
    };

    const markAllAsRead = () => {
        setNotifications(prev => {
            const updated = prev.map(notification => ({ ...notification, isRead: true }));
            setUnreadCount(0);
            if (onUnreadCountChange) {
                onUnreadCountChange(0);
            }
            return updated;
        });
    }; const deleteNotification = (notificationId) => {
        setNotifications(prev => {
            const updated = prev.filter(n => n.id !== notificationId);
            const newUnreadCount = updated.filter(n => !n.isRead).length;
            setUnreadCount(newUnreadCount);
            if (onUnreadCountChange) {
                onUnreadCountChange(newUnreadCount);
            }
            return updated;
        });
    };

    const deleteAllNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
        if (onUnreadCountChange) {
            onUnreadCountChange(0);
        }
    }; if (!isOpen) return null;
    return (<div className="admin-notification-dropdown absolute right-0 mt-2 w-80 sm:w-96 bg-gray-800/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl max-h-96 overflow-hidden z-50">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-gray-700/50">
            <div className="flex items-center space-x-2 min-w-0">
                <Bell className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <h3 className="text-sm font-semibold text-white truncate">Notifikasi Admin</h3>
                {unreadCount > 0 && (
                    <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full flex-shrink-0">
                        {unreadCount}
                    </span>
                )}
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1 p-1"
                        title="Tandai semua sebagai dibaca"
                    >
                        <CheckCheck className="h-3 w-3" />
                        <span className="hidden sm:inline">Baca Semua</span>
                    </button>
                )}

                {/* Tombol hapus semua hanya muncul jika SEMUA notifikasi sudah dibaca (tidak ada yang belum dibaca) */}
                {notifications.length > 0 && unreadCount === 0 && (
                    <button
                        onClick={deleteAllNotifications}
                        className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center space-x-1 p-1"
                        title="Hapus semua notifikasi"
                    >
                        <Trash2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Hapus Semua</span>
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-gray-300 rounded"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>            {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
                <div className="p-6 text-center">
                    <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-white mb-1">Tidak ada notifikasi</h3>
                    <p className="text-xs text-gray-400">
                        Notifikasi admin akan muncul di sini
                    </p>
                </div>
            ) : (
                <div>
                    {/* Unread Notifications Section */}
                    {(() => {
                        const unreadNotifications = notifications.filter(n => !n.isRead);
                        const readNotifications = notifications.filter(n => n.isRead);

                        return (
                            <>
                                {unreadNotifications.length > 0 && (
                                    <div>
                                        <div className="px-4 py-2 bg-blue-900/20 border-b border-blue-600/30">
                                            <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wide flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                                Belum Dibaca ({unreadNotifications.length})
                                            </h4>
                                        </div>
                                        <div className="divide-y divide-gray-700/50">
                                            {unreadNotifications.map((notification) => {
                                                const Icon = notification.icon;
                                                return (<div
                                                    key={notification.id}
                                                    className="group relative px-3 sm:px-4 py-3 hover:bg-gray-700/30 transition-colors bg-gray-700/20"
                                                >
                                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                                        <div className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                                                            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-medium text-white truncate pr-2">
                                                                        {notification.title}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                                        {notification.message}
                                                                    </p>
                                                                    <div className="flex items-center justify-between mt-2">
                                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                            <Clock className="h-3 w-3 flex-shrink-0" />
                                                                            <span className="truncate">{formatTimeAgo(notification.timestamp)}</span>
                                                                        </div>
                                                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                    className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action buttons */}
                                                    <div className="mt-3 flex items-center space-x-2 text-xs">
                                                        {notification.action && (
                                                            <Link
                                                                to={notification.action}
                                                                onClick={() => {
                                                                    markAsRead(notification.id);
                                                                    onClose();
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 font-medium truncate"
                                                            >
                                                                Lihat Detail
                                                            </Link>
                                                        )}
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-gray-400 hover:text-gray-300 truncate"
                                                        >
                                                            Tandai Dibaca
                                                        </button>
                                                    </div>
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Read Notifications Section */}
                                {readNotifications.length > 0 && (
                                    <div>
                                        <div className="px-4 py-2 bg-gray-700/20 border-b border-gray-600/30">
                                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center">
                                                <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                                                Sudah Dibaca ({readNotifications.length})
                                            </h4>
                                        </div>
                                        <div className="divide-y divide-gray-700/50">
                                            {readNotifications.map((notification) => {
                                                const Icon = notification.icon;
                                                return (<div
                                                    key={notification.id}
                                                    className="group relative px-3 sm:px-4 py-3 hover:bg-gray-700/30 transition-colors"
                                                >
                                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                                        <div className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg ${getPriorityColor(notification.priority)} opacity-60`}>
                                                            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-medium text-gray-300 truncate pr-2">
                                                                        {notification.title}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                                        {notification.message}
                                                                    </p>
                                                                    <div className="flex items-center mt-2">
                                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                            <Clock className="h-3 w-3 flex-shrink-0" />
                                                                            <span className="truncate">{formatTimeAgo(notification.timestamp)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                    className="flex-shrink-0 p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all ml-1"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action buttons */}
                                                    {notification.action && (
                                                        <div className="mt-3">
                                                            <Link
                                                                to={notification.action}
                                                                onClick={onClose}
                                                                className="text-xs text-blue-400 hover:text-blue-300 font-medium truncate"
                                                            >
                                                                Lihat Detail
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </div>
            )}
        </div>            {/* Footer */}
        {notifications.length > 0 && (
            <div className="border-t border-gray-700/50 bg-gray-800/50">
                <div className="px-3 sm:px-4 py-3">
                    <Link
                        to="/admin/notifications"
                        onClick={onClose}
                        className="block w-full text-center text-sm text-blue-400 hover:text-blue-300 font-medium truncate"
                    >
                        Lihat Semua Notifikasi
                    </Link>
                </div>                    {/* Clear All Section - Only show if ALL notifications are read (no unread notifications) */}
                {notifications.length > 0 && unreadCount === 0 && (
                    <div className="px-2 sm:px-3 py-2 border-t border-gray-700/50 bg-red-900/10">
                        <button
                            onClick={deleteAllNotifications}
                            className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 font-medium border border-red-700/50 hover:border-red-600/70"
                            title="Hapus semua notifikasi"
                        >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">Bersihkan Semua Notifikasi</span>
                        </button>
                    </div>
                )}
            </div>
        )}
    </div>
    );
};

export default AdminNotificationDropdown;
