import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Plus, SlidersHorizontal, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import NoteCard from '../components/notes/NoteCard';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui';
import { generateDummyNotes, currentUser } from '../data/dummyData';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [currentView, setCurrentView] = useState('grid');
    const [filters, setFilters] = useState({
        search: '',
        subject: '',
        sort: 'newest'
    });
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const subjects = [
        'All', 'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah',
        'Geografi', 'Ekonomi', 'Komputer', 'Lainnya'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Latest', icon: Sparkles },
        { value: 'popular', label: 'Most Popular', icon: Sparkles },
        { value: 'rating', label: 'Highest Rated', icon: Sparkles },
        { value: 'downloads', label: 'Most Downloaded', icon: Sparkles }
    ];

    useEffect(() => {
        setTimeout(() => {
            const dummyNotes = generateDummyNotes();
            setNotes(dummyNotes);
            setFilteredNotes(dummyNotes);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let filtered = [...notes];

        if (filters.search) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }

        if (filters.subject && filters.subject !== 'All') {
            filtered = filtered.filter(note => note.subject === filters.subject);
        }

        switch (filters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'popular':
            case 'downloads':
                filtered.sort((a, b) => b.downloadCount - a.downloadCount);
                break;
            case 'rating':
                filtered.sort((a, b) => b.averageRating - a.averageRating);
                break;
            default:
                break;
        }

        setFilteredNotes(filtered);
    }, [notes, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleDownload = (note) => {
        console.log('Downloading:', note.title);
        // Simulate download with better UX
        const button = event.target.closest('button');
        button.innerHTML = '<div class="flex items-center"><div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>Downloading...</div>';

        setTimeout(() => {
            button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Downloaded!';
            setTimeout(() => {
                button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Download';
            }, 2000);
        }, 1500);
    };

    const handleRate = (note) => {
        console.log('Rating:', note.title);
        alert(`Rating feature for: ${note.title}`);
    };

    if (loading) {
        return (
            <Layout user={currentUser}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="space-y-8">
                        {/* Header Skeleton */}
                        <div className="animate-pulse">
                            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-1/3 mb-4"></div>
                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/2"></div>
                        </div>

                        {/* Filters Skeleton */}
                        <div className="animate-pulse">
                            <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
                        </div>

                        {/* Cards Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    } return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Hanken_Grotesk']">
                {/* Hero Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Discover Quality Notes</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                        Explore {filteredNotes.length} Premium Notes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find high-quality study materials curated by our community of learners
                    </p>
                </div>

                {/* Enhanced Search and Filter Bar */}
                <Card variant="glass" className="mb-8 animate-fade-in-up animation-delay-200">
                    <CardContent className="p-6">
                        {/* Main Search Row */}
                        <div className="flex flex-col lg:flex-row gap-4 mb-4">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by title, description, or tags..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                />
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center space-x-2">
                                <div className="flex rounded-xl border border-gray-200/50 p-1 bg-white/50">
                                    <button
                                        onClick={() => setCurrentView('grid')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${currentView === 'grid'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                            }`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentView('list')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${currentView === 'list'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                            }`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span>Filters</span>
                                </Button>
                            </div>
                        </div>

                        {/* Expandable Filters */}
                        {showFilters && (
                            <div className="border-t border-gray-200/50 pt-6 space-y-6 animate-fade-in-up">
                                {/* Subject Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Subject Categories
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {subjects.map((subject) => (
                                            <button
                                                key={subject}
                                                onClick={() => handleFilterChange('subject', subject === 'All' ? '' : subject)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${(filters.subject === subject) || (filters.subject === '' && subject === 'All')
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                    : 'bg-white/50 text-gray-700 border border-gray-200/50 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-200/50'
                                                    }`}
                                            >
                                                {subject}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Options */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Sort By
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {sortOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleFilterChange('sort', option.value)}
                                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filters.sort === option.value
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                        : 'bg-white/50 text-gray-700 border border-gray-200/50 hover:bg-purple-50/50 hover:text-purple-600 hover:border-purple-200/50'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span>{option.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>                {/* Upload CTA and Results Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center space-x-4">
                        <Badge variant="gradient" className="px-4 py-2 text-sm font-semibold">
                            {filteredNotes.length} Results
                        </Badge>
                        {filters.search && (
                            <span className="text-sm text-gray-600">
                                for "<span className="font-semibold text-blue-600">{filters.search}</span>"
                            </span>
                        )}
                        {filters.subject && filters.subject !== '' && (
                            <Badge variant="outline" className="px-3 py-1 text-sm">
                                {filters.subject}
                            </Badge>
                        )}
                    </div>

                    <Button variant="gradient" className="flex items-center space-x-2 shadow-lg hover:shadow-xl">
                        <Plus className="w-4 h-4" />
                        <span>Upload Note</span>
                    </Button>
                </div>                {/* Notes Grid/List */}
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-20 animate-fade-in-up">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                                <Search className="w-16 h-16 text-blue-500" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                            No notes found
                        </h3>
                        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                            {filters.search || filters.subject ?
                                "Try adjusting your search criteria or explore different categories." :
                                "Be the first to share knowledge with our learning community."
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gradient" size="lg" className="px-8 py-4">
                                <Plus className="w-5 h-5 mr-2" />
                                Upload First Note
                            </Button>
                            {(filters.search || filters.subject) && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-4"
                                    onClick={() => setFilters({ search: '', subject: '', sort: 'newest' })}
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={`${currentView === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                        } animate-fade-in-up animation-delay-400`}>
                        {filteredNotes.map((note, index) => (
                            <div
                                key={note.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >                                <NoteCard
                                    note={note}
                                    compact={currentView === 'list'}
                                    onDownload={handleDownload}
                                    onRate={handleRate}
                                />
                            </div>
                        ))}
                    </div>
                )}                {/* Load More */}
                {filteredNotes.length > 0 && (
                    <div className="text-center mt-16 animate-fade-in-up">
                        <Button variant="outline" size="lg" className="px-8 py-4">
                            Load More Notes
                        </Button>
                    </div>
                )}

                {/* Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <Button
                        variant="gradient"
                        className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                        title="Upload New Note"
                    >
                        <Plus className="w-6 h-6" />
                    </Button>
                </div>
            </div>            </Layout>
    );
};

export default NotesPage;
