import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Users, FileText, BarChart3, Settings, Home } from 'lucide-react';

const AdminSearchDropdown = ({ isOpen, searchQuery, onClose }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Admin menu items untuk pencarian
    const adminMenuItems = [
        {
            id: 'dashboard',
            title: 'Dashboard Admin',
            description: 'Ringkasan dan statistik platform',
            href: '/admin',
            icon: Home,
            keywords: ['dashboard', 'beranda', 'ringkasan', 'statistik', 'overview']
        },
        {
            id: 'users',
            title: 'Manajemen Pengguna',
            description: 'Kelola akun pengguna dan peran',
            href: '/admin/users',
            icon: Users,
            keywords: ['pengguna', 'user', 'akun', 'member', 'roles', 'peran']
        },
        {
            id: 'content',
            title: 'Manajemen Konten',
            description: 'Moderasi catatan dan postingan',
            href: '/admin/content',
            icon: FileText,
            keywords: ['konten', 'catatan', 'notes', 'postingan', 'moderasi', 'review']
        },
        {
            id: 'analytics',
            title: 'Analitik Platform',
            description: 'Statistik dan laporan performa',
            href: '/admin/analytics',
            icon: BarChart3,
            keywords: ['analitik', 'analytics', 'statistik', 'laporan', 'performa', 'metrics']
        },
        {
            id: 'settings',
            title: 'Pengaturan Sistem',
            description: 'Konfigurasi platform dan keamanan',
            href: '/admin/settings',
            icon: Settings,
            keywords: ['pengaturan', 'settings', 'konfigurasi', 'config', 'sistem', 'keamanan']
        }
    ];

    // Quick actions untuk admin
    const quickActions = [
        {
            id: 'add-user',
            title: 'Tambah Pengguna Baru',
            description: 'Buat akun pengguna baru',
            action: () => console.log('Add user'),
            keywords: ['tambah', 'buat', 'pengguna', 'user', 'baru']
        },
        {
            id: 'export-data',
            title: 'Ekspor Data',
            description: 'Download laporan platform',
            action: () => console.log('Export data'),
            keywords: ['ekspor', 'export', 'download', 'laporan', 'data']
        },
        {
            id: 'system-backup',
            title: 'Backup Sistem',
            description: 'Backup database dan file',
            action: () => console.log('System backup'),
            keywords: ['backup', 'cadangan', 'database', 'sistem']
        }
    ];

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);

        // Simulate search delay
        const searchTimeout = setTimeout(() => {
            const query = searchQuery.toLowerCase();
            const results = [];

            // Search in menu items
            adminMenuItems.forEach(item => {
                const matchScore = calculateMatchScore(item, query);
                if (matchScore > 0) {
                    results.push({
                        ...item,
                        type: 'menu',
                        matchScore
                    });
                }
            });

            // Search in quick actions
            quickActions.forEach(item => {
                const matchScore = calculateMatchScore(item, query);
                if (matchScore > 0) {
                    results.push({
                        ...item,
                        type: 'action',
                        matchScore
                    });
                }
            });

            // Sort by match score
            results.sort((a, b) => b.matchScore - a.matchScore);

            setSearchResults(results.slice(0, 8));
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const calculateMatchScore = (item, query) => {
        let score = 0;

        // Check title match
        if (item.title.toLowerCase().includes(query)) {
            score += 100;
        }

        // Check description match
        if (item.description.toLowerCase().includes(query)) {
            score += 50;
        }

        // Check keywords match
        if (item.keywords?.some(keyword => keyword.includes(query))) {
            score += 75;
        }

        // Bonus for exact keyword match
        if (item.keywords?.some(keyword => keyword === query)) {
            score += 150;
        }

        return score;
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
            {isLoading ? (
                <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-sm text-gray-400 mt-2">Mencari...</p>
                </div>
            ) : searchResults.length === 0 && searchQuery.trim() ? (
                <div className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-white mb-1">Tidak ada hasil</h3>
                    <p className="text-xs text-gray-400">
                        Coba gunakan kata kunci yang berbeda
                    </p>
                </div>
            ) : searchResults.length > 0 ? (
                <div className="py-2">
                    {/* Menu Items */}
                    {searchResults.filter(item => item.type === 'menu').length > 0 && (
                        <div className="mb-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700/50">
                                Menu Admin
                            </div>
                            {searchResults.filter(item => item.type === 'menu').map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-700/30 transition-colors"
                                    onClick={onClose}
                                >
                                    <div className="p-2 bg-blue-900/30 rounded-lg">
                                        <item.icon className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Quick Actions */}
                    {searchResults.filter(item => item.type === 'action').length > 0 && (
                        <div className="mb-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700/50">
                                Aksi Cepat
                            </div>
                            {searchResults.filter(item => item.type === 'action').map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        item.action();
                                        onClose();
                                    }}
                                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-700/30 transition-colors text-left"
                                >
                                    <div className="p-2 bg-purple-900/30 rounded-lg">
                                        <Settings className="h-4 w-4 text-purple-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : searchQuery.trim() === '' ? (
                <div className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-white mb-1">Cari di panel admin</h3>
                    <p className="text-xs text-gray-400">
                        Ketik untuk mencari menu, pengaturan, atau aksi
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default AdminSearchDropdown;
