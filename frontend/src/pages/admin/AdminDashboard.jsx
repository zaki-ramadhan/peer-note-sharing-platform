import { useState } from 'react';
import {
    Users,
    FileText,
    MessageSquare,
    TrendingUp,
    AlertTriangle,
    CheckCircle
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
    ]);

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            change: '+12%',
            changeType: 'positive',
            bgColor: 'bg-blue-500'
        },
        {
            title: 'Notes Shared',
            value: stats.totalNotes.toLocaleString(),
            icon: FileText,
            change: '+8%',
            changeType: 'positive',
            bgColor: 'bg-green-500'
        },
        {
            title: 'Forum Posts',
            value: stats.totalPosts.toLocaleString(),
            icon: MessageSquare,
            change: '+15%',
            changeType: 'positive',
            bgColor: 'bg-purple-500'
        }, {
            title: 'Active Users',
            value: stats.activeUsers.toLocaleString(),
            icon: TrendingUp,
            change: '+5%',
            changeType: 'positive',
            bgColor: 'bg-orange-500'
        }, {
            title: 'Pending Review',
            value: stats.pendingNotes.toLocaleString(),
            icon: AlertTriangle,
            change: '-3%',
            changeType: 'negative',
            bgColor: 'bg-yellow-500'
        }, {
            title: 'Reported Content',
            value: stats.reportedContent.toLocaleString(),
            icon: AlertTriangle,
            change: '+2',
            changeType: 'negative',
            bgColor: 'bg-red-500'
        }
    ]; const getActivityIcon = (type) => {
        switch (type) {
            case 'user_registered':
                return <Users className="h-5 w-5 text-blue-500" />;
            case 'note_uploaded':
                return <FileText className="h-5 w-5 text-green-500" />;
            case 'post_created':
                return <MessageSquare className="h-5 w-5 text-purple-500" />;
            case 'content_reported':
                return <AlertTriangle className="h-5 w-5 text-red-500" />;
            default:
                return <CheckCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard Overview
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening on your platform.
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                                        <card.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        {card.title}
                                    </dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">
                                            {card.value}
                                        </div>
                                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {card.change}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="px-6 py-4">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">{activity.user}</span> {activity.details}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-3 bg-gray-50 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View all activity
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <Users className="h-5 w-5 text-blue-500 mr-3" />
                                <span className="text-sm font-medium text-gray-900">Manage Users</span>
                            </div>
                            <span className="text-xs text-gray-500">23 pending</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <FileText className="h-5 w-5 text-green-500 mr-3" />
                                <span className="text-sm font-medium text-gray-900">Review Content</span>
                            </div>
                            <span className="text-xs text-gray-500">12 items</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                                <span className="text-sm font-medium text-gray-900">Handle Reports</span>
                            </div>
                            <span className="text-xs text-gray-500">7 reports</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <TrendingUp className="h-5 w-5 text-purple-500 mr-3" />
                                <span className="text-sm font-medium text-gray-900">View Analytics</span>
                            </div>
                            <span className="text-xs text-gray-500">Updated 1h ago</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">System Status</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                            <p className="text-sm font-medium text-gray-900">Database</p>
                            <p className="text-xs text-gray-500">Operational</p>
                        </div>
                        <div className="text-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                            <p className="text-sm font-medium text-gray-900">File Storage</p>
                            <p className="text-xs text-gray-500">Operational</p>
                        </div>
                        <div className="text-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                            <p className="text-sm font-medium text-gray-900">Email Service</p>
                            <p className="text-xs text-gray-500">Degraded Performance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
