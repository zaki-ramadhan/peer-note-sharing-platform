import { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, Award, Star, TrendingUp, Users, Upload } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle, Avatar, Badge } from '../components/ui';
import { generateDummyUsers, currentUser } from '../data/dummyData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [timeframe, setTimeframe] = useState('all-time');
    const [category, setCategory] = useState('points');

    useEffect(() => {
        AOS.init({
            duration: 1400,
            easing: 'ease',
        });

        // Simulate API call
        const users = generateDummyUsers();

        // Sort based on category
        let sortedUsers = [];
        switch (category) {
            case 'points':
                sortedUsers = users.sort((a, b) => b.points - a.points);
                break;
            case 'uploads':
                sortedUsers = users.sort((a, b) => b.uploadCount - a.uploadCount);
                break;
            case 'downloads':
                sortedUsers = users.sort((a, b) => b.downloadCount - a.downloadCount);
                break;
            default:
                sortedUsers = users.sort((a, b) => b.points - a.points);
        }

        setLeaderboardData(sortedUsers.map((user, index) => ({
            ...user,
            rank: index + 1,
            change: Math.floor(Math.random() * 10) - 5 // Random change for demo
        })));
    }, [category, timeframe]);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Crown className="w-8 h-8 lg:w-6 lg:h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-8 h-8 lg:w-6 lg:h-6 text-gray-400" />;
            case 3:
                return <Award className="w-8 h-8 lg:w-6 lg:h-6 text-orange-500" />;
            default:
                return <div className="w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center text-sm font-bold text-slate-600">#{rank}</div>;
        }
    };

    const getChangeIndicator = (change) => {
        if (change > 0) {
            return <span className="text-green-600 text-xs">↗ +{change}</span>;
        } else if (change < 0) {
            return <span className="text-red-600 text-xs">↘ {change}</span>;
        } else {
            return <span className="text-gray-500 text-xs">- 0</span>;
        }
    };

    const TopPerformer = ({ user, rank }) => (
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 border-2 border-blue-100  transition-all duration-300">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rank === 1 ? 'from-yellow-400 to-yellow-600' :
                rank === 2 ? 'from-gray-300 to-gray-500' :
                    'from-orange-400 to-orange-600'
                }`} />

            <CardContent className="p-6 text-center">
                <div className="mb-4">
                    {getRankIcon(rank)}
                </div>

                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="xl"
                    initials={user.name?.split(' ').map(n => n[0]).join('')}
                    className="mx-auto mb-4 border-4 border-white shadow-md"
                />

                <h3 className="text-xl lg:text-lg font-bold text-slate-800 mb-1">{user.name}</h3>
                <p className="text-base lg:text-sm text-slate-500 mb-3">{user.university}</p>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="lg:text-sm text-slate-600">Points</span>
                        <Badge variant="primary" className="font-bold">{user.points}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="lg:text-sm text-slate-600">Uploads</span>
                        <span className="lg:text-sm font-medium">{user.uploadCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="lg:text-sm text-slate-600">Downloads</span>
                        <span className="lg:text-sm font-medium">{user.downloadCount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'points':
                return <Star className="w-4 h-4" />;
            case 'uploads':
                return <Upload className="w-4 h-4" />;
            case 'downloads':
                return <TrendingUp className="w-4 h-4" />;
            default:
                return <Trophy className="w-4 h-4" />;
        }
    }; return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Hanken_Grotesk']">
                {/* Header */}
                <div data-aos="fade-up" className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        🏆 Leaderboard
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Lihat siapa saja yang paling aktif berkontribusi di komunitas NoteShare
                    </p>
                </div>

                {/* Filters */}
                <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <div className="flex gap-2">
                        {['all-time', 'this-month', 'this-week'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setTimeframe(period)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeframe === period
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                {period === 'all-time' ? 'Sepanjang Waktu' :
                                    period === 'this-month' ? 'Bulan Ini' : 'Minggu Ini'}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {['points', 'uploads', 'downloads'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                {getCategoryIcon(cat)}
                                {cat === 'points' ? 'Poin' :
                                    cat === 'uploads' ? 'Upload' : 'Download'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top 3 */}
                <div data-aos="fade-up" data-aos-delay="500" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {leaderboardData.slice(0, 3).map((user, index) => (
                        <TopPerformer key={user.id} user={user} rank={index + 1} />
                    ))}
                </div>

                {/* Rest of Leaderboard */}
                <div data-aos="fade-up" data-aos-delay="600">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                Peringkat Lengkap
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 lg:space-y-4">
                                {leaderboardData.slice(3).map((user) => (
                                    <div
                                        key={user.id}
                                        className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${user.id === currentUser.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex-shrink-0 w-8 text-center">
                                            {getRankIcon(user.rank)}
                                        </div>

                                        <Avatar
                                            src={user.avatar}
                                            alt={user.name}
                                            size="md"
                                            initials={user.name?.split(' ').map(n => n[0]).join('')}
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium text-slate-900 truncate">
                                                    {user.name}
                                                    {user.id === currentUser.id && (
                                                        <Badge variant="primary" size="sm" className="ml-2">Anda</Badge>
                                                    )}
                                                </p>
                                                {getChangeIndicator(user.change)}
                                            </div>
                                            <p className="text-sm text-slate-500 truncate">{user.university}</p>
                                        </div>

                                        <div className="flex items-center space-x-6 lg:space-x-10 text-sm">
                                            <div className="text-center">
                                                <p className="font-bold text-slate-900 text-base">{user.points}</p>
                                                <p className="text-sm text-slate-500">Poin</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-slate-900 text-base">{user.uploadCount}</p>
                                                <p className="text-sm text-slate-500">Upload</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-slate-900 text-base">{user.downloadCount}</p>
                                                <p className="text-sm text-slate-500">Download</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Achievement System Info */}
                <div data-aos="fade-up" data-aos-delay="800" data-aos-offset="200" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>🎯 Cara Mendapat Poin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Upload catatan</span>
                                    <Badge variant="success">+10 poin</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Catatan didownload</span>
                                    <Badge variant="success">+2 poin</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Review 5 bintang</span>
                                    <Badge variant="success">+5 poin</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Post di forum</span>
                                    <Badge variant="success">+3 poin</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Reply helpful</span>
                                    <Badge variant="success">+1 poin</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>🏅 Level & Badges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        🥉
                                    </div>
                                    <div>
                                        <p className="font-medium">Bronze (0-100 poin)</p>
                                        <p className="text-xs text-slate-500">Pemula</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        🥈
                                    </div>
                                    <div>
                                        <p className="font-medium">Silver (101-500 poin)</p>
                                        <p className="text-xs text-slate-500">Kontributor</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        🥇
                                    </div>
                                    <div>
                                        <p className="font-medium">Gold (501-1000 poin)</p>
                                        <p className="text-xs text-slate-500">Expert</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        💎
                                    </div>
                                    <div>
                                        <p className="font-medium">Diamond (1000+ poin)</p>
                                        <p className="text-xs text-slate-500">Master</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default LeaderboardPage;


