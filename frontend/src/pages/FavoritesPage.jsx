import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Star, Heart, BookOpen, Download, Calendar, User, ArrowLeft, Sparkles, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import NoteCard from '../components/notes/NoteCard';
import { Button, Card, Badge } from '../components/ui';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { generateDummyNotes } from '../data/dummyData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FavoritesPage = () => {
    const [notes, setNotes] = useState([]);
    const [favoriteNotes, setFavoriteNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const { getFavoriteNotes, favoriteCount } = useFavorites();
    const { user } = useAuth();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease',
        });

        // Load all notes and filter favorites
        setTimeout(() => {
            const allNotes = generateDummyNotes();
            setNotes(allNotes);
            const favNotes = getFavoriteNotes(allNotes);
            setFavoriteNotes(favNotes);
            setLoading(false);
        }, 500);
    }, [getFavoriteNotes]);

    // Update favorite notes when favorites change
    useEffect(() => {
        if (notes.length > 0) {
            const favNotes = getFavoriteNotes(notes);

            // Apply sorting
            let sortedNotes = [...favNotes];
            switch (sortBy) {
                case 'newest':
                    sortedNotes.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                    break;
                case 'oldest':
                    sortedNotes.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
                    break;
                case 'rating':
                    sortedNotes.sort((a, b) => b.averageRating - a.averageRating);
                    break;
                case 'downloads':
                    sortedNotes.sort((a, b) => b.downloadCount - a.downloadCount);
                    break;
                case 'title':
                    sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    break;
            }

            setFavoriteNotes(sortedNotes);
        }
    }, [notes, getFavoriteNotes, sortBy]);

    const handleDownload = (note) => {
        console.log('Downloading:', note.title);
        // Simulate download logic
    };

    const handleRate = (note, rating) => {
        console.log('Rating:', note.title, 'with', rating, 'stars');
        // Simulate rating logic
    };

    if (loading) {
        return (
            <Layout user={user}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading your favorite notes...</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout user={user}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Hanken_Grotesk']">
                {/* Header */}
                <div className="mb-8" data-aos="fade-up">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            to="/notes"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                                My Favorite Notes
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Your collection of starred notes ({favoriteCount} items)
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-aos="fade-up" data-aos-delay="200">
                        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
                            <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                            <div className="text-xl font-bold text-blue-600">{favoriteCount}</div>
                            <div className="text-sm text-blue-700">Favorites</div>
                        </Card>
                        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
                            <Download className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <div className="text-xl font-bold text-green-600">
                                {favoriteNotes.reduce((sum, note) => sum + (note.downloadCount || 0), 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-green-700">Total Downloads</div>
                        </Card>
                        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50">
                            <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                            <div className="text-xl font-bold text-purple-600">
                                {Array.from(new Set(favoriteNotes.map(note => note.subject))).length}
                            </div>
                            <div className="text-sm text-purple-700">Subjects</div>
                        </Card>
                        <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
                            <Sparkles className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                            <div className="text-xl font-bold text-orange-600">
                                {favoriteNotes.length > 0 ? (favoriteNotes.reduce((sum, note) => sum + (note.averageRating || 0), 0) / favoriteNotes.length).toFixed(1) : '0.0'}
                            </div>
                            <div className="text-sm text-orange-700">Avg Rating</div>
                        </Card>
                    </div>
                </div>

                {/* Sort and Filter Controls */}
                {favoriteNotes.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex items-center gap-4">
                            <Badge variant="gradient" className="px-4 py-2 text-sm font-semibold">
                                {favoriteNotes.length} Notes
                            </Badge>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Latest Added</option>
                                <option value="oldest">Oldest First</option>
                                <option value="rating">Highest Rated</option>
                                <option value="downloads">Most Downloaded</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Notes Grid */}
                {favoriteNotes.length === 0 ? (
                    <div className="text-center py-20" data-aos="fade-up" data-aos-delay="400">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                                <Heart className="w-16 h-16 text-gray-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                            No favorite notes yet
                        </h3>
                        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                            Start exploring and star the notes you love to build your personal collection of quality study materials.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/notes">
                                <Button variant="gradient" size="lg" className="px-8 py-4">
                                    <Search className="w-5 h-5 mr-2 inline" />
                                    Browse Notes
                                </Button>
                            </Link>
                            <Link to="/upload">
                                <Button variant="outline" size="lg" className="px-8 py-4">
                                    <BookOpen className="w-5 h-5 mr-2 inline" />
                                    Upload Note
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
                        {favoriteNotes.map((note, index) => (
                            <div
                                key={note.id}
                                data-aos="fade-up"
                                data-aos-delay={500 + (index * 100)}
                            >
                                <NoteCard
                                    note={note}
                                    onDownload={handleDownload}
                                    onRate={handleRate}
                                    showFavoriteButton={true}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Actions */}
                {favoriteNotes.length > 0 && (
                    <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="600">
                        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Want to discover more quality notes?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Explore our extensive collection of study materials from various subjects.
                            </p>
                            <Link to="/notes">
                                <Button variant="gradient">
                                    <Search className="w-4 h-4 mr-2 inline" />
                                    Explore More Notes
                                </Button>
                            </Link>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default FavoritesPage;
