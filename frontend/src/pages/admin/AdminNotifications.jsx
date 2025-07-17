import { useState, useEffect } from 'react';
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
    Filter,
    Search,
    MoreVertical,
    Calendar,
    Check,
    Trash2,
    Mail
} from 'lucide-react';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNotifications, setSelectedNotifications] = useState([]);

    // Generate comprehensive admin notifications
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
                message: 'Backup otomatis database telah selesai dengan ukuran 2.3GB',
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
            },
            {
                id: 7,
                type: 'user_registration',
                title: 'Lonjakan Pendaftaran',
                message: 'Terjadi peningkatan 200% pendaftaran pengguna baru hari ini',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                isRead: true,
                priority: 'medium',
                icon: UserPlus,
                action: '/admin/analytics',
                data: { increase: '200%' }
            },
            {
                id: 8,
                type: 'content_report',
                title: 'Laporan Spam Meningkat',
                message: '15 laporan spam diterima dalam 24 jam terakhir',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                isRead: false,
                priority: 'high',
                icon: AlertTriangle,
                action: '/admin/content',
                data: { count: 15 }
            },
            {
                id: 9,
                type: 'system_alert',
                title: 'Maintenance Terjadwal',
                message: 'Maintenance server dijadwalkan besok pukul 02:00 WIB',
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                isRead: true,
                priority: 'medium',
                icon: Settings,
                action: '/admin/settings',
                data: { scheduledTime: '02:00 WIB' }
            },
            {
                id: 10,
                type: 'security',
                title: 'Aktivitas Mencurigakan',
                message: 'Terdeteksi aktivitas login mencurigakan dari berbagai negara',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                isRead: true,
                priority: 'high',
                icon: Shield,
                action: '/admin/settings',
                data: { countries: ['US', 'RU', 'CN'] }
            }
        ];

        setNotifications(adminNotifications);
        setFilteredNotifications(adminNotifications);
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = notifications;

        // Apply filter
        if (selectedFilter !== 'all') {
            if (selectedFilter === 'unread') {
                filtered = filtered.filter(n => !n.isRead);
            } else if (selectedFilter === 'read') {
                filtered = filtered.filter(n => n.isRead);
            } else if (selectedFilter === 'priority') {
                filtered = filtered.filter(n => n.priority === 'high');
            } else {
                filtered = filtered.filter(n => n.type === selectedFilter);
            }
        }

        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(n =>
                n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.message.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredNotifications(filtered);
    }, [notifications, selectedFilter, searchQuery]);

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
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'user_registration': return 'Pendaftaran';
            case 'content_report': return 'Laporan';
            case 'system_alert': return 'Sistem';
            case 'security': return 'Keamanan';
            case 'content_pending': return 'Konten';
            case 'system_update': return 'Update';
            default: return 'Lainnya';
        }
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev => prev.map(notification =>
            notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
        ));
    };

    const markAsUnread = (notificationId) => {
        setNotifications(prev => prev.map(notification =>
            notification.id === notificationId
                ? { ...notification, isRead: false }
                : notification
        ));
    };

    const deleteNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        setSelectedNotifications(prev => prev.filter(id => id !== notificationId));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    };

    const deleteSelected = () => {
        setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
        setSelectedNotifications([]);
    };

    const handleSelectNotification = (notificationId) => {
        setSelectedNotifications(prev =>
            prev.includes(notificationId)
                ? prev.filter(id => id !== notificationId)
                : [...prev, notificationId]
        );
    };

    const handleSelectAll = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(n => n.id));
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;

    const filterOptions = [
        { id: 'all', label: 'Semua', count: notifications.length },
        { id: 'unread', label: 'Belum Dibaca', count: unreadCount },
        { id: 'read', label: 'Sudah Dibaca', count: notifications.length - unreadCount },
        { id: 'priority', label: 'Prioritas Tinggi', count: highPriorityCount },
        { id: 'user_registration', label: 'Pendaftaran', count: notifications.filter(n => n.type === 'user_registration').length },
        { id: 'content_report', label: 'Laporan', count: notifications.filter(n => n.type === 'content_report').length },
        { id: 'security', label: 'Keamanan', count: notifications.filter(n => n.type === 'security').length },
        { id: 'system_alert', label: 'Sistem', count: notifications.filter(n => n.type === 'system_alert').length }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Notifikasi Admin
                    </h2>                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 text-sm text-gray-400">
                        <div className="flex items-center">
                            <Bell className="mr-1.5 h-4 w-4 flex-shrink-0" />
                            <span className="truncate">
                                {unreadCount} belum dibaca dari {notifications.length} total notifikasi
                            </span>
                        </div>
                        {highPriorityCount > 0 && (
                            <div className="flex items-center sm:ml-2">
                                <span className="hidden sm:inline mx-2">•</span>
                                <AlertTriangle className="mr-1.5 h-4 w-4 flex-shrink-0 text-red-400" />
                                <span className="text-red-400 truncate">{highPriorityCount} prioritas tinggi</span>
                            </div>
                        )}
                    </div>
                </div>                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:ml-4">
                    {selectedNotifications.length > 0 && (
                        <button
                            onClick={deleteSelected}
                            className="inline-flex items-center px-4 py-2 border border-red-600 rounded-xl text-sm font-medium text-red-400 bg-red-900/20 hover:bg-red-900/30 focus:ring-2 focus:ring-red-500 transition-all duration-200"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus Terpilih ({selectedNotifications.length})
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={() => {
                                setNotifications([]);
                                setSelectedNotifications([]);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-red-600 rounded-xl text-sm font-medium text-red-400 bg-red-900/20 hover:bg-red-900/30 focus:ring-2 focus:ring-red-500 transition-all duration-200"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus Semua
                        </button>
                    )}
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-xl text-sm font-medium text-blue-400 bg-blue-900/20 hover:bg-blue-900/30 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Tandai Semua Dibaca
                        </button>
                    )}
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Cari Notifikasi
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari judul atau pesan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white text-sm placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Filter Notifikasi
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedFilter(option.id)}
                                    className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${selectedFilter === option.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                                        }`}
                                >
                                    {option.label}
                                    <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                                        {option.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl border border-gray-700/50">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                                onChange={handleSelectAll}
                                className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-300">
                                {filteredNotifications.length} notifikasi
                            </span>
                        </div>
                        <div className="text-xs text-gray-400">
                            Menampilkan {filteredNotifications.length} dari {notifications.length}
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="divide-y divide-gray-700/50">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-12 text-center">
                            <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">Tidak ada notifikasi</h3>
                            <p className="text-gray-400">
                                {searchQuery ? 'Tidak ada notifikasi yang cocok dengan pencarian.' : 'Belum ada notifikasi untuk ditampilkan.'}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <div
                                    key={notification.id}
                                    className={`group relative px-6 py-4 hover:bg-gray-700/30 transition-colors ${!notification.isRead ? 'bg-gray-700/20' : ''
                                        } ${selectedNotifications.includes(notification.id) ? 'bg-blue-900/20' : ''
                                        }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        {/* Checkbox */}
                                        <input
                                            type="checkbox"
                                            checked={selectedNotifications.includes(notification.id)}
                                            onChange={() => handleSelectNotification(notification.id)}
                                            className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                        />

                                        {/* Icon */}
                                        <div className={`flex-shrink-0 p-2 rounded-lg border ${getPriorityColor(notification.priority)}`}>
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-white' : 'text-gray-300'
                                                            }`}>
                                                            {notification.title}
                                                        </h4>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${notification.priority === 'high'
                                                            ? 'bg-red-900/50 text-red-300 border border-red-600/30'
                                                            : notification.priority === 'medium'
                                                                ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-600/30'
                                                                : 'bg-green-900/50 text-green-300 border border-green-600/30'
                                                            }`}>
                                                            {getTypeLabel(notification.type)}
                                                        </span>
                                                        {!notification.isRead && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{formatTimeAgo(notification.timestamp)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{notification.timestamp.toLocaleDateString('id-ID')}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {!notification.isRead ? (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-1 text-blue-400 hover:text-blue-300 rounded"
                                                            title="Tandai sebagai dibaca"
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </button>
                                                    ) : (<button
                                                        onClick={() => markAsUnread(notification.id)}
                                                        className="p-1 text-gray-400 hover:text-gray-300 rounded"
                                                        title="Tandai sebagai belum dibaca"
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                    </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-1 text-red-400 hover:text-red-300 rounded"
                                                        title="Hapus notifikasi"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {notification.action && (
                                                <div className="mt-3">
                                                    <a
                                                        href={notification.action}
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 font-medium"
                                                    >
                                                        Lihat Detail
                                                        <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Footer Statistics */}
            {filteredNotifications.length > 0 && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">{notifications.length}</div>
                            <div className="text-xs text-gray-400">Total</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-400">{unreadCount}</div>
                            <div className="text-xs text-gray-400">Belum Dibaca</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-400">{highPriorityCount}</div>
                            <div className="text-xs text-gray-400">Prioritas Tinggi</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">
                                {notifications.filter(n => n.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                            </div>
                            <div className="text-xs text-gray-400">24 Jam Terakhir</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNotifications;
