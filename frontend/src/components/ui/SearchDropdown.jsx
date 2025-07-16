import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, FileText, User, Hash, Clock } from 'lucide-react';
import { generateDummyNotes } from '@data/dummyData';

const SearchDropdown = ({ isOpen, searchQuery, onClose }) => {
    const [searchResults, setSearchResults] = useState({
        notes: [],
        users: [],
        subjects: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [allNotes] = useState(() => generateDummyNotes());

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults({ notes: [], users: [], subjects: [] });
            return;
        }

        setIsLoading(true);

        // Simulate search delay
        const searchTimeout = setTimeout(() => {
            const query = searchQuery.toLowerCase();            // Search in notes
            const matchingNotes = allNotes.filter(note =>
                note.title.toLowerCase().includes(query) ||
                note.subject.toLowerCase().includes(query) ||
                note.description.toLowerCase().includes(query) ||
                note.tags.some(tag => tag.toLowerCase().includes(query))
            ).slice(0, 5);

            // Search in subjects (unique subjects from notes)
            const allSubjects = [...new Set(allNotes.map(note => note.subject))];
            const matchingSubjects = allSubjects.filter(subject =>
                subject.toLowerCase().includes(query)
            ).slice(0, 3);

            // Mock user search (in real app, this would be an API call)
            const mockUsers = [
                { id: '1', name: 'Ahmad Rizki', avatar: null, university: 'ITB' },
                { id: '2', name: 'Sari Indah', avatar: null, university: 'UGM' },
                { id: '3', name: 'Budi Santoso', avatar: null, university: 'UI' }
            ];
            const matchingUsers = mockUsers.filter(user =>
                user.name.toLowerCase().includes(query) ||
                user.university.toLowerCase().includes(query)
            ).slice(0, 3); setSearchResults({
                notes: matchingNotes,
                users: matchingUsers,
                subjects: matchingSubjects
            });

            setIsLoading(false);
        }, 300); return () => clearTimeout(searchTimeout);
    }, [searchQuery, allNotes]);

    if (!isOpen) return null;

    const totalResults = searchResults.notes.length + searchResults.users.length + searchResults.subjects.length;

    return (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
            {isLoading ? (
                <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Mencari...</p>
                </div>
            ) : totalResults === 0 && searchQuery.trim() ? (
                <div className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada hasil ditemukan</h3>
                    <p className="text-xs text-gray-500">
                        Coba gunakan kata kunci yang berbeda atau periksa ejaan
                    </p>
                    <Link
                        to={`/notes?search=${encodeURIComponent(searchQuery)}`}
                        className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        onClick={onClose}
                    >
                        <Search className="h-4 w-4" />
                        Cari di semua catatan
                    </Link>
                </div>
            ) : totalResults > 0 ? (
                <div className="py-2">
                    {/* Notes Section */}
                    {searchResults.notes.length > 0 && (
                        <div className="mb-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                Catatan ({searchResults.notes.length})
                            </div>
                            {searchResults.notes.map((note) => (
                                <Link
                                    key={note.id}
                                    to={`/notes/${note.id}`}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <FileText className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {note.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate">
                                            {note.subject} • {note.author.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-400">
                                                {new Date(note.uploadDate).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Subjects Section */}
                    {searchResults.subjects.length > 0 && (
                        <div className="mb-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                Mata Kuliah ({searchResults.subjects.length})
                            </div>
                            {searchResults.subjects.map((subject, index) => (
                                <Link
                                    key={index}
                                    to={`/notes?subject=${encodeURIComponent(subject)}`}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Hash className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">                                        <h4 className="text-sm font-medium text-gray-900">{subject}</h4>
                                        <p className="text-xs text-gray-500">
                                            {allNotes.filter(note => note.subject === subject).length} catatan tersedia
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Users Section */}
                    {searchResults.users.length > 0 && (
                        <div className="mb-2">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                Pengguna ({searchResults.users.length})
                            </div>
                            {searchResults.users.map((user) => (
                                <Link
                                    key={user.id}
                                    to={`/profile/${user.id}`}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <User className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                                        <p className="text-xs text-gray-500">{user.university}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* See All Results */}
                    <div className="border-t border-gray-100 pt-2">
                        <Link
                            to={`/notes?search=${encodeURIComponent(searchQuery)}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors text-sm font-medium"
                            onClick={onClose}
                        >
                            <Search className="h-4 w-4" />
                            Lihat semua hasil untuk "{searchQuery}"
                        </Link>
                    </div>
                </div>
            ) : searchQuery.trim() === '' ? (
                <div className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="lg:text-sm font-medium text-gray-900 mb-1">Cari catatan, mata kuliah, atau pengguna</h3>
                    <p className="text-sm lg:text-xs text-gray-500">
                        Ketik kata kunci untuk mulai mencari
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default SearchDropdown;
