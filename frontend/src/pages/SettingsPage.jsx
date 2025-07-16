import { useState } from 'react';
import Layout from '@components/layout/Layout';
import { ConfirmationModal } from '@components/ui';
import { useAuth } from '@contexts/AuthContext';
import {
    User,
    Lock,
    Bell,
    Eye,
    Shield,
    Mail,
    Phone,
    MapPin,
    Save,
    Trash2,
    Upload,
    Camera,
    Check,
    X
} from 'lucide-react';

const SettingsPage = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Initialize with user data or default values
    const [profileData, setProfileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phone: user?.phone || '+62 812 3456 7890',
        location: user?.location || 'Jakarta, Indonesia',
        bio: user?.bio || 'Computer Science student passionate about sharing knowledge and helping fellow students succeed.',
        website: user?.website || 'https://johndoe.dev'
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true,
        allowMessages: true,
        showActivity: true
    }); const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        newDownloads: true,
        newComments: true,
        newFollowers: true,
        systemUpdates: true,
        weeklyDigest: false
    });

    // Modal states
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState(null); const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Update user data in context
        updateUser(profileData);
        alert('Profile berhasil diperbarui!');
        console.log('Profile updated:', profileData);
    }; const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setShowPasswordModal(true);
    };

    const handlePasswordChange = async () => {
        setModalLoading(true);
        // Simulate password change
        setTimeout(() => {
            setModalLoading(false);
            setShowPasswordModal(false);
            alert('Password berhasil diubah!');
        }, 2000);
    };

    const handleEnable2FA = async () => {
        setModalLoading(true);
        // Simulate 2FA setup
        setTimeout(() => {
            setModalLoading(false);
            setShow2FAModal(false);
            alert('2FA berhasil diaktifkan!');
        }, 1500);
    }; const handleRevokeSession = async () => {
        setModalLoading(true);
        // Simulate session revocation
        console.log('Revoking session:', selectedSessionId);
        setTimeout(() => {
            setModalLoading(false);
            setShowRevokeModal(false);
            setSelectedSessionId(null);
            alert('Session berhasil dicabut!');
        }, 1000);
    };

    const handleExportData = async () => {
        setModalLoading(true);
        // Simulate data export
        setTimeout(() => {
            setModalLoading(false);
            setShowExportModal(false);
            alert('Request export data berhasil dikirim! Anda akan mendapat email konfirmasi.');
        }, 2000);
    };

    const handleDeactivateAccount = async () => {
        setModalLoading(true);
        // Simulate account deactivation
        setTimeout(() => {
            setModalLoading(false);
            setShowDeactivateModal(false);
            alert('Akun berhasil dinonaktifkan. Anda akan diarahkan ke halaman login.');
            // In real app, redirect to login
        }, 2000);
    };

    const handleDeleteAccount = async () => {
        setModalLoading(true);
        // Simulate account deletion
        setTimeout(() => {
            setModalLoading(false);
            setShowDeleteModal(false);
            alert('Akun berhasil dihapus secara permanen.');
            // In real app, redirect to home
        }, 2000);
    }; const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Keamanan', icon: Lock },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
        { id: 'privacy', label: 'Privasi', icon: Eye },
        { id: 'account', label: 'Akun', icon: Shield }
    ];

    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div
                    className="mb-8"
                >                    <h1 data-aos="fade-up" className="text-3xl font-bold text-gray-900 mb-2">Pengaturan</h1>
                    <p data-aos="fade-up" className="text-gray-600">Kelola pengaturan akun dan preferensi Anda</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div
                        className="lg:w-64"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const IconComponent = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div data-aos="fade-up" data-aos-delay="200" className="flex-1">
                        {/* Profile Settings */}
                        {activeTab === 'profile' && (<div data-aos="fade-up" data-aos-delay="200"
                            className="bg-white rounded-xl shadow-sm p-8"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Informasi Profil</h2>

                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                {/* Avatar Upload */}
                                <div
                                    className="flex items-center gap-6"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <Camera className="w-4 h-4" />
                                            Ubah Avatar
                                        </button>                                            <p className="text-sm text-gray-500 mt-3">
                                            JPG, PNG atau GIF. Maksimal 2MB.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >                                        <div>                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap
                                </label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Email
                                    </label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Telepon
                                    </label>
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lokasi
                                    </label>
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Situs Web
                                    </label>
                                        <input
                                            type="url"
                                            value={profileData.website}
                                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ceritakan tentang diri Anda..."
                                        />
                                    </div>
                                </div>                                    <div
                                    className="pt-6 border-t"
                                >
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                    >                                        <Save className="w-4 h-4" />
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div
                                className="bg-white rounded-xl shadow-sm p-8"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pengaturan Keamanan</h2>

                                <div className="space-y-8">
                                    {/* Change Password */}
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Ubah Kata Sandi</h3>
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                            <div>                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kata Sandi Saat Ini
                                            </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kata Sandi Baru
                                            </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Konfirmasi Kata Sandi Baru
                                            </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>                                            <button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                            >
                                                Perbarui Kata Sandi
                                            </button>
                                        </form>
                                    </div>                                    {/* Two-Factor Authentication */}
                                    <div
                                        className="pt-8 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                    >                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Autentikasi Dua Faktor</h3>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Autentikasi SMS</p>
                                                <p className="text-sm text-gray-600">Amankan akun Anda dengan verifikasi SMS</p>
                                            </div>                                            <button
                                                onClick={() => setShow2FAModal(true)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Aktifkan
                                            </button>
                                        </div>
                                    </div>                                    {/* Login Sessions */}
                                    <div
                                        className="pt-8 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="600"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sesi Aktif</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>                                                    <p className="font-medium text-gray-900">Sesi Saat Ini</p>
                                                    <p className="text-sm text-gray-600">Chrome on Windows • Jakarta, Indonesia</p>
                                                </div>
                                                <span className="text-green-600 text-sm font-medium">Aktif Sekarang</span>
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">Aplikasi Mobile</p>
                                                    <p className="text-sm text-gray-600">Android • Last seen 2 hours ago</p>
                                                </div>                                                <button
                                                    onClick={() => {
                                                        setSelectedSessionId('mobile-session-1');
                                                        setShowRevokeModal(true);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Revoke
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Notification Settings */}
                        {activeTab === 'notifications' && (
                            <div
                                className="bg-white rounded-xl shadow-sm p-8"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preferensi Notifikasi</h2>

                                <div className="space-y-6">
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Metode Pengiriman</h3>
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={notificationSettings.emailNotifications}
                                                    onChange={(e) => setNotificationSettings({
                                                        ...notificationSettings,
                                                        emailNotifications: e.target.checked
                                                    })}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <div>                                                    <p className="font-medium text-gray-900">Notifikasi Email</p>
                                                    <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={notificationSettings.pushNotifications}
                                                    onChange={(e) => setNotificationSettings({
                                                        ...notificationSettings,
                                                        pushNotifications: e.target.checked
                                                    })}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <div>                                                    <p className="font-medium text-gray-900">Notifikasi Push</p>
                                                    <p className="text-sm text-gray-600">Terima notifikasi push di browser</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>                                    <div
                                        className="pt-6 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifikasi Aktivitas</h3>
                                        <div className="space-y-4">
                                            {[{ key: 'newDownloads', label: 'Unduhan Baru', desc: 'Ketika seseorang mengunduh catatan Anda' },
                                            { key: 'newComments', label: 'Komentar Baru', desc: 'Ketika seseorang berkomentar pada konten Anda' },
                                            { key: 'newFollowers', label: 'Pengikut Baru', desc: 'Ketika seseorang mengikuti Anda' },
                                            { key: 'systemUpdates', label: 'Update Sistem', desc: 'Update platform penting dan pengumuman' },
                                            { key: 'weeklyDigest', label: 'Ringkasan Mingguan', desc: 'Ringkasan mingguan aktivitas Anda' }
                                            ].map((item) => (
                                                <label key={item.key} className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={notificationSettings[item.key]}
                                                        onChange={(e) => setNotificationSettings({
                                                            ...notificationSettings,
                                                            [item.key]: e.target.checked
                                                        })}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.label}</p>
                                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>                                    <div
                                        className="pt-6 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                        data-aos-offset="-100"
                                    >                                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                                            <Save className="w-4 h-4" />
                                            Simpan Preferensi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeTab === 'privacy' && (
                            <div
                                className="bg-white rounded-xl shadow-sm p-8"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pengaturan Privasi</h2>

                                <div className="space-y-6">                                    <div data-aos="fade-up" data-aos-delay="200">                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Visibilitas Profil</h3>
                                    <div className="space-y-3">
                                        {[
                                            { value: 'public', label: 'Publik', desc: 'Siapa saja dapat melihat profil Anda' }, { value: 'students', label: 'Hanya Mahasiswa', desc: 'Hanya mahasiswa terverifikasi yang dapat melihat profil Anda' },
                                            { value: 'private', label: 'Privat', desc: 'Hanya Anda yang dapat melihat profil' }
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="profileVisibility"
                                                    value={option.value}
                                                    checked={privacySettings.profileVisibility === option.value}
                                                    onChange={(e) => setPrivacySettings({
                                                        ...privacySettings,
                                                        profileVisibility: e.target.value
                                                    })}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />                                                    <div>
                                                    <p className="font-medium text-gray-900">{option.label}</p>
                                                    <p className="text-sm text-gray-600">{option.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>                                    <div
                                    className="pt-6 border-t"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Visibilitas Informasi</h3>
                                        <div className="space-y-4">
                                            {[
                                                { key: 'showEmail', label: 'Tampilkan Alamat Email', desc: 'Tampilkan email Anda di profil' },
                                                { key: 'showPhone', label: 'Tampilkan Nomor Telepon', desc: 'Tampilkan nomor telepon Anda di profil' },
                                                { key: 'showLocation', label: 'Tampilkan Lokasi', desc: 'Tampilkan lokasi Anda di profil' },
                                                { key: 'allowMessages', label: 'Izinkan Pesan Langsung', desc: 'Biarkan pengguna lain mengirim pesan kepada Anda' },
                                                { key: 'showActivity', label: 'Tampilkan Status Aktivitas', desc: 'Tampilkan kapan Anda terakhir online' }
                                            ].map((item) => (
                                                <label key={item.key} className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={privacySettings[item.key]}
                                                        onChange={(e) => setPrivacySettings({
                                                            ...privacySettings,
                                                            [item.key]: e.target.checked
                                                        })}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.label}</p>
                                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>                                    <div
                                        className="pt-6 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        data-aos-offset="-100"
                                    >
                                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                                            <Save className="w-4 h-4" />
                                            Simpan Pengaturan Privasi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}                        {/* Account Management */}
                        {activeTab === 'account' && (
                            <div
                                className="space-y-8"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >                                {/* Export Data */}
                                <div
                                    className="bg-white rounded-xl shadow-sm p-8"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ekspor Data Anda</h3>
                                    <p className="text-gray-600 mb-6">
                                        Unduh salinan semua data Anda termasuk catatan, komentar, dan informasi profil.
                                    </p><button
                                        onClick={() => setShowExportModal(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        Minta Ekspor Data
                                    </button>
                                </div>                                {/* Deactivate Account */}
                                <div
                                    className="bg-white rounded-xl shadow-sm p-8"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Nonaktifkan Akun</h3>
                                    <p className="text-gray-600 mb-6">
                                        Nonaktifkan akun Anda sementara. Anda dapat mengaktifkannya kembali kapan saja dengan masuk.
                                    </p><button
                                        onClick={() => setShowDeactivateModal(true)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        Nonaktifkan Akun
                                    </button>
                                </div>                                {/* Delete Account */}
                                <div
                                    className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-red-500"
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                >                                    <h3 className="text-xl font-semibold text-red-600 mb-4">Zona Berbahaya</h3>
                                    <p className="text-gray-600 mb-6">
                                        Setelah Anda menghapus akun, tidak ada jalan untuk kembali. Pastikan Anda yakin.
                                    </p><button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Hapus Akun Permanen
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>                </div>
            </div>

            {/* Confirmation Modals */}

            {/* Password Change Modal */}
            <ConfirmationModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                onConfirm={handlePasswordChange}
                title="Konfirmasi Ubah Password"
                message="Apakah Anda yakin ingin mengubah password? Pastikan Anda telah mengisi form dengan benar."
                type="info"
                confirmText="Ya, Ubah Password"
                cancelText="Batal"
                loading={modalLoading}
            />

            {/* 2FA Enable Modal */}
            <ConfirmationModal
                isOpen={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                onConfirm={handleEnable2FA}
                title="Aktifkan Two-Factor Authentication"
                message="Anda akan diminta untuk verifikasi nomor telepon. Pastikan nomor yang terdaftar benar dan dapat menerima SMS."
                type="info"
                confirmText="Ya, Aktifkan 2FA"
                cancelText="Batal"
                loading={modalLoading}
            />

            {/* Revoke Session Modal */}
            <ConfirmationModal
                isOpen={showRevokeModal}
                onClose={() => setShowRevokeModal(false)}
                onConfirm={handleRevokeSession}
                title="Cabut Akses Session"
                message="Apakah Anda yakin ingin mencabut akses session ini? Device tersebut akan logout secara otomatis."
                type="warning"
                confirmText="Ya, Cabut Akses"
                cancelText="Batal"
                loading={modalLoading}
            />

            {/* Export Data Modal */}
            <ConfirmationModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                onConfirm={handleExportData}
                title="Request Export Data"
                message="Kami akan memproses permintaan export data Anda. Proses ini mungkin membutuhkan waktu beberapa menit hingga beberapa jam tergantung jumlah data."
                type="info"
                confirmText="Ya, Export Data"
                cancelText="Batal"
                loading={modalLoading}
            />

            {/* Deactivate Account Modal */}
            <ConfirmationModal
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                onConfirm={handleDeactivateAccount}
                title="Nonaktifkan Akun"
                message="Akun Anda akan dinonaktifkan sementara. Data Anda akan tetap aman dan Anda dapat mengaktifkan kembali akun kapan saja dengan login."
                type="warning"
                confirmText="Ya, Nonaktifkan"
                cancelText="Batal"
                loading={modalLoading}
            />

            {/* Delete Account Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                title="Hapus Akun Permanen"
                message="PERINGATAN: Tindakan ini tidak dapat dibatalkan! Semua data Anda termasuk catatan, komentar, dan informasi profil akan dihapus permanen dari sistem kami."
                type="danger"
                confirmText="Ya, Hapus Permanen"
                cancelText="Batal"
                loading={modalLoading}
            />
        </Layout>
    );
};

export default SettingsPage;