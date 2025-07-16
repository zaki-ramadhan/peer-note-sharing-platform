import { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    UserPlus,
    Edit,
    Trash,
    XCircle,
    CheckCircle,
    Mail,
    Shield,
    Calendar,
    Activity,
    Eye,
    Download,
    X
} from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            status: 'active',
            joinDate: '2024-01-15',
            lastActive: '2 hours ago',
            notes: 25,
            posts: 12,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            role: 'user',
            status: 'active',
            joinDate: '2024-01-10',
            lastActive: '5 minutes ago',
            notes: 18,
            posts: 8,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 3,
            name: 'Mike Chen',
            email: 'mike@example.com',
            role: 'moderator',
            status: 'active',
            joinDate: '2023-12-05',
            lastActive: '1 day ago',
            notes: 42,
            posts: 31,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'emma@example.com',
            role: 'user',
            status: 'suspended',
            joinDate: '2024-01-08',
            lastActive: '3 days ago',
            notes: 7,
            posts: 3,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleUserAction = (action, user) => {
        switch (action) {
            case 'edit':
                setSelectedUser(user);
                setShowUserModal(true);
                break;
            case 'suspend':
                setUsers(users.map(u => u.id === user.id ? { ...u, status: 'suspended' } : u));
                break;
            case 'activate':
                setUsers(users.map(u => u.id === user.id ? { ...u, status: 'active' } : u));
                break;
            case 'delete':
                setUsers(users.filter(u => u.id !== user.id));
                break;
        }
        setActionMenuOpen(null);
    }; const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-900/50 text-purple-300 border border-purple-600/30';
            case 'moderator':
                return 'bg-blue-900/50 text-blue-300 border border-blue-600/30';
            default:
                return 'bg-gray-800/50 text-gray-300 border border-gray-600/30';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-900/50 text-green-300 border border-green-600/30';
            case 'suspended':
                return 'bg-red-900/50 text-red-300 border border-red-600/30';
            default:
                return 'bg-gray-800/50 text-gray-300 border border-gray-600/30';
        }
    };

    // Modal Components
    const UserModal = () => (<div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all border border-gray-700/50">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">                <h3 className="text-xl font-bold text-white">
                {selectedUser?.id ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </h3>
                <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>                <div className="p-6 space-y-4">
                <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama</label>
                    <input
                        type="text"
                        defaultValue={selectedUser?.name || ''}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400"
                        placeholder="Masukkan nama pengguna"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        defaultValue={selectedUser?.email || ''}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400"
                        placeholder="Masukkan alamat email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Peran</label>
                    <select
                        defaultValue={selectedUser?.role || 'user'}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white"
                    >
                        <option value="user">Pengguna</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                        defaultValue={selectedUser?.status || 'active'}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white"
                    >
                        <option value="active">Aktif</option>
                        <option value="suspended">Ditangguhkan</option>
                    </select>
                </div>
            </div>                <div className="flex space-x-3 p-6 border-t border-gray-700/50">
                <button onClick={() => setShowUserModal(false)}
                    className="flex-1 px-4 py-3 text-gray-300 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-600/50 focus:ring-4 focus:ring-gray-600/25 transition-all duration-200 font-medium"
                >
                    Batal
                </button>
                <button
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 font-medium"
                >
                    {selectedUser?.id ? 'Perbarui Pengguna' : 'Buat Pengguna'}
                </button>
            </div>
        </div>
    </div>
    ); const DeleteModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all border border-gray-700/50">
                <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-900/30 rounded-full border border-red-600/30">
                        <Trash className="w-8 h-8 text-red-400" />
                    </div>                    <h3 className="text-xl font-bold text-white text-center mb-2">
                        Hapus Pengguna
                    </h3>
                    <p className="text-gray-300 text-center mb-6">
                        Apakah Anda yakin ingin menghapus <strong className="text-white">{userToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex space-x-3">
                        <button onClick={() => setShowDeleteModal(false)}
                            className="flex-1 px-4 py-3 text-gray-300 bg-gray-700/50 border border-gray-600 rounded-xl hover:bg-gray-600/50 focus:ring-4 focus:ring-gray-600/25 transition-all duration-200 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            onClick={() => {
                                setUsers(users.filter(u => u.id !== userToDelete.id));
                                setShowDeleteModal(false);
                                setUserToDelete(null);
                            }}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-500/25 transition-all duration-200 font-medium"
                        >
                            Hapus Pengguna
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (<div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Manajemen Pengguna
            </h2>
                <p className="mt-1 text-sm text-gray-400">
                    Kelola akun pengguna, peran, dan izin.
                </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                    onClick={() => setShowUserModal(true)}
                    className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >                    <UserPlus className="h-4 w-4 mr-2" />
                    Tambah Pengguna
                </button>
            </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />                        <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                    />
                </div>

                {/* Role Filter */}                    <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white"
                >
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="all">Semua Role</option>
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="user">Pengguna</option>
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="moderator">Moderator</option>
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="admin">Admin</option>
                </select>

                {/* Status Filter */}                    <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white"
                >
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="all">Semua Status</option>
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="active">Aktif</option>
                    <option className='bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl' value="suspended">Ditangguhkan</option>
                </select>                    {/* Export Button */}                    <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Ekspor
                </button>
            </div>
        </div>            {/* Users Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-700/50">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                    <thead className="bg-gray-900/50">
                        <tr>                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Pengguna
                        </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Peran
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Aktivitas
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Konten
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Bergabung
                            </th>
                            <th className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-700/30">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            className="h-10 w-10 rounded-full ring-2 ring-gray-600"
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {user.lastActive}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">                                    <div className="text-sm">
                                    <div>{user.notes} catatan</div>
                                    <div>{user.posts} postingan</div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {user.joinDate}
                                </td>                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative"><button
                                    onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                                    className="text-gray-400 hover:text-gray-200 p-1 rounded-lg hover:bg-gray-700/30 transition-colors"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </button>{actionMenuOpen === user.id && (
                                    <div className="absolute right-8 top-full mt-1 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl z-10 border border-gray-700/50">
                                        <div className="py-1">                                                    <button
                                            onClick={() => handleUserAction('edit', user)}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                                        >                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Pengguna
                                        </button>
                                            {user.status === 'active' ? (<button
                                                onClick={() => handleUserAction('suspend', user)}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                                            >
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Tangguhkan Pengguna
                                            </button>
                                            ) : (<button
                                                onClick={() => handleUserAction('activate', user)}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Aktifkan Pengguna
                                            </button>
                                            )}                                                    <button
                                                onClick={() => {
                                                    setUserToDelete(user);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Hapus Pengguna
                                            </button>
                                        </div>
                                    </div>
                                )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">Tidak ada pengguna yang ditemukan sesuai kriteria Anda.</p>
                </div>
            )}
        </div>

        {/* User Modal */}
        {showUserModal && <UserModal />}

        {/* Delete User Modal */}
        {showDeleteModal && <DeleteModal />}
    </div>
    );
};

export default AdminUsers;
