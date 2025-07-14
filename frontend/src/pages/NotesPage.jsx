import { useState, useEffect } from 'react';
import { Layout } from '../components/layout';
import { NoteCard, NoteFilters } from '../components/notes';
import { Button } from '../components/ui';
import { Plus } from 'lucide-react';
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

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const dummyNotes = generateDummyNotes();
            setNotes(dummyNotes);
            setFilteredNotes(dummyNotes);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        // Apply filters and sorting
        let filtered = [...notes];

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }

        // Subject filter
        if (filters.subject) {
            filtered = filtered.filter(note => note.subject === filters.subject);
        }

        // Sorting
        switch (filters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
                break;
            case 'rating':
                filtered.sort((a, b) => b.averageRating - a.averageRating);
                break;
            case 'downloads':
                filtered.sort((a, b) => b.downloadCount - a.downloadCount);
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        setFilteredNotes(filtered);
    }, [notes, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleSortChange = (sort) => {
        setFilters(prev => ({ ...prev, sort }));
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const handleDownload = (note) => {
        // Simulate download
        console.log('Downloading:', note.title);
        // In real app, this would trigger file download
        alert(`Download dimulai: ${note.title}`);
    };

    const handleRate = (note) => {
        // Open rating modal
        console.log('Rating:', note.title);
        alert(`Fitur rating untuk: ${note.title}`);
    };

    if (loading) {
        return (
            <Layout user={currentUser}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-32 bg-gray-200 rounded mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout user={currentUser}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Catatan Tersedia</h1>
                        <p className="text-gray-600 mt-2">
                            Temukan {filteredNotes.length} catatan berkualitas dari komunitas
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Button className="flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Upload Catatan
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <NoteFilters
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    onViewChange={handleViewChange}
                    currentView={currentView}
                    filters={filters}
                    className="mb-8"
                />

                {/* Notes Grid/List */}
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Tidak ada catatan ditemukan
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Coba ubah filter pencarian atau upload catatan pertama Anda.
                        </p>
                        <Button>Upload Catatan Baru</Button>
                    </div>
                ) : (
                    <div className={`${currentView === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-4'
                        }`}>
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                compact={currentView === 'list'}
                                onDownload={handleDownload}
                                onRate={handleRate}
                            />
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {filteredNotes.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Muat Lebih Banyak
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NotesPage;
