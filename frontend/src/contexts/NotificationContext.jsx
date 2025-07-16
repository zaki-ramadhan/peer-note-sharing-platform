import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Load notifications from localStorage on mount
    useEffect(() => {
        try {
            const savedNotifications = localStorage.getItem('userNotifications');
            if (savedNotifications) {
                const parsed = JSON.parse(savedNotifications);
                setNotifications(parsed);
                setUnreadCount(parsed.filter(n => !n.read).length);
            } else {
                // Initialize with some demo notifications
                const demoNotifications = [{
                    id: '1',
                    type: 'download',
                    title: 'Catatan Diunduh',
                    message: 'Unduhan Anda untuk "Pengantar Kalkulus" telah selesai',
                    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
                    read: false,
                    icon: '📥'
                },
                {
                    id: '2',
                    type: 'rating',
                    title: 'Penilaian Baru',
                    message: 'Seseorang menilai catatan Anda "Lembar Rumus Fisika" dengan 5 bintang!',
                    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                    read: false,
                    icon: '⭐'
                },
                {
                    id: '3',
                    type: 'favorite',
                    title: 'Catatan Difavoritkan',
                    message: 'Catatan Anda "Laporan Lab Kimia" ditambahkan ke favorit',
                    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                    read: true,
                    icon: '❤️'
                }
                ];
                setNotifications(demoNotifications);
                setUnreadCount(demoNotifications.filter(n => !n.read).length);
            }
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }, []);

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('userNotifications', JSON.stringify(notifications));
        } catch (error) {
            console.error('Error saving notifications:', error);
        }
    }, [notifications]);

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            read: false,
            ...notification
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only 50 latest
        setUnreadCount(prev => prev + 1);
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
        setUnreadCount(0);
    };

    const clearNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        const notification = notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    }; const value = {
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications
    };

    // Make notification context available globally for utility functions  
    useEffect(() => {
        window.notificationContext = value;
        return () => {
            window.notificationContext = null;
        };
    });

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
