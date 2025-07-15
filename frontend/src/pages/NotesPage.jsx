import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Search, Filter, Grid, List, Plus, SlidersHorizontal, Sparkles, Download, AlertCircle, Star, FileText, File, Image, BookOpen, TrendingUp, Calendar, Eye } from 'lucide-react';
import Layout from '../components/layout/Layout';
import NoteCard from '../components/notes/NoteCard';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui';
import { generateDummyNotes, currentUser } from '../data/dummyData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotesPage = () => {
    const [searchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [currentView, setCurrentView] = useState('grid');
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        subject: searchParams.get('subject') || '',
        sort: 'newest'
    }); const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [popularTags, setPopularTags] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [filterStats, setFilterStats] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [quickFilterActive, setQuickFilterActive] = useState(null);

    const subjects = [
        'All', 'Computer Science', 'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah',
        'Geografi', 'Ekonomi', 'Lainnya'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Latest', icon: Sparkles },
        { value: 'popular', label: 'Most Popular', icon: Sparkles },
        { value: 'rating', label: 'Highest Rated', icon: Sparkles },
        { value: 'downloads', label: 'Most Downloaded', icon: Sparkles }
    ]; const viewOptions = [
        { key: 'grid', icon: Grid, label: 'Grid View' },
        { key: 'list', icon: List, label: 'List View' },
        { key: 'compact', icon: FileText, label: 'Compact View' }
    ];

    // Quick filter options
    const quickFilters = [
        { key: 'trending', label: 'Trending', icon: TrendingUp, description: 'Most downloaded this week' },
        { key: 'recent', label: 'Recent', icon: Calendar, description: 'Uploaded in last 7 days' },
        { key: 'top-rated', label: 'Top Rated', icon: Star, description: '4.5+ rating' },
        { key: 'my-favorites', label: 'Bookmarked', icon: BookOpen, description: 'Your saved notes' }
    ]; useEffect(() => {
        AOS.init({
            duration: 1400,
            easing: 'ease',
        })
        // Simulate loading with dummy data
        setTimeout(() => {
            const dummyNotes = generateDummyNotes();
            setNotes(dummyNotes);
            setFilteredNotes(dummyNotes);
            setLoading(false);
        }, 1000);
    }, []);

    // Update filters when URL search params change
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            search: searchParams.get('search') || '',
            subject: searchParams.get('subject') || ''
        }));
    }, [searchParams]);

    // Enhanced filtering with quick filter logic
    useEffect(() => {
        let filtered = [...notes];        // Apply quick filter first
        if (quickFilterActive) {
            switch (quickFilterActive) {
                case 'trending': {
                    filtered = filtered.filter(note => note.downloadCount > 100);
                    break;
                }
                case 'recent': {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    filtered = filtered.filter(note => new Date(note.uploadDate) > oneWeekAgo);
                    break;
                }
                case 'top-rated': {
                    filtered = filtered.filter(note => note.averageRating >= 4.5);
                    break;
                }
                case 'my-favorites': {
                    // Simulate user favorites (in real app, would come from user data)
                    filtered = filtered.filter(note => note.id % 3 === 0);
                    break;
                }
                default:
                    break;
            }
        }

        // Apply regular filters
        if (filters.search) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
            );
        } if (filters.subject && filters.subject !== 'All') {
            if (filters.subject.includes(',')) {
                // Multiple categories selected
                const categories = filters.subject.split(',');
                filtered = filtered.filter(note => categories.includes(note.subject));
            } else {
                // Single category selected
                filtered = filtered.filter(note => note.subject === filters.subject);
            }
        }

        // Update filter stats
        setFilterStats({
            total: notes.length,
            filtered: filtered.length,
            bySubject: notes.reduce((acc, note) => {
                acc[note.subject] = (acc[note.subject] || 0) + 1;
                return acc;
            }, {}),
            avgRating: filtered.length > 0 ? (filtered.reduce((sum, note) => sum + note.averageRating, 0) / filtered.length).toFixed(1) : 0
        });

        // Apply sorting
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
    }, [notes, filters, quickFilterActive]);

    // Generate popular tags from all notes
    useEffect(() => {
        if (notes.length > 0) {
            const allTags = notes.flatMap(note => note.tags || []);
            const tagCounts = allTags.reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {});

            const sortedTags = Object.entries(tagCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([tag]) => tag);

            setPopularTags(sortedTags);
        }
    }, [notes]);

    // Generate search suggestions based on notes
    const generateSearchSuggestions = (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) {
            setSearchSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const suggestions = [];
        const lowerSearchTerm = searchTerm.toLowerCase();

        // Add title suggestions
        notes.forEach(note => {
            if (note.title.toLowerCase().includes(lowerSearchTerm)) {
                suggestions.push({
                    type: 'title',
                    text: note.title,
                    count: 1
                });
            }
        });

        // Add tag suggestions
        const matchingTags = new Set();
        notes.forEach(note => {
            note.tags?.forEach(tag => {
                if (tag.toLowerCase().includes(lowerSearchTerm)) {
                    matchingTags.add(tag);
                }
            });
        });

        matchingTags.forEach(tag => {
            suggestions.push({
                type: 'tag',
                text: tag,
                count: notes.filter(note => note.tags?.includes(tag)).length
            });
        });

        setSearchSuggestions(suggestions.slice(0, 5));
        setShowSuggestions(suggestions.length > 0);
    };

    const handleSearchChange = (value) => {
        handleFilterChange('search', value);
        generateSearchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion) => {
        handleFilterChange('search', suggestion.text);
        setShowSuggestions(false);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }; const handleDownload = (note) => {
        console.log('Downloading:', note.title);

        // Simulate download with better UX
        const button = document.querySelector(`[data-note-id="${note.id}"] .download-btn`) || event.target.closest('button');
        if (button) {
            const originalContent = button.innerHTML;
            button.innerHTML = '<div class="flex items-center"><div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>Downloading...</div>';

            setTimeout(() => {
                button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Downloaded!';
                setTimeout(() => {
                    button.innerHTML = originalContent;

                    // Update download count locally
                    setFilteredNotes(prev => prev.map(n =>
                        n.id === note.id ? { ...n, downloadCount: n.downloadCount + 1 } : n
                    ));
                }, 2000);
            }, 1500);
        }
    };

    const handleRate = (note, rating = 5) => {
        console.log('Rating:', note.title, 'with', rating, 'stars');

        // Update rating locally with simulated calculation
        const newReviewCount = note.reviewCount + 1;
        const newAverageRating = ((note.averageRating * note.reviewCount) + rating) / newReviewCount;

        setFilteredNotes(prev => prev.map(n =>
            n.id === note.id ? {
                ...n,
                averageRating: Number(newAverageRating.toFixed(1)),
                reviewCount: newReviewCount
            } : n
        ));

        alert(`Thank you for rating "${note.title}" with ${rating} stars!`);
    };

    // Save search to recent searches
    const addToRecentSearches = (searchTerm) => {
        if (searchTerm && searchTerm.length > 2) {
            setRecentSearches(prev => {
                const filtered = prev.filter(term => term !== searchTerm);
                return [searchTerm, ...filtered].slice(0, 5);
            });
        }
    };

    const handleSearchSubmit = (searchTerm) => {
        addToRecentSearches(searchTerm);
        setShowSuggestions(false);
    }; const clearAllFilters = () => {
        setFilters({ search: '', subject: '', sort: 'newest' });
        setSelectedCategories([]);
        setQuickFilterActive(null);
        setShowSuggestions(false);
    };

    return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Hanken_Grotesk']">
                {/* Hero Header */}
                <div className="text-center mb-12 ">
                    <div data-aos="fade-up">
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
                </div>

                {/* Enhanced Search and Filter Bar */}
                <div data-aos="fade-up">
                    <Card variant="glass" className="mb-8  ">
                        <CardContent className="p-6">
                            {/* Main Search Row */}
                            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                                {/* Search Input */}
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />                                <input
                                        type="text"
                                        placeholder="Search by title, description, or tags..."
                                        value={filters.search}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearchSubmit(filters.search);
                                            }
                                        }}
                                        onFocus={() => generateSearchSuggestions(filters.search)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                    />

                                    {/* Search Suggestions Dropdown */}
                                    {showSuggestions && searchSuggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-md z-50 max-h-60 overflow-y-auto">
                                            {searchSuggestions.map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="w-full px-4 py-3 text-left hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-2 h-2 rounded-full ${suggestion.type === 'title' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                                                        <span className="text-sm text-gray-700 group-hover:text-blue-600">{suggestion.text}</span>
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {suggestion.count} {suggestion.count === 1 ? 'note' : 'notes'}
                                                    </Badge>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>                            {/* Enhanced View Toggle */}
                                <div className="flex items-center space-x-2">
                                    <div className="flex rounded-xl border border-gray-200/50 p-1 bg-white/50 gap-2">
                                        {viewOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.key}
                                                    onClick={() => setCurrentView(option.key)}
                                                    className={`p-2 rounded-lg transition-all duration-300 ${currentView === option.key
                                                        ? 'bg-blue-600 text-white shadow-md'
                                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                                        }`}
                                                    title={option.label}
                                                >
                                                    <Icon className="w-6 h-6 " />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex flex-nowrap items-center space-x-2"
                                    >
                                        <SlidersHorizontal className="w-4 h-4 inline mr-2" />
                                        <span className='inline'>Filters</span>
                                    </Button>
                                </div>
                            </div>

                            {/* Expandable Filters */}
                            {showFilters && (
                                <div className="border-t border-gray-200/50 pt-6 space-y-6 ">                                {/* Subject Filter with Multi-select */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Subject Categories
                                            {selectedCategories.length > 0 && (
                                                <span className="ml-2 text-xs text-blue-600">
                                                    ({selectedCategories.length} selected)
                                                </span>
                                            )}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {subjects.map((subject) => {
                                                const isSelected = subject === 'All'
                                                    ? selectedCategories.length === 0
                                                    : selectedCategories.includes(subject);

                                                return (
                                                    <button
                                                        key={subject}
                                                        onClick={() => {
                                                            if (subject === 'All') {
                                                                setSelectedCategories([]);
                                                                handleFilterChange('subject', '');
                                                            } else {
                                                                const newSelected = isSelected
                                                                    ? selectedCategories.filter(cat => cat !== subject)
                                                                    : [...selectedCategories, subject];
                                                                setSelectedCategories(newSelected);
                                                                handleFilterChange('subject', newSelected.join(','));
                                                            }
                                                        }}
                                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isSelected
                                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                            : 'bg-white/50 text-gray-700 border border-gray-200/50 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-200/50'
                                                            }`}
                                                    >
                                                        {subject}
                                                        {isSelected && subject !== 'All' && (
                                                            <span className="ml-2 text-xs">✓</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
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
                                                        onClick={() => handleFilterChange('sort', option.value)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filters.sort === option.value
                                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
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

                                    {/* Popular Tags Quick Filter */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Popular Tags
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {popularTags.map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => handleFilterChange('search', tag)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200/50 hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700 hover:border-blue-200/50 transition-all duration-300"
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Searches */}
                                    {recentSearches.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Recent Searches
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {recentSearches.map((search, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleFilterChange('search', search)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200/50 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-200/50 transition-all duration-300"
                                                    >
                                                        {search}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Clear All Filters */}
                                    {(filters.search || filters.subject) && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <Button
                                                variant="outline"
                                                onClick={clearAllFilters}
                                                className="w-full bg-red-50/50 text-red-600 border-red-200/50 hover:bg-red-100/50 hover:text-red-700"
                                            >
                                                Clear All Filters
                                            </Button>
                                        </div>)}
                                </div>
                            )}

                            {/* Filter Statistics */}
                            {filterStats.total > 0 && (
                                <div className="border-t border-gray-200/50 pt-4 mt-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div className="bg-blue-50/50 rounded-lg p-3">
                                            <div className="text-2xl lg:text-3xl font-bold text-blue-600">{filterStats.filtered}</div>
                                            <div className="text-sm text-blue-700">Results</div>
                                        </div>
                                        <div className="bg-green-50/50 rounded-lg p-3">
                                            <div className="text-2xl lg:text-3xl font-bold text-green-600">{filterStats.total}</div>
                                            <div className="text-sm text-green-700">Total Notes</div>
                                        </div>
                                        <div className="bg-purple-50/50 rounded-lg p-3">
                                            <div className="text-2xl lg:text-3xl font-bold text-purple-600">{filterStats.avgRating}</div>
                                            <div className="text-sm text-purple-700">Avg Rating</div>
                                        </div>
                                        <div className="bg-orange-50/50 rounded-lg p-3">
                                            <div className="text-2xl lg:text-3xl font-bold text-orange-600">
                                                {Object.keys(filterStats.bySubject || {}).length}
                                            </div>
                                            <div className="text-sm text-orange-700">Categories</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Filters Bar */}
                <div data-aos="fade-up" data-aos-delay="300" className="mb-8  ">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">Quick Filters</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuickFilterActive(null)}
                            className={quickFilterActive ? 'opacity-100' : 'opacity-50'}
                        >
                            Clear All
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickFilters.map((filter) => {
                            const Icon = filter.icon;
                            const isActive = quickFilterActive === filter.key;
                            return (
                                <button
                                    key={filter.key}
                                    onClick={() => setQuickFilterActive(isActive ? null : filter.key)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${isActive
                                        ? 'border-blue-500 bg-blue-50/50 shadow-md'
                                        : 'border-gray-200/50 hover:border-blue-300 hover:bg-blue-50/30'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                            }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className={`font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                                            {filter.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{filter.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Stats Bar */}
                <div data-aos="fade-up" data-aos-delay="500" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8  ">
                    <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
                        <div className="text-2xl lg:text-3xl font-bold text-blue-600">{notes.length}</div>
                        <div className="text-sm text-blue-700">Total Notes</div>
                    </Card>
                    <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
                        <div className="text-2xl lg:text-3xl font-bold text-green-600">
                            {notes.reduce((sum, note) => sum + (note.downloadCount || 0), 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700">Downloads</div>
                    </Card>
                    <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50">
                        <div className="text-2xl lg:text-3xl font-bold text-purple-600">
                            {Array.from(new Set(notes.map(note => note.subject))).length}
                        </div>
                        <div className="text-sm text-purple-700">Subjects</div>
                    </Card>
                    <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
                        <div className="text-2xl lg:text-3xl font-bold text-orange-600">
                            {(notes.reduce((sum, note) => sum + (note.averageRating || 0), 0) / notes.length).toFixed(1)}
                        </div>
                        <div className="text-sm text-orange-700">Avg Rating</div>
                    </Card>
                </div>

                {/* Upload CTA and Results Info */}
                <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-lg">
                    <div className="flex items-center space-x-4">
                        <Badge variant="gradient" className="px-5 py-3 text-xl font-bold">
                            {filteredNotes.length} Results
                        </Badge>
                        {filters.search && (
                            <span className="text-lg text-gray-600">
                                for "<span className="font-semibold text-blue-600">{filters.search}</span>"
                            </span>
                        )}
                        {filters.subject && filters.subject !== '' && (
                            <Badge variant="outline" className="px-5 py-3 text-xl font-bold">
                                {filters.subject}
                            </Badge>
                        )}
                    </div>
                    <a href="/upload">
                        <Button variant="gradient" className="flex items-center shadow-md">
                            <Plus className="inline w-5 h-5" />
                            <span className='ml-2'>Upload Note</span>
                        </Button>
                    </a>
                </div>                {/* Notes Grid/List */}
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-20 ">                        <div className="relative mb-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto shadow-md">
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
                        </p>                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/upload">
                                <Button variant="gradient" size="lg" className="inline px-8 py-4">
                                    <Plus className="w-5 h-5 mr-2 inline" />
                                    Upload First Note
                                </Button>
                            </a>
                            {(filters.search || filters.subject) && (<Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4"
                                onClick={clearAllFilters}
                            >
                                Clear Filters
                            </Button>
                            )}
                        </div>
                    </div>) : (
                    <div className={`  ${currentView === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : currentView === 'list'
                            ? 'space-y-6'
                            : currentView === 'compact'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                                : 'space-y-6'
                        }`}>
                        {filteredNotes.map((note, index) => (
                            <div
                                key={note.id}
                                data-aos="fade-up" data-aos-delay="500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <NoteCard
                                    note={note}
                                    compact={currentView === 'list' || currentView === 'compact'}
                                    mini={currentView === 'compact'}
                                    onDownload={handleDownload}
                                    onRate={handleRate}
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Load More */}
                {filteredNotes.length > 0 && filteredNotes.length >= 6 && (
                    <div className="text-center mt-16 ">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 py-4"
                            onClick={() => {
                                // Simulate loading more notes
                                setLoading(true);
                                setTimeout(() => {
                                    const additionalNotes = generateDummyNotes().slice(0, 3);
                                    const updatedNotes = additionalNotes.map((note, index) => ({
                                        ...note,
                                        id: `${note.id}_additional_${index}`,
                                        title: `${note.title} (Additional ${index + 1})`
                                    }));
                                    setNotes(prev => [...prev, ...updatedNotes]);
                                    setLoading(false);
                                }, 1000);
                            }}
                        >
                            {loading ? 'Loading...' : 'Load More Notes'}
                        </Button>
                    </div>
                )}{/* Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <a href="/upload">                        <Button
                        variant="gradient"
                        className="w-14 h-14 rounded-full shadow-md transform transition-all duration-300"
                        title="Upload New Note"
                    >
                        <Plus className="w-6 h-6" />
                    </Button>
                    </a>
                </div>
            </div>            </Layout>
    );
};

export default NotesPage;


