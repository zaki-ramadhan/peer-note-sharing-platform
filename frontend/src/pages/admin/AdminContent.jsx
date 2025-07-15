import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState('notes');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

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
    ]); const tabs = [
        { id: 'notes', name: 'Notes', icon: FileText, count: notes.length },
        { id: 'posts', name: 'Forum Posts', icon: MessageSquare, count: posts.length }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'flagged':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
        });

    const ContentActions = ({ item, type }) => (
        <div className="flex space-x-2">            <button
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="View"
        >
            <Eye className="h-4 w-4" />
        </button>
            {item.status === 'pending' && (
                <>                    <button
                    onClick={() => handleContentAction(type, item.id, 'approved')}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Approve"
                >
                    <Check className="h-4 w-4" />
                </button><button
                    onClick={() => handleContentAction(type, item.id, 'rejected')}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Reject"
                >
                        <X className="h-4 w-4" />
                    </button>
                </>
            )}
            {item.reports > 0 && (<button
                className="p-1 text-orange-600 hover:bg-orange-50 rounded"
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
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Content Management
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Review and moderate user-generated content.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon className="h-5 w-5 mr-2" />
                            {tab.name}
                            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="flagged">Flagged</option>
                    </select>

                    {/* Quick Actions */}
                    <div className="flex space-x-2">                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-2" />
                        Bulk Actions
                    </button>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {activeTab === 'notes' ? 'Note' : 'Post'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {activeTab === 'notes' ? 'Subject' : 'Category'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stats
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredContent.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.title}
                                        </div>
                                        {activeTab === 'notes' && item.size && (
                                            <div className="text-sm text-gray-500">
                                                {item.size}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {activeTab === 'notes' ? item.subject : item.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>                                        {item.reports > 0 && (
                                            <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                {item.reports}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {activeTab === 'notes' ? (
                                            <div>
                                                <div>{item.downloads} downloads</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div>{item.replies} replies</div>
                                                <div>{item.views} views</div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                        <p className="text-gray-500">No {activeTab} found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Pending Review</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {[...notes, ...posts].filter(item => item.status === 'pending').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Approved</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {[...notes, ...posts].filter(item => item.status === 'approved').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                            <X className="h-5 w-5 text-white" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Rejected</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {[...notes, ...posts].filter(item => item.status === 'rejected').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Reported</p>
                            <p className="text-2xl font-semibold text-gray-900">
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
