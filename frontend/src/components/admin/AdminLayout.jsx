import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import {
    Home,
    Users,
    FileText,
    BarChart3,
    Settings,
    Menu,
    X,
    LogOut,
    Bell
} from 'lucide-react';
import { showInfoToast } from '../../utils/toastUtils';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Check if user is admin
    if (!user || user.role !== 'admin') {
        navigate('/login');
        return null;
    } const navigation = [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Content', href: '/admin/content', icon: FileText },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            showInfoToast('Logged out successfully');
            navigate('/');
        }
        setShowLogoutModal(false);
    };

    const LogoutModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to log out from admin panel?</p>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowLogoutModal(false)}
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen flex bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">NS</span>
                        </div>
                        <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
                    </div>                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            end={item.href === '/admin'}
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* User info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar}
                            alt={user.name}
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200 lg:static lg:overflow-y-visible">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative flex justify-between h-16">
                            <div className="flex items-center">                                <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                                <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">
                                    Admin Dashboard
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">                                {/* Notifications */}
                                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                                    <Bell className="h-6 w-6" />
                                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                                </button>

                                {/* Admin avatar */}
                                <div className="flex items-center">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-gray-100">
                    <div className="py-6">
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
