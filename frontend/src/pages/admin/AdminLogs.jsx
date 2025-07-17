import { useState, useEffect } from 'react';
import {
    Activity,
    Search,
    Filter,
    Download,
    Calendar,
    User,
    Shield,
    AlertTriangle,
    Info,
    CheckCircle,
    XCircle,
    Clock,
    Database,
    Server,
    Globe
} from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';

/*
STANDARD DROPDOWN STYLING PATTERN (AdminAnalytics Style):
- itemTemplate with: "flex items-center py-1 text-white rounded-lg transition-colors text-sm"
- valueTemplate with: "flex items-center text-white text-sm"
- pt.root: "bg-gray-700/50 border border-gray-600 rounded-md text-white min-h-[38px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm flex items-center"
- pt.input: "text-white bg-transparent px-3 h-full w-full text-sm flex items-center"
- pt.trigger: "text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center"
- pt.panel: "bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl mt-1 z-50"
- pt.wrapper: "max-h-48 overflow-y-auto"
- pt.item: "text-white hover:bg-gray-700/50 px-3 py-2 cursor-pointer transition-colors border-none text-sm"
*/

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [dateRange, setDateRange] = useState('today');

    // Dropdown options
    const levelOptions = [
        { label: 'Semua Level', value: 'all' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Debug', value: 'debug' }
    ];

    const categoryOptions = [
        { label: 'Semua Kategori', value: 'all' },
        { label: 'Autentikasi', value: 'auth' },
        { label: 'Sistem', value: 'system' },
        { label: 'Database', value: 'database' },
        { label: 'API', value: 'api' },
        { label: 'Keamanan', value: 'security' },
        { label: 'Pengguna', value: 'user' }
    ];

    const dateRangeOptions = [
        { label: 'Hari Ini', value: 'today' },
        { label: '7 Hari Terakhir', value: '7days' },
        { label: '30 Hari Terakhir', value: '30days' },
        { label: 'Semua', value: 'all' }
    ];

    useEffect(() => {
        // Mock data for system logs
        const mockLogs = [
            {
                id: 1,
                timestamp: new Date(Date.now() - 5 * 60 * 1000),
                level: 'info',
                category: 'auth',
                message: 'User login successful',
                details: 'User admin@peernote.com logged in successfully',
                userId: 'admin@peernote.com',
                ip: '192.168.1.100',
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            {
                id: 2,
                timestamp: new Date(Date.now() - 15 * 60 * 1000),
                level: 'warning',
                category: 'security',
                message: 'Multiple failed login attempts',
                details: '5 failed login attempts from IP 192.168.1.200',
                userId: null,
                ip: '192.168.1.200',
                userAgent: 'curl/7.68.0'
            },
            {
                id: 3,
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                level: 'error',
                category: 'database',
                message: 'Database connection timeout',
                details: 'Connection to database timed out after 30 seconds',
                userId: null,
                ip: 'localhost',
                userAgent: 'Server Process'
            },
            {
                id: 4,
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                level: 'info',
                category: 'system',
                message: 'System backup completed',
                details: 'Automated system backup completed successfully (2.3GB)',
                userId: 'system',
                ip: 'localhost',
                userAgent: 'Backup Service'
            },
            {
                id: 5,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                level: 'debug',
                category: 'api',
                message: 'API rate limit exceeded',
                details: 'API rate limit exceeded for endpoint /api/notes',
                userId: 'user@example.com',
                ip: '192.168.1.150',
                userAgent: 'PostmanRuntime/7.28.4'
            }
        ];

        setLogs(mockLogs);
        setFilteredLogs(mockLogs);
    }, []);

    // Filter logs
    useEffect(() => {
        let filtered = logs;

        if (searchTerm) {
            filtered = filtered.filter(log =>
                log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (levelFilter !== 'all') {
            filtered = filtered.filter(log => log.level === levelFilter);
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(log => log.category === categoryFilter);
        }

        // Apply date range filter
        if (dateRange !== 'all') {
            const now = new Date();
            let cutoffDate;

            switch (dateRange) {
                case 'today':
                    cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case '7days':
                    cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case '30days':
                    cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    cutoffDate = new Date(0);
            }

            filtered = filtered.filter(log => log.timestamp >= cutoffDate);
        }

        setFilteredLogs(filtered);
    }, [logs, searchTerm, levelFilter, categoryFilter, dateRange]);

    const getLevelColor = (level) => {
        switch (level) {
            case 'error':
                return 'bg-red-900/50 text-red-300 border border-red-600/30';
            case 'warning':
                return 'bg-yellow-900/50 text-yellow-300 border border-yellow-600/30';
            case 'info':
                return 'bg-blue-900/50 text-blue-300 border border-blue-600/30';
            case 'debug':
                return 'bg-gray-900/50 text-gray-300 border border-gray-600/30';
            default:
                return 'bg-gray-800/50 text-gray-300 border border-gray-600/30';
        }
    };

    const getLevelIcon = (level) => {
        switch (level) {
            case 'error':
                return <XCircle className="h-4 w-4 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
            case 'info':
                return <Info className="h-4 w-4 text-blue-400" />;
            case 'debug':
                return <CheckCircle className="h-4 w-4 text-gray-400" />;
            default:
                return <Info className="h-4 w-4 text-gray-400" />;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'auth':
                return <User className="h-4 w-4" />;
            case 'security':
                return <Shield className="h-4 w-4" />;
            case 'database':
                return <Database className="h-4 w-4" />;
            case 'system':
                return <Server className="h-4 w-4" />;
            case 'api':
                return <Globe className="h-4 w-4" />;
            default:
                return <Activity className="h-4 w-4" />;
        }
    };

    const formatTimestamp = (timestamp) => {
        return timestamp.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const exportLogs = () => {
        // In a real application, this would trigger a download
        console.log('Exporting logs...', filteredLogs);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Log Sistem
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Monitor aktivitas sistem dan jejak audit.
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        onClick={exportLogs}
                        className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Ekspor Log
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari log..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white text-sm placeholder-gray-400"
                        />
                    </div>

                    {/* Level Filter */}
                    <Dropdown
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.value)}
                        options={levelOptions}
                        placeholder="Semua Level"
                        className="w-full"
                        itemTemplate={(option) => (
                            <div className="flex items-center py-1 text-white rounded-lg transition-colors text-sm">
                                {option.label}
                            </div>
                        )}
                        valueTemplate={(option) => (
                            <div className="flex items-center text-white text-sm">
                                {option ? option.label : 'Semua Level'}
                            </div>
                        )}
                        pt={{
                            root: {
                                className: 'bg-gray-700/50 border border-gray-600 rounded-md text-white min-h-[38px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm flex items-center'
                            },
                            input: {
                                className: 'text-white bg-transparent px-3 h-full w-full text-sm flex items-center'
                            },
                            trigger: {
                                className: 'text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center'
                            },
                            panel: {
                                className: 'bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl mt-1 z-50'
                            },
                            wrapper: {
                                className: 'max-h-48 overflow-y-auto'
                            },
                            item: {
                                className: 'text-white hover:bg-gray-700/50 px-3 py-2 cursor-pointer transition-colors border-none text-sm'
                            }
                        }}
                    />

                    {/* Category Filter */}
                    <Dropdown
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.value)}
                        options={categoryOptions}
                        placeholder="Semua Kategori"
                        className="w-full"
                        itemTemplate={(option) => (
                            <div className="flex items-center py-1 text-white rounded-lg transition-colors text-sm">
                                {option.label}
                            </div>
                        )}
                        valueTemplate={(option) => (
                            <div className="flex items-center text-white text-sm">
                                {option ? option.label : 'Semua Kategori'}
                            </div>
                        )}
                        pt={{
                            root: {
                                className: 'bg-gray-700/50 border border-gray-600 rounded-md text-white min-h-[38px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm flex items-center'
                            },
                            input: {
                                className: 'text-white bg-transparent px-3 h-full w-full text-sm flex items-center'
                            },
                            trigger: {
                                className: 'text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center'
                            },
                            panel: {
                                className: 'bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl mt-1 z-50'
                            },
                            wrapper: {
                                className: 'max-h-48 overflow-y-auto'
                            },
                            item: {
                                className: 'text-white hover:bg-gray-700/50 px-3 py-2 cursor-pointer transition-colors border-none text-sm'
                            }
                        }}
                    />

                    {/* Date Range Filter */}
                    <Dropdown
                        value={dateRange}
                        onChange={(e) => setDateRange(e.value)}
                        options={dateRangeOptions}
                        placeholder="Pilih Rentang"
                        className="w-full"
                        itemTemplate={(option) => (
                            <div className="flex items-center py-1 text-white rounded-lg transition-colors text-sm">
                                {option.label}
                            </div>
                        )}
                        valueTemplate={(option) => (
                            <div className="flex items-center text-white text-sm">
                                {option ? option.label : 'Pilih Rentang'}
                            </div>
                        )}
                        pt={{
                            root: {
                                className: 'bg-gray-700/50 border border-gray-600 rounded-md text-white min-h-[38px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm flex items-center'
                            },
                            input: {
                                className: 'text-white bg-transparent px-3 h-full w-full text-sm flex items-center'
                            },
                            trigger: {
                                className: 'text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center'
                            },
                            panel: {
                                className: 'bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl mt-1 z-50'
                            },
                            wrapper: {
                                className: 'max-h-48 overflow-y-auto'
                            },
                            item: {
                                className: 'text-white hover:bg-gray-700/50 px-3 py-2 cursor-pointer transition-colors border-none text-sm'
                            }
                        }}
                    />

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setLevelFilter('all');
                            setCategoryFilter('all');
                            setDateRange('today');
                        }}
                        className="inline-flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Reset
                    </button>
                </div>
            </div>            {/* Logs Table */}
            <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-700/50">
                <div className="admin-table-container overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700/50">                        <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden-mobile">
                                Kategori
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Pesan
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden-mobile">
                                Pengguna
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden-mobile">
                                IP Address
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Waktu
                            </th>
                        </tr>
                    </thead>                        <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-700/30">
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap" data-label="Level">
                                        <div className="flex items-center">
                                            {getLevelIcon(log.level)}
                                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                                                {log.level.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden-mobile" data-label="Kategori">
                                        <div className="flex items-center text-sm text-gray-300">
                                            {getCategoryIcon(log.category)}
                                            <span className="ml-2 capitalize">{log.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4" data-label="Pesan">
                                        <div className="text-sm">
                                            <div className="font-medium text-white">{log.message}</div>
                                            <div className="text-gray-400 text-xs mt-1 max-w-md truncate">
                                                {log.details}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden-mobile" data-label="Pengguna">
                                        {log.userId || 'N/A'}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden-mobile" data-label="IP Address">
                                        {log.ip}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300" data-label="Waktu">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                            {formatTimestamp(log.timestamp)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Tidak ada log yang ditemukan sesuai kriteria Anda.</p>
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-red-900/50 rounded-lg flex items-center justify-center border border-red-600/30">
                                <XCircle className="h-5 w-5 text-red-400" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Error</p>
                            <p className="text-2xl font-semibold text-white">
                                {logs.filter(log => log.level === 'error').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-900/50 rounded-lg flex items-center justify-center border border-yellow-600/30">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Warning</p>
                            <p className="text-2xl font-semibold text-white">
                                {logs.filter(log => log.level === 'warning').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-900/50 rounded-lg flex items-center justify-center border border-blue-600/30">
                                <Info className="h-5 w-5 text-blue-400" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Info</p>
                            <p className="text-2xl font-semibold text-white">
                                {logs.filter(log => log.level === 'info').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center border border-green-600/30">
                                <Activity className="h-5 w-5 text-green-400" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Total Log</p>
                            <p className="text-2xl font-semibold text-white">
                                {logs.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogs;
