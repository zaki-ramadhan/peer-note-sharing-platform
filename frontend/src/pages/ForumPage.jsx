import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MessageSquare, Plus, Search, TrendingUp, Clock, ThumbsUp, Reply } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Avatar } from '../components/ui';
import { generateDummyForumPosts, currentUser } from '../data/dummyData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const categories = [
        'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah',
        'Geografi', 'Ekonomi', 'Komputer', 'Tips Belajar', 'Lainnya'
    ];

    useEffect(() => {
        AOS.init({
            duration: 1400,
            easing: 'ease',
        })
        // Simulate API call
        const forumPosts = [
            ...generateDummyForumPosts(),
            {
                id: '3',
                title: 'Tips Menghadapi Ujian Akhir Semester',
                content: 'Sharing strategi belajar yang efektif untuk persiapan UAS. Mulai dari schedule belajar sampai teknik mengingat...',
                author: {
                    id: 'user3',
                    name: 'Budi Santoso',
                    avatar: null
                },
                subject: 'Tips Belajar',
                createdAt: '2025-07-12T16:20:00Z',
                replyCount: 18,
                likes: 15,
                tags: ['tips', 'ujian', 'belajar']
            },
            {
                id: '4',
                title: 'Diskusi: Algoritma Machine Learning untuk Pemula',
                content: 'Mari diskusi tentang algoritma ML yang mudah dipahami untuk pemula. Apa yang sebaiknya dipelajari dulu?',
                author: {
                    id: 'user4',
                    name: 'Diana Putri',
                    avatar: null
                },
                subject: 'Komputer',
                createdAt: '2025-07-11T11:30:00Z',
                replyCount: 7,
                likes: 9,
                tags: ['machine learning', 'programming', 'pemula']
            }
        ];
        setPosts(forumPosts);
        setFilteredPosts(forumPosts);
    }, []);

    useEffect(() => {
        let filtered = [...posts];

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(post => post.subject === selectedCategory);
        }

        // Sort posts
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'popular':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'replies':
                filtered.sort((a, b) => b.replyCount - a.replyCount);
                break;
        }

        setFilteredPosts(filtered);
    }, [posts, searchTerm, selectedCategory, sortBy]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays} hari yang lalu`;
        } else if (diffHours > 0) {
            return `${diffHours} jam yang lalu`;
        } else {
            return 'Baru saja';
        }
    };

    const PostCard = ({ post }) => (
        <Card className=" transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <Avatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        size="md"
                        initials={post.author.name?.split(' ').map(n => n[0]).join('')}
                    />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="primary" size="sm">
                                {post.subject}
                            </Badge>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            {post.title}
                        </h3>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                            {post.content}
                        </p>

                        <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                        </div>

                        {post.tags && (
                            <div className="flex flex-wrap gap-1 mb-4">
                                {post.tags.map((tag, index) => (
                                    <Badge key={index} variant="default" size="sm">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <Reply className="w-4 h-4" />
                                    <span className="text-sm">{post.replyCount} replies</span>
                                </div>
                            </div>

                            <Button variant="ghost" size="sm">
                                Baca Selengkapnya
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Hanken_Grotesk']">
                {/* Header */}
                <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Forum Diskusi</h1>
                        <p className="text-gray-600 mt-2">
                            Berdiskusi, bertanya, dan berbagi pengalaman dengan komunitas
                        </p>                    </div>
                    <Link to="/forum/create">
                        <Button className="mt-4 sm:mt-0 flex">
                            <Plus className="inline w-4 h-4 mr-2" />
                            Buat Post Baru
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div data-aos="fade-up" data-aos-delay="300" className="lg:col-span-3 space-y-6">
                        {/* Search and Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <Input
                                            icon={Search}
                                            placeholder="Cari diskusi..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Semua Kategori</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="newest">Terbaru</option>
                                            <option value="popular">Terpopuler</option>
                                            <option value="replies">Paling Dibalas</option>
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Posts */}
                        <div className="space-y-4">
                            {filteredPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">
                                        {searchTerm || selectedCategory ? 'Tidak ada diskusi yang sesuai dengan filter.' : 'Belum ada diskusi. Jadilah yang pertama!'}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div data-aos="fade-up" data-aos-delay="300" className="space-y-6">
                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Kategori</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Popular Tags */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tag Popular</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {['ujian', 'tips', 'belajar', 'programming', 'matematika', 'fisika'].map(tag => (
                                        <Badge key={tag} variant="default" size="sm" className="cursor-pointer hover:bg-blue-100">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Forum Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistik Forum</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Diskusi</span>
                                        <span className="font-medium">{posts.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Anggota Aktif</span>
                                        <span className="font-medium">1,234</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Post Hari Ini</span>
                                        <span className="font-medium">23</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ForumPage;

