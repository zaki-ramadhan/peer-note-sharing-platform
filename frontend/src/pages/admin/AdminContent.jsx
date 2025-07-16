import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {
    FileText,
    MessageSquare,
    Eye,
    Check,
    X,
    AlertTriangle,
    Filter,
    Search
} from 'lucide-react';

const AdminContent = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('notes');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Handle URL filter parameters (e.g., when coming from dashboard quick action)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const filter = searchParams.get('filter');
        if (filter === 'flagged') {
            setStatusFilter('flagged');
        }
    }, [location.search]);

    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Advanced React Patterns',
            author: 'Mike Chen',
            subject: 'Computer Science',
            uploadDate: '2024-01-15',
            status: 'pending',
            downloads: 0,
            reports: 0,
            size: '2.4 MB'
        },
        {
            id: 2,
            title: 'Database Design Fundamentals',
            author: 'Sarah Johnson',
            subject: 'Information Systems',
            uploadDate: '2024-01-14',
            status: 'approved',
            downloads: 156,
            reports: 0,
            size: '1.8 MB'
        },
        {
            id: 3,
            title: 'Physics Lab Report Template',
            author: 'John Doe',
            subject: 'Physics',
            uploadDate: '2024-01-13',
            status: 'rejected',
            downloads: 0,
            reports: 2,
            size: '890 KB'
        }
    ]);

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Best practices for studying algorithms',
            author: 'Emma Davis',
            category: 'Study Tips',
            postDate: '2024-01-15',
            status: 'approved',
            replies: 12,
            reports: 0,
            views: 245
        },
        {
            id: 2,
            title: 'Need help with calculus integration',
            author: 'Alex Wilson',
            category: 'Questions',
            postDate: '2024-01-14',
            status: 'pending',
            replies: 3,
            reports: 0,
            views: 89
        },
        {
            id: 3,
            title: 'Sharing my notes collection',
            author: 'Lisa Brown',
            category: 'Resources',
            postDate: '2024-01-13',
            status: 'flagged',
            replies: 7,
            reports: 3,
            views: 156
        }
    ]); const tabs = [{ id: 'notes', name: 'Catatan', icon: FileText, count: notes.length },
    { id: 'posts', name: 'Post Forum', icon: MessageSquare, count: posts.length }
    ]; const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-900/50 text-green-300 border border-green-600/30';
            case 'pending':
                return 'bg-yellow-900/50 text-yellow-300 border border-yellow-600/30';
            case 'rejected':
                return 'bg-red-900/50 text-red-300 border border-red-600/30';
            case 'flagged':
                return 'bg-orange-900/50 text-orange-300 border border-orange-600/30';
            default:
                return 'bg-gray-800/50 text-gray-300 border border-gray-600/30';
        }
    };

    const handleContentAction = (type, id, action) => {
        if (type === 'notes') {
            setNotes(notes.map(note =>
                note.id === id ? { ...note, status: action } : note
            ));
        } else {
            setPosts(posts.map(post =>
                post.id === id ? { ...post, status: action } : post
            ));
        }
    };

    const filteredContent = activeTab === 'notes'
        ? notes.filter(note => {
            const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        : posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
            return matchesSearch && matchesStatus;
        }); const ContentActions = ({ item, type }) => (
            <div className="flex space-x-2">
                <button
                    className="p-1 text-blue-400 hover:bg-blue-900/30 rounded"
                    title="View"
                >
                    <Eye className="h-4 w-4" />
                </button>
                {item.status === 'pending' && (
                    <>
                        <button
                            onClick={() => handleContentAction(type, item.id, 'approved')}
                            className="p-1 text-green-400 hover:bg-green-900/30 rounded"
                            title="Approve"
                        >
                            <Check className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handleContentAction(type, item.id, 'rejected')}
                            className="p-1 text-red-400 hover:bg-red-900/30 rounded"
                            title="Reject"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                )}            {item.reports > 0 && (
                    <button
                        className="p-1 text-orange-400 hover:bg-orange-900/30 rounded"
                        title="View Reports"
                    >
                        <AlertTriangle className="h-4 w-4" />
                    </button>
                )}
            </div>
        );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Manajemen Konten
                </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Tinjau dan moderasi konten yang dibuat pengguna.
                    </p>
                </div>
            </div>            {/* Tabs */}
            <div className="border-b border-gray-700/50">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-blue-400 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                                }`}
                        >
                            <tab.icon className="h-5 w-5 mr-2" />
                            {tab.name}
                            <span className="ml-2 bg-gray-700/50 text-gray-300 py-0.5 px-2 rounded-full text-xs">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>            {/* Filters */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />                        <input
                            type="text"
                            placeholder={`Cari ${activeTab === 'notes' ? 'catatan' : 'postingan'}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white"
                    >                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu</option>
                        <option value="approved">Disetujui</option>
                        <option value="rejected">Ditolak</option>
                        <option value="flagged">Dilaporkan</option>
                    </select>

                    {/* Quick Actions */}
                    <div className="flex space-x-2">                        <button className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                        <Filter className="h-4 w-4 mr-2" />
                        Aksi Massal
                    </button>
                    </div>
                </div>
            </div>            {/* Content Table */}
            <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-700/50">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700/50">
                        <thead className="bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" />
                                </th>                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    {activeTab === 'notes' ? 'Catatan' : 'Post'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Penulis
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    {activeTab === 'notes' ? 'Mata Pelajaran' : 'Kategori'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Statistik
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Tanggal
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
                            {filteredContent.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-700/30">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white">
                                            {item.title}
                                        </div>
                                        {activeTab === 'notes' && item.size && (
                                            <div className="text-sm text-gray-400">
                                                {item.size}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {item.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {activeTab === 'notes' ? item.subject : item.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>                                        {item.reports > 0 && (
                                            <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-red-900/50 text-red-300 rounded-full border border-red-600/30">
                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                {item.reports}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {activeTab === 'notes' ? (
                                            <div>
                                                <div>{item.downloads} unduhan</div>
                                            </div>
                                        ) : (
                                            <div>                                            <div>{item.replies} balasan</div>
                                                <div>{item.views} dilihat</div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {activeTab === 'notes' ? item.uploadDate : item.postDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <ContentActions item={item} type={activeTab} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredContent.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Tidak ada {activeTab} yang sesuai dengan kriteria Anda.</p>
                    </div>
                )}
            </div>            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-yellow-900/50 rounded-lg flex items-center justify-center border border-yellow-600/30">
                            <FileText className="h-5 w-5 text-yellow-400" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Pending Review</p>
                            <p className="text-2xl font-semibold text-white">
                                {[...notes, ...posts].filter(item => item.status === 'pending').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center border border-green-600/30">
                            <Check className="h-5 w-5 text-green-400" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Disetujui</p>
                            <p className="text-2xl font-semibold text-white">
                                {[...notes, ...posts].filter(item => item.status === 'approved').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-red-900/50 rounded-lg flex items-center justify-center border border-red-600/30">
                            <X className="h-5 w-5 text-red-400" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Rejected</p>
                            <p className="text-2xl font-semibold text-white">
                                {[...notes, ...posts].filter(item => item.status === 'rejected').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-orange-900/50 rounded-lg flex items-center justify-center border border-orange-600/30">
                            <AlertTriangle className="h-5 w-5 text-orange-400" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Reported</p>
                            <p className="text-2xl font-semibold text-white">
                                {[...notes, ...posts].filter(item => item.reports > 0).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;
