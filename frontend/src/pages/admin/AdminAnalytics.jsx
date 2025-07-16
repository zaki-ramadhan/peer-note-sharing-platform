/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
    BarChart3,
    Users,
    FileText,
    TrendingUp,
    TrendingDown,
    Calendar,
    Search,
    Filter,
    Download,
    Star,
    Award
} from 'lucide-react';

const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    const analyticsData = {
        userGrowth: {
            current: 1250,
            previous: 1180,
            change: 5.9,
            trend: 'up'
        },
        notesShared: {
            current: 4830,
            previous: 4650,
            change: 3.9,
            trend: 'up'
        },
        forumPosts: {
            current: 892,
            previous: 920,
            change: -3.0,
            trend: 'down'
        },
        engagement: {
            current: 68.5,
            previous: 65.2,
            change: 5.1,
            trend: 'up'
        }
    };

    const chartData = [
        { date: '2024-01-08', users: 45, notes: 23, posts: 12 },
        { date: '2024-01-09', users: 52, notes: 28, posts: 15 },
        { date: '2024-01-10', users: 48, notes: 31, posts: 18 },
        { date: '2024-01-11', users: 61, notes: 25, posts: 14 },
        { date: '2024-01-12', users: 55, notes: 35, posts: 20 },
        { date: '2024-01-13', users: 67, notes: 42, posts: 22 },
        { date: '2024-01-14', users: 73, notes: 38, posts: 19 }
    ];

    const topContent = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            author: 'Mike Chen',
            downloads: 342,
            subject: 'Computer Science',
            rating: 4.9
        },
        {
            id: 2,
            title: 'Database Design Fundamentals',
            author: 'Sarah Johnson',
            downloads: 298,
            subject: 'Information Systems',
            rating: 4.8
        },
        {
            id: 3,
            title: 'Calculus Integration Guide',
            author: 'John Doe',
            downloads: 267,
            subject: 'Mathematics',
            rating: 4.7
        },
        {
            id: 4,
            title: 'Physics Lab Reports',
            author: 'Emma Davis',
            downloads: 234,
            subject: 'Physics',
            rating: 4.6
        },
        {
            id: 5,
            title: 'Machine Learning Basics',
            author: 'Alex Wilson',
            downloads: 198,
            subject: 'Computer Science',
            rating: 4.8
        }
    ];

    const topUsers = [
        {
            id: 1,
            name: 'Mike Chen',
            notes: 42,
            posts: 31,
            points: 2840,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            notes: 38,
            posts: 28,
            points: 2650,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150'
        },
        {
            id: 3,
            name: 'John Doe',
            notes: 35,
            posts: 25,
            points: 2420,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        {
            id: 4,
            name: 'Emma Davis',
            notes: 29,
            posts: 22,
            points: 2180,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        }
    ];

    const subjectData = [
        { subject: 'Computer Science', notes: 152, posts: 89, color: 'bg-blue-500' },
        { subject: 'Mathematics', notes: 134, posts: 67, color: 'bg-green-500' },
        { subject: 'Physics', notes: 98, posts: 45, color: 'bg-purple-500' },
        { subject: 'Chemistry', notes: 76, posts: 34, color: 'bg-orange-500' },
        { subject: 'Biology', notes: 67, posts: 28, color: 'bg-red-500' },
        { subject: 'Others', notes: 45, posts: 22, color: 'bg-gray-500' }
    ];

    // Filter functions
    const filteredContent = topContent.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || item.subject.toLowerCase() === filterType.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const filteredUsers = topUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    }); const StatCard = ({ title, value, change, trend, suffix = '', icon: Icon }) => (
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-3 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <p className="text-xs md:text-sm font-medium text-gray-400 leading-tight">{title}</p>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-white mb-2">
                        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}                    </p>
                    <div className="flex items-center flex-wrap">
                        {trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-400 mr-1 flex-shrink-0" />
                        ) : (
                            <TrendingDown className="h-3 w-3 md:h-4 md:w-4 text-red-400 mr-1 flex-shrink-0" />
                        )}
                        <span className={`text-xs md:text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 ml-1">vs periode sebelumnya</span>
                    </div>
                </div>
            </div>
        </div>
    ); const SimpleChart = ({ data }) => {
        const maxValue = Math.max(...data.map(d => Math.max(d.users, d.notes, d.posts)));

        return (
            <div className="w-full h-64 md:h-80 p-3 md:p-4">
                <div className="flex items-end justify-between h-48 md:h-64 space-x-2 md:space-x-3">
                    {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center max-w-12 md:max-w-20">
                            <div className="flex items-end space-x-1 mb-2 md:mb-3 h-36 md:h-48">
                                <div
                                    className="w-2 md:w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(8, (item.users / maxValue) * 135)}px` }}
                                    title={`Pengguna: ${item.users}`}
                                />
                                <div
                                    className="w-2 md:w-3 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(8, (item.notes / maxValue) * 135)}px` }}
                                    title={`Catatan: ${item.notes}`}
                                />
                                <div
                                    className="w-2 md:w-3 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(8, (item.posts / maxValue) * 135)}px` }}
                                    title={`Postingan: ${item.posts}`}
                                />
                            </div>
                            <span className="text-xs text-gray-400 text-center leading-tight">
                                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 md:mt-6 space-x-3 md:space-x-6 flex-wrap gap-2">
                    <div className="flex items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded mr-1 md:mr-2"></div>
                        <span className="text-xs md:text-sm text-gray-400">Pengguna</span>
                    </div>
                    <div className="flex items-center">                        <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-green-600 to-green-400 rounded mr-1 md:mr-2"></div>
                        <span className="text-xs md:text-sm text-gray-400">Catatan</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded mr-1 md:mr-2"></div>
                        <span className="text-xs md:text-sm text-gray-400">Postingan</span>
                    </div>
                </div>
            </div>
        );
    }; return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-6">
            {/* Header with Search and Filters */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Dashboard Analitik
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-gray-400">
                        Wawasan platform dan metrik kinerja.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:flex-shrink-0">                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari konten dan pengguna..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full sm:w-64 lg:w-56 xl:w-64 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="pl-10 pr-8 py-2 w-full sm:w-auto bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none cursor-pointer text-sm"
                        >
                            <option value="all">Semua Mata Pelajaran</option>
                            <option value="computer science">Ilmu Komputer</option>
                            <option value="mathematics">Matematika</option>
                            <option value="physics">Fisika</option>
                            <option value="chemistry">Kimia</option>
                            <option value="biology">Biologi</option>
                        </select>
                    </div>

                    {/* Time Range */}
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 w-full sm:w-auto bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                    >
                        <option value="7d">7 Hari Terakhir</option>
                        <option value="30d">30 Hari Terakhir</option>
                        <option value="90d">90 Hari Terakhir</option>
                        <option value="1y">Tahun Lalu</option>
                    </select>
                </div>
            </div>            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{/* ... existing StatCard components ... */}<StatCard
                title="Total Pengguna"
                value={analyticsData.userGrowth.current}
                change={analyticsData.userGrowth.change}
                trend={analyticsData.userGrowth.trend}
                icon={Users}
            />                <StatCard
                    title="Catatan Dibagikan"
                    value={analyticsData.notesShared.current}
                    change={analyticsData.notesShared.change}
                    trend={analyticsData.notesShared.trend}
                    icon={FileText}
                />
                <StatCard
                    title="Postingan Forum"
                    value={analyticsData.forumPosts.current}
                    change={analyticsData.forumPosts.change}
                    trend={analyticsData.forumPosts.trend}
                    icon={BarChart3}
                />
                <StatCard
                    title="Tingkat Keterlibatan"
                    value={analyticsData.engagement.current}
                    change={analyticsData.engagement.change}
                    trend={analyticsData.engagement.trend}
                    icon={TrendingUp}
                    suffix="%"
                />
            </div>            {/* Activity Chart */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white">Ikhtisar Aktivitas</h3>
                        <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                            <span className="text-xs md:text-sm">Aktivitas harian selama 7 hari terakhir</span>
                        </div>
                    </div>
                </div>
                <SimpleChart data={chartData} />
            </div>            {/* Content and Users Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                {/* Top Content */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                    <div className="p-4 md:p-6 border-b border-gray-700/50">
                        <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                            <Download className="h-4 w-4 md:h-5 md:w-5 text-blue-400 flex-shrink-0" />
                            <span>Catatan Paling Banyak Diunduh</span>
                        </h3>
                        {searchQuery && (
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                {filteredContent.length} hasil untuk "{searchQuery}"
                            </p>
                        )}
                    </div>                    <div className="p-4 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                            {(searchQuery ? filteredContent : topContent).slice(0, 5).map((item, index) => (
                                <div key={item.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-white text-sm md:text-base truncate">{item.title}</p>
                                                <p className="text-xs md:text-sm text-gray-400 truncate">
                                                    by {item.author} • {item.subject}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 ml-2">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                                            <span className="text-xs md:text-sm font-medium">{item.rating}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-white text-sm md:text-base">{item.downloads}</p>
                                            <p className="text-xs text-gray-400">unduhan</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>                {/* Top Contributors */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                    <div className="p-4 md:p-6 border-b border-gray-700/50">
                        <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                            <Award className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 flex-shrink-0" />
                            <span>Kontributor Teratas</span>
                        </h3>
                        {searchQuery && (
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                {filteredUsers.length} hasil untuk "{searchQuery}"
                            </p>
                        )}
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                            {(searchQuery ? filteredUsers : topUsers).slice(0, 4).map((user, index) => (<div key={user.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                                <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                                    <div className="w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="w-6 h-6 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs md:text-sm font-medium text-white">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-white text-sm md:text-base truncate">{user.name}</p>
                                        <p className="text-xs md:text-sm text-gray-400 truncate">
                                            {user.notes} catatan • {user.posts} postingan
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                    <p className="font-semibold text-white text-sm md:text-base">{user.points.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">poin</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>            {/* Subject Distribution */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                <div className="p-4 md:p-6 border-b border-gray-700/50">
                    <h3 className="text-lg md:text-xl font-semibold text-white">Konten berdasarkan Mata Pelajaran</h3>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">Distribusi catatan di berbagai mata pelajaran</p>
                </div>
                <div className="p-4 md:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {subjectData.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.color} rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>                                    <span className="text-white font-bold text-sm md:text-lg">
                                    {item.notes.toString().slice(0, 1)}
                                </span>
                                </div>
                                <p className="font-medium text-white text-xs md:text-sm leading-tight">{item.subject}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.notes} catatan</p>
                                <p className="text-xs text-gray-500">{item.posts} postingan</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
