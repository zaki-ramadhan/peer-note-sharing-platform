/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, Award, Trophy, Medal, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Avatar, Badge } from '../components/ui';
import { Layout } from '../components/layout';
import { generateDummyUsers, currentUser } from '../data/dummyData';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalNotes: 0,
        totalUsers: 0,
        totalDownloads: 0,
        userPoints: 0
    });
    const [topUploaders, setTopUploaders] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        // Simulate API calls
        const users = generateDummyUsers();

        setStats({
            totalNotes: 156,
            totalUsers: users.length,
            totalDownloads: 2847,
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
                message: 'Anda berhasil upload "Algoritma Sorting"',
                time: '2 jam yang lalu',
                points: '+5'
            },
            {
                id: 2,
                type: 'download',
                message: 'Seseorang mendownload catatan Anda',
                time: '4 jam yang lalu',
                points: '+2'
            },
            {
                id: 3,
                type: 'review',
                message: 'Catatan Anda mendapat review 5 bintang',
                time: '1 hari yang lalu',
                points: '+3'
            }
        ]);
    }, []);

    const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        {change && (
                            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {change} dari bulan lalu
                            </p>
                        )}
                    </div>
                    <div className={`p-3 bg-${color}-100 rounded-full`}>
                        <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Crown className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Award className="w-5 h-5 text-orange-500" />;
            default:
                return <Trophy className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Selamat datang, {currentUser.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Ayo berbagi dan temukan catatan terbaik untuk mendukung pembelajaran Anda.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Catatan"
                        value={stats.totalNotes}
                        icon={BookOpen}
                        change="+12"
                        color="blue"
                    />
                    <StatCard
                        title="Total Pengguna"
                        value={stats.totalUsers}
                        icon={Users}
                        change="+8"
                        color="green"
                    />
                    <StatCard
                        title="Total Download"
                        value={stats.totalDownloads.toLocaleString()}
                        icon={TrendingUp}
                        change="+156"
                        color="purple"
                    />
                    <StatCard
                        title="Poin Anda"
                        value={stats.userPoints}
                        icon={Award}
                        change="+45"
                        color="orange"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Aktivitas Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    {activity.type === 'upload' && <BookOpen className="w-5 h-5 text-blue-600" />}
                                                    {activity.type === 'download' && <TrendingUp className="w-5 h-5 text-green-600" />}
                                                    {activity.type === 'review' && <Award className="w-5 h-5 text-orange-600" />}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                            <Badge variant="success" size="sm">
                                                {activity.points} poin
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Uploaders */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                                    Top Uploaders
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topUploaders.map((user) => (
                                        <div key={user.id} className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                {getRankIcon(user.rank)}
                                            </div>
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.name}
                                                size="sm"
                                                initials={user.name?.split(' ').map(n => n[0]).join('')}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.uploadCount} catatan
                                                </p>
                                            </div>
                                            <Badge variant="primary" size="sm">
                                                {user.points}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Aksi Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <a
                                    href="/upload"
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Upload Catatan</p>
                                        <p className="text-sm text-gray-500">Bagikan catatan Anda</p>
                                    </div>
                                </a>

                                <a
                                    href="/notes"
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Cari Catatan</p>
                                        <p className="text-sm text-gray-500">Temukan materi terbaik</p>
                                    </div>
                                </a>

                                <a
                                    href="/forum"
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Users className="w-8 h-8 text-purple-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Forum Diskusi</p>
                                        <p className="text-sm text-gray-500">Berdiskusi dengan teman</p>
                                    </div>
                                </a>

                                <a
                                    href="/profile"
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Award className="w-8 h-8 text-orange-600 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Profil Saya</p>
                                        <p className="text-sm text-gray-500">Kelola akun Anda</p>
                                    </div>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
