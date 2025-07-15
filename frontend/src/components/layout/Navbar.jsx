import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { showSearchToast } from '../../utils/toastUtils';
import {
    BookOpen,
    Home,
    Upload,
    MessageSquare,
    User,
    Search,
    Bell,
    Menu,
    X,
    Star,
    TrendingUp,
    Settings,
    LogOut,
    ChevronDown
} from 'lucide-react';
import { Button, Avatar, Badge, ConfirmationModal, SearchDropdown } from '../ui';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const { user, logout, loading: authLoading } = useAuth();

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Browse Notes', href: '/notes', icon: BookOpen },
        { name: 'Upload', href: '/upload', icon: Upload },
        { name: 'Forum', href: '/forum', icon: MessageSquare },
        { name: 'Leaderboard', href: '/leaderboard', icon: TrendingUp }
    ]; const isActive = (path) => location.pathname === path; const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            setShowLogoutModal(false);
            setIsProfileMenuOpen(false);
        }
    }; const handleSearchNavigation = (query) => {
        if (query.trim()) {
            showSearchToast(query);
            setIsSearchOpen(false);
            setIsMobileMenuOpen(false);
            window.location.href = `/notes?search=${encodeURIComponent(query)}`;
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
                setIsProfileMenuOpen(false);
            }
            if (isSearchOpen && !event.target.closest('.search-container')) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileMenuOpen, isSearchOpen]); return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Hanken_Grotesk'] ${scrolled
            ? 'backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-md shadow-gray-200/20'
            : 'backdrop-blur-lg bg-white/60 border-b border-white/10'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="relative">                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group- transition-all duration-300 group-hover:scale-110">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-300"></div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                NoteShare
                            </span>
                        </Link>

                        <div className="hidden lg:ml-10 lg:flex lg:space-x-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 text-nowrap ${isActive(item.href)
                                            ? 'text-blue-600 bg-blue-50/50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/50'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                        {item.name}
                                        {isActive(item.href) && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>                    {/* Search and User Menu */}
                    <div className="flex items-center space-x-2 lg:space-x-4">                        {/* Search Bar */}
                        <div className="hidden md:block relative search-container">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-900" />
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            window.location.href = `/notes?search=${encodeURIComponent(searchQuery)}`;
                                        }
                                    }}
                                    className="pl-10 pr-4 py-2.5 w-40 lg:w-44 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/70" />
                            </div>
                            <SearchDropdown
                                isOpen={isSearchOpen}
                                searchQuery={searchQuery}
                                onClose={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                            />
                        </div>{/* Notifications */}
                        <button className="relative p-2 lg:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-300 group">
                            <Bell className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 lg:h-5 lg:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-medium">
                                3
                            </span>
                        </button>{/* User Menu */}                        {user ? (
                            <div className="relative profile-menu-container"><button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-xl hover:bg-gray-50/50 transition-all duration-300 group"
                            >                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-20 md:max-w-24 lg:max-w-none">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.points || 0} points</p>
                                </div>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    size="md"
                                    initials={user.name?.split(' ').map(n => n[0]).join('')}
                                    className="ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                                />
                                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 hidden lg:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                            </button>                                {/* Profile Dropdown */}                                {isProfileMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 py-2 z-[100]"
                                    data-aos="fade-down"
                                    data-aos-duration="200"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <User className="h-4 w-4 mr-3" />
                                        Profile
                                    </Link>                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >                                            <Settings className="h-4 w-4 mr-3" />
                                        Settings
                                    </Link>
                                    <Link
                                        to="/favorites"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <Star className="h-4 w-4 mr-3" />
                                        My Favorites
                                    </Link>
                                    <hr className="my-2 border-gray-100" /><button
                                        onClick={() => {
                                            setIsProfileMenuOpen(false);
                                            setShowLogoutModal(true);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4 mr-3" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm" className="font-medium min-w-fit">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-300"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">                        {/* Mobile Search */}
                        <div className="mb-4 md:hidden search-container relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            window.location.href = `/notes?search=${encodeURIComponent(searchQuery)}`;
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" />
                            </div>
                            <SearchDropdown
                                isOpen={isSearchOpen}
                                searchQuery={searchQuery}
                                onClose={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                            />
                        </div>

                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${isActive(item.href)
                                        ? 'text-blue-600 bg-blue-50/50'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Konfirmasi Logout"
                message="Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login kembali untuk mengakses fitur platform."
                type="warning"
                confirmText="Ya, Logout"
                cancelText="Batal"
                loading={authLoading}
            />
        </nav>
    );
};

export default Navbar;


