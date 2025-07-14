import { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { Button, Input, Badge } from '../ui';

const NoteFilters = ({
    onFilterChange,
    onSortChange,
    onViewChange,
    currentView = 'grid',
    filters = {},
    className
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedSubject, setSelectedSubject] = useState(filters.subject || '');
    const [selectedSort, setSelectedSort] = useState(filters.sort || 'newest');

    const subjects = [
        'Matematika',
        'Fisika',
        'Kimia',
        'Biologi',
        'Bahasa Indonesia',
        'Bahasa Inggris',
        'Sejarah',
        'Geografi',
        'Ekonomi',
        'Komputer',
        'Lainnya'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Terbaru' },
        { value: 'oldest', label: 'Terlama' },
        { value: 'rating', label: 'Rating Tertinggi' },
        { value: 'downloads', label: 'Paling Banyak Diunduh' },
        { value: 'title', label: 'Judul (A-Z)' }
    ];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange?.({ ...filters, search: value });
    };

    const handleSubjectChange = (subject) => {
        const newSubject = selectedSubject === subject ? '' : subject;
        setSelectedSubject(newSubject);
        onFilterChange?.({ ...filters, subject: newSubject });
    };

    const handleSortChange = (sort) => {
        setSelectedSort(sort);
        onSortChange?.(sort);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSubject('');
        setSelectedSort('newest');
        onFilterChange?.({ search: '', subject: '', sort: 'newest' });
        onSortChange?.('newest');
    };

    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
            {/* Top Row - Search and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                {/* Search */}
                <div className="flex-1">
                    <Input
                        icon={Search}
                        placeholder="Cari catatan, judul, atau deskripsi..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full"
                    />
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                    <div className="flex rounded-lg border border-gray-200">
                        <Button
                            variant={currentView === 'grid' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => onViewChange?.('grid')}
                            className="rounded-r-none"
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={currentView === 'list' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => onViewChange?.('list')}
                            className="rounded-l-none border-l"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="relative"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                        {activeFilterCount > 0 && (
                            <Badge variant="danger" size="sm" className="absolute -top-2 -right-2 h-5 w-5 text-xs">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                    {/* Subject Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mata Pelajaran
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {subjects.map((subject) => (
                                <Button
                                    key={subject}
                                    variant={selectedSubject === subject ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSubjectChange(subject)}
                                >
                                    {subject}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Urutkan
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {sortOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    variant={selectedSort === option.value ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSortChange(option.value)}
                                >
                                    {selectedSort === option.value && option.value === 'newest' && <SortDesc className="w-4 h-4 mr-1" />}
                                    {selectedSort === option.value && option.value === 'oldest' && <SortAsc className="w-4 h-4 mr-1" />}
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFilterCount > 0 && (
                        <div className="flex justify-end">
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                Hapus Semua Filter
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NoteFilters;
