/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Users,
    BookOpen,
    Award,
    Trophy,
    Medal,
    Crown,
    ArrowUpRight,
    Sparkles,
    Target,
    Zap,
    Calendar,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/ModernCard';
import { Button } from '../components/ui/ModernButton';
import ModernLayout from '../components/layout/ModernLayout';
import { Avatar, Badge } from '../components/ui';
import { generateDummyUsers, currentUser } from '../data/dummyData';

const ModernDashboard = () => {
    const [stats, setStats] = useState({
        totalNotes: 0,
        totalUsers: 0,
        totalDownloads: 0,
        userPoints: 0
    });
    const [topUploaders, setTopUploaders] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const users = generateDummyUsers();

        setStats({
            totalNotes: 1256,
            totalUsers: users.length,
            totalDownloads: 28470,
            userPoints: currentUser.points
        });

        setTopUploaders(
            users
                .sort((a, b) => b.points - a.points)
                .slice(0, 5)
                .map((user, index) => ({ ...user, rank: index + 1 }))
        );

        setRecentActivity([
            {
                id: 1,
                type: 'upload',
                message: 'Successfully uploaded "Advanced Algorithms"',
                time: '2 hours ago',
                points: '+15',
                icon: BookOpen,
                color: 'blue'
            },
            {
                id: 2,
                type: 'download',
                message: 'Your note received 5 new downloads',
                time: '4 hours ago',
                points: '+10',
                icon: TrendingUp,
                color: 'green'
            },
            {
                id: 3,
                type: 'review',
                message: 'Received 5-star review on "Data Structures"',
                time: '1 day ago',
                points: '+8',
                icon: Award,
                color: 'orange'
            },
            {
                id: 4,
                type: 'achievement',
                message: 'Unlocked "Knowledge Sharer" badge',
                time: '2 days ago',
                points: '+25',
                icon: Trophy,
                color: 'purple'
            }
        ]);
    }, []);

    const StatCard = ({ title, value, icon: Icon, change, color = 'blue', trend }) => {
        return (
            <Card variant="glass" className="relative overflow-hidden group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">{title}</p>
                            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
                            {change && (
                                <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    <ArrowUpRight className={`w-4 h-4 ${trend === 'down' ? 'rotate-90' : ''}`} />
                                    <span className="font-medium">{change}</span>
                                    <span className="text-gray-500">vs last month</span>
                                </div>
                            )}
                        </div>
                        <div className={`relative p-4 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    const getRankIcon = (rank) => {
        const iconProps = "w-6 h-6";
        switch (rank) {
            case 1:
                return <Crown className={`${iconProps} text-yellow-500`} />;
            case 2:
                return <Medal className={`${iconProps} text-gray-400`} />;
            case 3:
                return <Award className={`${iconProps} text-orange-500`} />;
            default:
                return <Trophy className={`${iconProps} text-blue-500`} />;
        }
    };

    const quickActions = [
        {
            title: 'Upload Note',
            description: 'Share your knowledge',
            icon: BookOpen,
            color: 'blue',
            href: '/upload'
        },
        {
            title: 'Browse Notes',
            description: 'Discover new materials',
            icon: TrendingUp,
            color: 'green',
            href: '/notes'
        },
        {
            title: 'Join Discussion',
            description: 'Connect with peers',
            icon: Users,
            color: 'purple',
            href: '/forum'
        },
        {
            title: 'View Rankings',
            description: 'Check leaderboard',
            icon: Award,
            color: 'orange',
            href: '/leaderboard'
        }
    ];

    return (
        <ModernLayout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Hero Section */}
                <div className="mb-12 text-center animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Welcome back!</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                        Hello, {currentUser.name}! 👋
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Ready to continue your learning journey? Let's explore and share knowledge together.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up animation-delay-200">
                    <StatCard
                        title="Total Notes"
                        value={stats.totalNotes}
                        icon={BookOpen}
                        change="+12.5%"
                        color="blue"
                        trend="up"
                    />
                    <StatCard
                        title="Active Users"
                        value={stats.totalUsers}
                        icon={Users}
                        change="+8.3%"
                        color="green"
                        trend="up"
                    />
                    <StatCard
                        title="Total Downloads"
                        value={stats.totalDownloads}
                        icon={TrendingUp}
                        change="+23.1%"
                        color="purple"
                        trend="up"
                    />
                    <StatCard
                        title="Your Points"
                        value={stats.userPoints}
                        icon={Award}
                        change="+45 pts"
                        color="orange"
                        trend="up"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
                        <Card variant="elevated">
                            <CardHeader className="border-b border-gray-100/50">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Activity className="w-5 h-5 text-blue-600" />
                                        <span>Recent Activity</span>
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-xs">
                                        Live
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-0">
                                    {recentActivity.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={activity.id} className={`flex items-center space-x-4 p-6 hover:bg-gray-50/50 transition-colors ${index !== recentActivity.length - 1 ? 'border-b border-gray-100/50' : ''}`}>
                                                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Calendar className="w-3 h-3 text-gray-400" />
                                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="success" className="flex items-center space-x-1">
                                                    <Zap className="w-3 h-3" />
                                                    <span>{activity.points}</span>
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Uploaders */}
                    <div className="animate-fade-in-up animation-delay-600">
                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span>Top Contributors</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topUploaders.map((user, index) => (
                                        <div key={user.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
                                            <div className="flex-shrink-0">
                                                {getRankIcon(user.rank)}
                                            </div>
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.name}
                                                size="md"
                                                initials={user.name?.split(' ').map(n => n[0]).join('')}
                                                className="ring-2 ring-gray-100"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.uploadCount} notes • {user.university}
                                                </p>
                                            </div>
                                            <Badge variant="primary" className="flex items-center space-x-1">
                                                <Sparkles className="w-3 h-3" />
                                                <span>{user.points}</span>
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 animate-fade-in-up animation-delay-800">
                    <Card variant="gradient">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Target className="w-5 h-5 text-purple-600" />
                                <span>Quick Actions</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {quickActions.map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={action.href}
                                            className="group relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:bg-white/70 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <div className={`w-14 h-14 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1 text-center">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 text-center">
                                                {action.description}
                                            </p>
                                            <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </a>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ModernLayout>
    );
};

export default ModernDashboard;
