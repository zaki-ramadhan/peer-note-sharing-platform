import { useState } from 'react';
import {
    BarChart3,
    Users,
    FileText,
    TrendingUp,
    TrendingDown,
    Calendar
} from 'lucide-react';

const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('7d');

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
            title: 'Advanced React Patterns',
            author: 'Mike Chen',
            downloads: 342,
            subject: 'Computer Science'
        },
        {
            title: 'Database Design Fundamentals',
            author: 'Sarah Johnson',
            downloads: 298,
            subject: 'Information Systems'
        },
        {
            title: 'Calculus Integration Guide',
            author: 'John Doe',
            downloads: 267,
            subject: 'Mathematics'
        },
        {
            title: 'Physics Lab Reports',
            author: 'Emma Davis',
            downloads: 234,
            subject: 'Physics'
        }
    ];

    const topUsers = [
        {
            name: 'Mike Chen',
            notes: 42,
            posts: 31,
            points: 2840
        },
        {
            name: 'Sarah Johnson',
            notes: 38,
            posts: 28,
            points: 2650
        },
        {
            name: 'John Doe',
            notes: 35,
            posts: 25,
            points: 2420
        },
        {
            name: 'Emma Davis',
            notes: 29,
            posts: 22,
            points: 2180
        }
    ];

    const StatCard = ({ title, value, change, trend, suffix = '' }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    <div className="flex items-center mt-2">                        {trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
            </div>
        </div>
    );

    const SimpleChart = ({ data }) => {
        const maxValue = Math.max(...data.map(d => Math.max(d.users, d.notes, d.posts)));

        return (
            <div className="mt-4">
                <div className="flex items-end justify-between h-64 space-x-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div className="flex flex-col items-center space-y-1 mb-2 flex-1 justify-end">
                                <div
                                    className="w-4 bg-blue-500 rounded-t"
                                    style={{ height: `${(item.users / maxValue) * 200}px` }}
                                    title={`Users: ${item.users}`}
                                />
                                <div
                                    className="w-4 bg-green-500 rounded-t"
                                    style={{ height: `${(item.notes / maxValue) * 200}px` }}
                                    title={`Notes: ${item.notes}`}
                                />
                                <div
                                    className="w-4 bg-purple-500 rounded-t"
                                    style={{ height: `${(item.posts / maxValue) * 200}px` }}
                                    title={`Posts: ${item.posts}`}
                                />
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 space-x-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Users</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Notes</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Posts</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Analytics Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Platform insights and performance metrics.
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">                <StatCard
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Activity Overview</h3>                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Daily activity for the last 7 days</span>
                    </div>
                </div>
                <SimpleChart data={chartData} />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Content */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Most Downloaded Notes</h3>
                    <div className="space-y-4">
                        {topContent.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">
                                        by {item.author} • {item.subject}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{item.downloads}</p>
                                    <p className="text-xs text-gray-500">downloads</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Contributors */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Top Contributors</h3>
                    <div className="space-y-4">
                        {topUsers.map((user, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xs font-medium text-blue-600">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {user.notes} notes • {user.posts} posts
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{user.points}</p>
                                    <p className="text-xs text-gray-500">points</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subject Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Content by Subject</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { subject: 'Computer Science', count: 1245, color: 'bg-blue-500' },
                        { subject: 'Mathematics', count: 987, color: 'bg-green-500' },
                        { subject: 'Physics', count: 756, color: 'bg-purple-500' },
                        { subject: 'Chemistry', count: 623, color: 'bg-orange-500' },
                        { subject: 'Biology', count: 542, color: 'bg-red-500' },
                        { subject: 'Others', count: 432, color: 'bg-gray-500' }
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className={`w-16 h-16 ${item.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                                <span className="text-white font-bold text-lg">{item.count.toString().slice(0, 1)}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                            <p className="text-xs text-gray-500">{item.count} notes</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
