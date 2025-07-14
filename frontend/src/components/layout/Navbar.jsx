import { useState } from 'react';
import { Link, useLocation } from 'react-router';
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
    TrendingUp
} from 'lucide-react';
import { Button, Avatar, Badge } from '../ui';

const Navbar = ({ user }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Upload Note', href: '/upload', icon: Upload },
        { name: 'Forum', href: '/forum', icon: MessageSquare },
        { name: 'Leaderboard', href: '/leaderboard', icon: TrendingUp }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">NoteShare</span>
                        </Link>

                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search and User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="hidden md:block relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search notes..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell className="h-5 w-5" />
                            <Badge variant="danger" size="sm" className="absolute -top-1 -right-1 h-5 w-5 text-xs">
                                3
                            </Badge>
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.points} points</p>
                                </div>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    initials={user.name?.split(' ').map(n => n[0]).join('')}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button variant="ghost" size="sm">
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button size="sm">
                                    <Link to="/register">Sign Up</Link>
                                </Button>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden p-2 text-gray-400 hover:text-gray-600"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="sm:hidden border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* Mobile Search */}
                        <div className="px-3 py-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${isActive(item.href)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
