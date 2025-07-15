import { useState } from 'react';
import {
    Users,
    FileText,
    MessageSquare,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    Download,
    Star,
    Activity,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
    const [stats] = useState({
        totalUsers: 1250,
        totalNotes: 4830,
        totalPosts: 892,
        activeUsers: 345,
        pendingNotes: 23,
        reportedContent: 7
    });

    const [recentActivity] = useState([
        {
            id: 1,
            type: 'user_registered',
            user: 'Sarah Johnson',
            timestamp: '2 minutes ago',
            details: 'New user registration'
        },
        {
            id: 2,
            type: 'note_uploaded',
            user: 'Mike Chen',
            timestamp: '5 minutes ago',
            details: 'Uploaded "Advanced React Patterns"'
        },
        {
            id: 3,
            type: 'post_created',
            user: 'Emma Davis',
            timestamp: '12 minutes ago',
            details: 'Created forum post about JavaScript'
        },
        {
            id: 4,
            type: 'content_reported',
            user: 'Anonymous',
            timestamp: '25 minutes ago',
            details: 'Reported inappropriate content'
        }
    ]); const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            change: '+12%',
            changeType: 'positive',
            bgColor: 'from-blue-500 to-blue-600',
            description: 'Registered accounts'
        },
        {
            title: 'Notes Shared',
            value: stats.totalNotes.toLocaleString(),
            icon: FileText,
            change: '+8%',
            changeType: 'positive',
            bgColor: 'from-green-500 to-green-600',
            description: 'Educational resources'
        },
        {
            title: 'Forum Posts',
            value: stats.totalPosts.toLocaleString(),
            icon: MessageSquare,
            change: '+15%',
            changeType: 'positive',
            bgColor: 'from-purple-500 to-purple-600',
            description: 'Community discussions'
        },
        {
            title: 'Active Users',
            value: stats.activeUsers.toLocaleString(),
            icon: Activity,
            change: '+5%',
            changeType: 'positive',
            bgColor: 'from-orange-500 to-orange-600',
            description: 'Last 24 hours'
        },
        {
            title: 'Pending Review',
            value: stats.pendingNotes.toLocaleString(),
            icon: Clock,
            change: '-3%',
            changeType: 'negative',
            bgColor: 'from-yellow-500 to-yellow-600',
            description: 'Awaiting approval'
        },
        {
            title: 'Reported Content',
            value: stats.reportedContent.toLocaleString(),
            icon: AlertTriangle,
            change: '+2%',
            changeType: 'negative',
            bgColor: 'from-red-500 to-red-600',
            description: 'Needs attention'
        }
    ]; const getActivityIcon = (type) => {
        switch (type) {
            case 'user_registered':
                return <Users className="h-4 w-4 text-white" />;
            case 'note_uploaded':
                return <FileText className="h-4 w-4 text-white" />;
            case 'post_created':
                return <MessageSquare className="h-4 w-4 text-white" />;
            case 'content_reported':
                return <AlertTriangle className="h-4 w-4 text-white" />;
            default:
                return <CheckCircle className="h-4 w-4 text-white" />;
        }
    }; return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Dashboard Overview
                    </h2>
                    <p className="mt-2 text-lg text-gray-300">
                        Welcome back! Here's what's happening on your platform.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-xl text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm backdrop-blur-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last 30 days
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-lg">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </button>
                </div>
            </div>            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-gray-800/50 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-gray-700/50 hover:shadow-2xl transition-all duration-300 group">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${card.bgColor} shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
                                            <card.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${card.changeType === 'positive'
                                            ? 'bg-green-900/50 text-green-300 border border-green-600'
                                            : 'bg-red-900/50 text-red-300 border border-red-600'
                                            }`}>
                                            {card.changeType === 'positive' ? (
                                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="w-4 h-4 mr-1" />
                                            )}
                                            {card.change}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400 mb-1">{card.title}</h3>
                                        <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                                        <p className="text-sm text-gray-300">{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700/50">
                    <div className="px-6 py-5 border-b border-gray-700/50">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-blue-400" />
                                Recent Activity
                            </h3>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium px-3 py-1 rounded-lg hover:bg-gray-700/50 transition-colors">
                                View all
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-700/50">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="px-6 py-4 hover:bg-gray-700/30 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-300">
                                            <span className="font-semibold text-blue-400">{activity.user}</span> {activity.details}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {activity.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700/50">                    <div className="px-6 py-5 border-b border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                        Quick Actions
                    </h3>
                </div>
                    <div className="p-6 space-y-4">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 transition-all duration-200 group">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div className="ml-4 text-left">
                                    <span className="text-sm font-medium text-white">Manage Users</span>
                                    <p className="text-xs text-gray-400">Review pending accounts</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full">23 pending</span>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-green-900/30 hover:to-emerald-900/30 transition-all duration-200 group">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div className="ml-4 text-left">
                                    <span className="text-sm font-medium text-white">Review Content</span>                                    <p className="text-xs text-gray-400">Moderate submissions</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full">12 items</span>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/30 transition-all duration-200 group">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="h-5 w-5 text-white" />
                                </div>
                                <div className="ml-4 text-left">
                                    <span className="text-sm font-medium text-white">Handle Reports</span>
                                    <p className="text-xs text-gray-400">Address user complaints</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs font-medium bg-red-900/50 text-red-300 rounded-full">7 reports</span>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                            </div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-indigo-900/30 transition-all duration-200 group">                            <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div className="ml-4 text-left">
                                <span className="text-sm font-medium text-white">View Analytics</span>
                                <p className="text-xs text-gray-400">Platform insights</p>
                            </div>
                        </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs font-medium bg-purple-900/50 text-purple-300 rounded-full">Updated 1h ago</span>
                                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700/50">
                <div className="px-6 py-5 border-b border-gray-700/50">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                        System Status
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 rounded-xl bg-green-900/30 border border-green-600/30">
                            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-3 animate-pulse"></div>
                            <p className="text-sm font-semibold text-white">Database</p>
                            <p className="text-xs text-green-400 font-medium">Operational</p>
                            <p className="text-xs text-gray-400 mt-1">Response: 45ms</p>
                        </div>                        <div className="text-center p-4 rounded-xl bg-green-900/30 border border-green-600/30">
                            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-3 animate-pulse"></div>
                            <p className="text-sm font-semibold text-white">File Storage</p>
                            <p className="text-xs text-green-400 font-medium">Operational</p>
                            <p className="text-xs text-gray-400 mt-1">99.9% uptime</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-yellow-900/30 border border-yellow-600/30">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-3 animate-pulse"></div>
                            <p className="text-sm font-semibold text-white">Email Service</p>
                            <p className="text-xs text-yellow-400 font-medium">Degraded Performance</p>
                            <p className="text-xs text-gray-400 mt-1">Investigating...</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-300">All systems operational</span>
                            </div>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                                View status page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
