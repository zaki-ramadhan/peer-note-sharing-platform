import { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '@contexts/AuthContext';
import {
    Home,
    Users,
    FileText,
    BarChart3,
    Settings,
    Menu,
    X,
    LogOut,
    Bell,
    Search,
    Moon,
    Sun,
    ChevronDown,
    Shield,
    AlertTriangle,
    HardDrive,
    Key,
    Mail,
    Activity,
    CheckSquare,
    FileCheck,
    Package
} from 'lucide-react';
import { showInfoToast } from '@utils/toastUtils';
import AdminSearchDropdown from './AdminSearchDropdown';
import AdminNotificationDropdown from './AdminNotificationDropdown';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(false); const [searchQuery, setSearchQuery] = useState('');
    const [unreadNotifications, setUnreadNotifications] = useState(0); // Dynamic unread count
    const { user, logout } = useAuth();
    const navigate = useNavigate();    // Handle unread count changes from notification dropdown
    const handleUnreadCountChange = useCallback((count) => {
        setUnreadNotifications(count);
    }, []);

    // Initialize unread count on component mount
    useEffect(() => {
        // This will be set by the AdminNotificationDropdown when it initializes
        setUnreadNotifications(3); // Default count until dropdown initializes
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close search dropdown
            if (showSearchDropdown && !event.target.closest('.search-container')) {
                setShowSearchDropdown(false);
            }
            // Close notification dropdown
            if (showNotificationDropdown && !event.target.closest('.notification-container')) {
                setShowNotificationDropdown(false);
            }
            // Close user dropdown
            if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearchDropdown, showNotificationDropdown, showUserDropdown]);

    // Check if user is admin
    if (!user || user.role !== 'admin') {
        navigate('/login');
        return null;
    } const navigation = [
        {
            name: 'Dashboard',
            href: '/admin',
            icon: Home,
            description: 'Ringkasan dan statistik cepat'
        },
        {
            name: 'Pengguna',
            href: '/admin/users',
            icon: Users,
            description: 'Kelola akun pengguna'
        },
        {
            name: 'Konten',
            href: '/admin/content',
            icon: FileText,
            description: 'Tinjau catatan dan postingan'
        },
        {
            name: 'Laporan',
            href: '/admin/reports',
            icon: AlertTriangle,
            description: 'Kelola laporan pengguna'
        },
        {
            name: 'Analitik',
            href: '/admin/analytics',
            icon: BarChart3,
            description: 'Statistik platform'
        },
        {
            name: 'Notifikasi',
            href: '/admin/notifications',
            icon: Bell,
            description: 'Kelola notifikasi admin'
        },
        {
            name: 'Pengaturan',
            href: '/admin/settings',
            icon: Settings,
            description: 'Konfigurasi sistem'
        },
    ]; const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            showInfoToast('Berhasil keluar');
            navigate('/');
        }
        setShowLogoutModal(false);
    };

    const LogoutModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all border border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-900/30 rounded-full border border-red-600/30">
                        <LogOut className="w-8 h-8 text-red-400" />
                    </div>                    <h3 className="text-xl font-bold text-white text-center mb-2">
                        Konfirmasi Keluar
                    </h3>
                    <p className="text-gray-300 text-center mb-6">
                        Apakah Anda yakin ingin keluar dari panel admin? Anda perlu masuk kembali untuk mengakses fitur admin.
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="flex-1 px-4 py-3 text-gray-300 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-600/50 focus:ring-4 focus:ring-gray-600/25 transition-all duration-200 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-500/25 transition-all duration-200 font-medium"
                        >
                            Ya, Keluar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ); return (
        <div className="h-screen flex bg-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                </div>
            )}
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full overflow-hidden'
                }`}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-3">                            <span className="text-xl font-bold text-white">Panel Admin</span>
                            <p className="text-xs text-slate-400">Konsol Manajemen</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className='nav-wrp max-h-[65%] overflow-y-auto'>
                    <nav className="mt-8 px-4 space-y-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                end={item.href === '/admin'}
                                className={({ isActive }) =>
                                    `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                <div className="flex-1">
                                    <div>{item.name}</div>
                                    <div className="text-xs opacity-75 hidden sm:block">{item.description}</div>
                                </div>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* User info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <div className="flex items-center mb-4 p-3 rounded-xl bg-slate-800/50">
                        <img
                            className="h-10 w-10 rounded-full ring-2 ring-blue-500"
                            src={user.avatar}
                            alt={user.name}
                        />
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-slate-400 capitalize flex items-center">
                                <Shield className="w-3 h-3 mr-1" />
                                {user.role}
                            </p>
                        </div>
                    </div>                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-all duration-200 group"
                    >
                        <LogOut className="mr-3 h-5 w-5 group-hover:text-red-400 transition-colors" />
                        Keluar
                    </button>
                </div>
            </div>
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Top navigation */}
                <header className="bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700/50 lg:static lg:overflow-y-visible z-50">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative flex justify-between items-center h-20">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-3 rounded-xl text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 transition-all duration-200 shadow-sm"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                                <div className="ml-4 lg:ml-0">                                    <h1 className=" md:text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                                    Dashboard Admin
                                </h1>
                                    <p className="text-sm text-gray-400 hidden sm:block">
                                        Kelola platform Anda dengan efisien
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Search Bar */}
                                <div className="hidden md:block relative search-container">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-4 text-gray-200" />
                                    <input
                                        type="text"
                                        placeholder="Cari panel admin..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setShowSearchDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                                        className="pl-11 pr-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 text-sm bg-gray-700/50 backdrop-blur-sm shadow-sm text-white placeholder-gray-400"
                                    />
                                    <AdminSearchDropdown
                                        isOpen={showSearchDropdown}
                                        searchQuery={searchQuery}
                                        onClose={() => {
                                            setShowSearchDropdown(false);
                                            setSearchQuery('');
                                        }}
                                    />
                                </div>

                                {/* Notifications */}
                                <div className="relative notification-container">
                                    <button
                                        onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                                        className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors relative"
                                    >
                                        <Bell className="h-5 w-5" />
                                        {unreadNotifications > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-gray-800">
                                                {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                            </span>
                                        )}
                                    </button>                                    <AdminNotificationDropdown
                                        isOpen={showNotificationDropdown}
                                        onClose={() => setShowNotificationDropdown(false)}
                                        onUnreadCountChange={handleUnreadCountChange}
                                    />
                                </div>

                                {/* Theme toggle */}
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>                                {/* Admin avatar with dropdown */}
                                <div className="relative user-dropdown-container">
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full ring-2 ring-blue-500"
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </button>                                    {/* User dropdown menu */}
                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-1 z-50">
                                            <div className="px-4 py-2 border-b border-gray-700/50">
                                                <p className="text-sm font-medium text-white">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setShowUserDropdown(false);
                                                    setShowLogoutModal(true);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 flex items-center transition-colors"
                                            >                                                <LogOut className="h-4 w-4 mr-2" />
                                                Keluar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 to-gray-900">
                    <div className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && <LogoutModal />}
        </div>
    );
};

export default AdminLayout;
