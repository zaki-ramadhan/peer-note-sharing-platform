import { useState } from 'react';
import { Link } from 'react-router';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Book,
    Trophy,
    Star,
    Download,
    Upload,
    Users,
    Edit,
    Settings,
    Award
} from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user } = useAuth();

    // Use authenticated user data or fallback
    const userData = {
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        joinDate: user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'March 2024',
        location: user?.location || 'Jakarta, Indonesia',
        bio: user?.bio || 'Computer Science student passionate about sharing knowledge and helping fellow students succeed.',
        stats: {
            notesUploaded: 45,
            totalDownloads: 2840,
            points: user?.points || 1250,
            rank: 12,
            achievements: 8
        }
    };

    const uploadedNotes = [
        {
            id: 1,
            title: 'Advanced Data Structures',
            subject: 'Computer Science',
            downloads: 245,
            rating: 4.8,
            uploadDate: '2024-01-15'
        },
        {
            id: 2,
            title: 'Machine Learning Fundamentals',
            subject: 'Computer Science',
            downloads: 189,
            rating: 4.6,
            uploadDate: '2024-01-10'
        },
        {
            id: 3,
            title: 'Calculus III Notes',
            subject: 'Mathematics',
            downloads: 167,
            rating: 4.9,
            uploadDate: '2024-01-05'
        }
    ];

    const achievements = [
        { id: 1, title: 'Rising Star', description: 'First 10 uploads', icon: '⭐', earned: true },
        { id: 2, title: 'Knowledge Sharer', description: '100+ downloads', icon: '📚', earned: true },
        { id: 3, title: 'Community Helper', description: '50+ forum posts', icon: '💬', earned: true },
        { id: 4, title: 'Top Contributor', description: '1000+ points', icon: '🏆', earned: true },
        { id: 5, title: 'Expert', description: '100+ uploads', icon: '🎓', earned: false },
        { id: 6, title: 'Mentor', description: '500+ helpful votes', icon: '👨‍🏫', earned: false }
    ];

    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">                {/* Profile Header */}
                <div
                    className="bg-white rounded-xl shadow-sm p-8 mb-8"
                    data-aos="fade-up"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div
                            className="relative"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >                            <img
                                src={userData.avatar}
                                alt={userData.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                            />
                            <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                        </div>                        <div className="flex-1 text-center md:text-left">
                            <h1
                                className="text-3xl font-bold text-gray-900 mb-2"
                                data-aos="fade-right"
                                data-aos-delay="300"
                            >
                                {userData.name}
                            </h1>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 mb-4"
                                data-aos="fade-right"
                                data-aos-delay="400"
                            >
                                <div className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    <span>{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {userData.joinDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{userData.location}</span>
                                </div>
                            </div>                            <p
                                className="text-gray-700 mb-6 max-w-2xl"
                                data-aos="fade-right"
                                data-aos-delay="500"
                            >
                                {userData.bio}
                            </p>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-4"
                                data-aos="fade-up"
                                data-aos-delay="600"
                            >                                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{userData.stats.notesUploaded}</div>
                                    <div className="text-sm text-gray-600">Notes Uploaded</div>
                                </div>
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">{userData.stats.totalDownloads}</div>
                                    <div className="text-sm text-gray-600">Total Downloads</div>
                                </div>
                                <div className="bg-purple-50 px-4 py-2 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">{userData.stats.points}</div>
                                    <div className="text-sm text-gray-600">Points</div>
                                </div>
                                <div className="bg-orange-50 px-4 py-2 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">#{userData.stats.rank}</div>
                                    <div className="text-sm text-gray-600">Rank</div>
                                </div>
                            </div>
                        </div>            <div
                            className="flex flex-col gap-3"
                            data-aos="fade-left"
                            data-aos-delay="700"
                        >
                            <Link
                                to="/settings"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </Link>                            <Link
                                to="/settings"
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>                {/* Tab Navigation */}
                <div
                    className="bg-white rounded-xl shadow-sm mb-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-4 font-medium ${activeTab === 'overview'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`px-6 py-4 font-medium ${activeTab === 'notes'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            My Notes
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`px-6 py-4 font-medium ${activeTab === 'achievements'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Achievements
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Activity Summary */}
                        <div
                            className="lg:col-span-2"
                            data-aos="fade-right"
                            data-aos-delay="300"
                        >                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Upload className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Uploaded new notes</p>
                                            <p className="text-gray-600 text-sm">Machine Learning Fundamentals</p>
                                            <p className="text-gray-500 text-xs">2 days ago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Earned achievement</p>
                                            <p className="text-gray-600 text-sm">Top Contributor</p>
                                            <p className="text-gray-500 text-xs">1 week ago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Answered forum question</p>
                                            <p className="text-gray-600 text-sm">How to solve calculus problems?</p>
                                            <p className="text-gray-500 text-xs">1 week ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div
                            className="space-y-6"
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">This Month</span>
                                        <span className="font-semibold text-gray-900">5 uploads</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Downloads</span>
                                        <span className="font-semibold text-gray-900">234 this month</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Average Rating</span>
                                        <span className="font-semibold text-gray-900">4.7 ⭐</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Points Earned</span>
                                        <span className="font-semibold text-gray-900">+150 this month</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Subjects</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Computer Science</span>
                                        <span className="font-semibold text-gray-900">15 notes</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Mathematics</span>
                                        <span className="font-semibold text-gray-900">12 notes</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Physics</span>
                                        <span className="font-semibold text-gray-900">8 notes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >                        {uploadedNotes.map((note, index) => (
                        <div
                            key={note.id}
                            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay={300 + (index * 100)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {note.subject}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        <span>{note.downloads} downloads</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span>{note.rating}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Uploaded: {new Date(note.uploadDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >                        {achievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className={`bg-white rounded-xl shadow-sm p-6 ${achievement.earned
                                ? 'border-2 border-yellow-200'
                                : 'opacity-60'
                                }`}
                            data-aos="zoom-in"
                            data-aos-delay={300 + (index * 100)}
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-3">{achievement.icon}</div>
                                <h3 className={`text-lg font-semibold mb-2 ${achievement.earned
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                    }`}>
                                    {achievement.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {achievement.description}
                                </p>
                                {achievement.earned && (
                                    <span className="inline-block mt-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                        Earned
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProfilePage;