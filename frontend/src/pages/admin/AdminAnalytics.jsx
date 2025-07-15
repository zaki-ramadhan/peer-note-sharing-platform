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
    });

    const StatCard = ({ title, value, change, trend, suffix = '', icon: Icon }) => (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">{title}</p>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">
                        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    <div className="flex items-center">
                        {trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const SimpleChart = ({ data }) => {
        const maxValue = Math.max(...data.map(d => Math.max(d.users, d.notes, d.posts)));

        return (
            <div className="w-full h-80 p-4">
                <div className="flex items-end justify-between h-64 space-x-3">
                    {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center max-w-20">
                            <div className="flex items-end space-x-1 mb-3 h-48">
                                <div
                                    className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(10, (item.users / maxValue) * 180)}px` }}
                                    title={`Users: ${item.users}`}
                                />
                                <div
                                    className="w-3 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(10, (item.notes / maxValue) * 180)}px` }}
                                    title={`Notes: ${item.notes}`}
                                />
                                <div
                                    className="w-3 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{ height: `${Math.max(10, (item.posts / maxValue) * 180)}px` }}
                                    title={`Posts: ${item.posts}`}
                                />
                            </div>
                            <span className="text-xs text-gray-400 text-center leading-tight">
                                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6 space-x-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded mr-2"></div>
                        <span className="text-sm text-gray-400">Users</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-green-400 rounded mr-2"></div>
                        <span className="text-sm text-gray-400">Notes</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded mr-2"></div>
                        <span className="text-sm text-gray-400">Posts</span>
                    </div>                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header with Search and Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Platform insights and performance metrics.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search content and users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none cursor-pointer"
                        >
                            <option value="all">All Subjects</option>
                            <option value="computer science">Computer Science</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>

                    {/* Time Range */}
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={analyticsData.userGrowth.current}
                    change={analyticsData.userGrowth.change}
                    trend={analyticsData.userGrowth.trend}
                    icon={Users}
                />
                <StatCard
                    title="Notes Shared"
                    value={analyticsData.notesShared.current}
                    change={analyticsData.notesShared.change}
                    trend={analyticsData.notesShared.trend}
                    icon={FileText}
                />
                <StatCard
                    title="Forum Posts"
                    value={analyticsData.forumPosts.current}
                    change={analyticsData.forumPosts.change}
                    trend={analyticsData.forumPosts.trend}
                    icon={BarChart3}
                />
                <StatCard
                    title="Engagement Rate"
                    value={analyticsData.engagement.current}
                    change={analyticsData.engagement.change}
                    trend={analyticsData.engagement.trend}
                    icon={TrendingUp}
                    suffix="%"
                />
            </div>

            {/* Activity Chart */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
                <div className="p-6 border-b border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">Activity Overview</h3>
                        <div className="flex items-center text-gray-400">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span className="text-sm">Daily activity for the last 7 days</span>
                        </div>
                    </div>
                </div>
                <SimpleChart data={chartData} />
            </div>

            {/* Content and Users Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Top Content */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                    <div className="p-6 border-b border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Download className="h-5 w-5 text-blue-400" />
                            Most Downloaded Notes
                        </h3>
                        {searchQuery && (
                            <p className="text-sm text-gray-400 mt-1">
                                {filteredContent.length} result(s) for "{searchQuery}"
                            </p>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {(searchQuery ? filteredContent : topContent).slice(0, 5).map((item, index) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{item.title}</p>
                                                <p className="text-sm text-gray-400">
                                                    by {item.author} • {item.subject}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-medium">{item.rating}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-white">{item.downloads}</p>
                                            <p className="text-xs text-gray-400">downloads</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Contributors */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                    <div className="p-6 border-b border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-400" />
                            Top Contributors
                        </h3>
                        {searchQuery && (
                            <p className="text-sm text-gray-400 mt-1">
                                {filteredUsers.length} result(s) for "{searchQuery}"
                            </p>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {(searchQuery ? filteredUsers : topUsers).slice(0, 4).map((user, index) => (
                                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-sm text-gray-400">
                                                {user.notes} notes • {user.posts} posts
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-white">{user.points.toLocaleString()}</p>
                                        <p className="text-xs text-gray-400">points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject Distribution */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
                <div className="p-6 border-b border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white">Content by Subject</h3>
                    <p className="text-sm text-gray-400 mt-1">Distribution of notes across different subjects</p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {subjectData.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-16 h-16 ${item.color} rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                                    <span className="text-white font-bold text-lg">
                                        {item.notes.toString().slice(0, 1)}
                                    </span>
                                </div>
                                <p className="font-medium text-white text-sm">{item.subject}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.notes} notes</p>
                                <p className="text-xs text-gray-500">{item.posts} posts</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
