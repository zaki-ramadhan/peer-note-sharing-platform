import { useState } from 'react';
import {
    Settings,
    Shield,
    Bell,
    Mail,
    Globe,
    Database,
    Check
} from 'lucide-react';
import { showSuccessToast } from '../../utils/toastUtils';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        general: {
            siteName: 'PeerNote Platform',
            siteDescription: 'A collaborative platform for sharing academic notes',
            maintenanceMode: false,
            registrationEnabled: true,
            maxFileSize: 10, // MB
            allowedFileTypes: ['pdf', 'doc', 'docx', 'txt']
        },
        security: {
            requireEmailVerification: true,
            passwordMinLength: 8,
            sessionTimeout: 24, // hours
            maxLoginAttempts: 5,
            enableTwoFactor: false,
            ipWhitelist: ''
        },
        notifications: {
            emailNotifications: true,
            newUserNotification: true,
            contentReportNotification: true,
            systemAlerts: true,
            weeklyReports: true
        },
        email: {
            smtpServer: 'smtp.gmail.com',
            smtpPort: 587, smtpUsername: '',
            smtpPassword: '',
            fromEmail: 'noreply@peernote.com',
            fromName: 'PeerNote Platform'
        }
    });

    const [saved, setSaved] = useState(false); const tabs = [
        { id: 'general', name: 'Umum', icon: Settings },
        { id: 'security', name: 'Keamanan', icon: Shield },
        { id: 'notifications', name: 'Notifikasi', icon: Bell },
        { id: 'email', name: 'Email', icon: Mail }
    ];

    const handleSettingChange = (category, setting, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: value
            }
        }));
    };

    const handleSave = () => {        // Simulate API call
        setSaved(true);
        showSuccessToast('Pengaturan berhasil disimpan');
        setTimeout(() => setSaved(false), 2000);
    }; const renderGeneralSettings = () => (
        <div className="space-y-6">            <div>
            <h3 className="text-lg font-medium text-white mb-4">Pengaturan Platform</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nama Situs
                    </label>
                    <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ukuran File Maksimal (MB)
                    </label>
                    <input
                        type="number"
                        value={settings.general.maxFileSize}
                        onChange={(e) => handleSettingChange('general', 'maxFileSize', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                    />
                </div>
            </div>                <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deskripsi Situs
                </label>
                <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                />
            </div>
        </div>            <div>
                <h3 className="text-lg font-medium text-white mb-4">Kontrol Sistem</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div>
                            <h4 className="text-sm font-medium text-white">Mode Pemeliharaan</h4>
                            <p className="text-sm text-gray-400">Nonaktifkan platform sementara untuk pemeliharaan</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.general.maintenanceMode}
                                onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div>
                            <h4 className="text-sm font-medium text-white">Pendaftaran Pengguna</h4>
                            <p className="text-sm text-gray-400">Izinkan pengguna baru untuk mendaftar</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.general.registrationEnabled} onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    ); const renderSecuritySettings = () => (
        <div className="space-y-6">            <div>
            <h3 className="text-lg font-medium text-white mb-4">Pengaturan Autentikasi</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div>
                        <h4 className="text-sm font-medium text-white">Verifikasi Email Diperlukan</h4>
                        <p className="text-sm text-gray-400">Wajibkan pengguna untuk memverifikasi alamat email mereka</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.security.requireEmailVerification}
                            onChange={(e) => handleSettingChange('security', 'requireEmailVerification', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                        <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Panjang Password Minimum
                    </label>
                    <input
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                    />
                </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Batas Waktu Sesi (jam)
                        </label>
                        <input
                            type="number"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>            <div>
                <h3 className="text-lg font-medium text-white mb-4">Kontrol Akses</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Maksimal Percobaan Login
                        </label>
                        <input
                            type="number"
                            value={settings.security.maxLoginAttempts}
                            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Daftar Putih IP (dipisahkan koma)
                        </label>
                        <textarea
                            value={settings.security.ipWhitelist}
                            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
                            rows={3}
                            placeholder="192.168.1.1, 10.0.0.1"
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">            <div>
            <h3 className="text-lg font-medium text-white mb-4">Notifikasi Email</h3>
            <div className="space-y-4">
                {[
                    { key: 'emailNotifications', label: 'Aktifkan Notifikasi Email', description: 'Kirim notifikasi email kepada administrator' },
                    { key: 'newUserNotification', label: 'Pendaftaran Pengguna Baru', description: 'Beri tahu saat pengguna baru mendaftar' },
                    { key: 'contentReportNotification', label: 'Laporan Konten', description: 'Beri tahu saat konten dilaporkan' },
                    { key: 'systemAlerts', label: 'Peringatan Sistem', description: 'Beri tahu tentang kesalahan dan peringatan sistem' },
                    { key: 'weeklyReports', label: 'Laporan Mingguan', description: 'Kirim statistik platform mingguan' }
                ].map((notification) => (
                    <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div>
                            <h4 className="text-sm font-medium text-white">{notification.label}</h4>
                            <p className="text-sm text-gray-400">{notification.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications[notification.key]}
                                onChange={(e) => handleSettingChange('notifications', notification.key, e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
        </div>
    ); const renderEmailSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white mb-4">Konfigurasi SMTP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>                        <label className="block text-sm font-medium text-gray-300 mb-2">
                        Server SMTP
                    </label>
                        <input
                            type="text"
                            value={settings.email.smtpServer}
                            onChange={(e) => handleSettingChange('email', 'smtpServer', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            SMTP Port
                        </label>
                        <input
                            type="number"
                            value={settings.email.smtpPort}
                            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={settings.email.smtpUsername}
                            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={settings.email.smtpPassword}
                            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>                        <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Pengirim
                    </label>
                        <input
                            type="email"
                            value={settings.email.fromEmail}
                            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>

                    <div>                        <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nama Pengirim
                    </label>
                        <input
                            type="text"
                            value={settings.email.fromName}
                            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6">                <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                Tes Konfigurasi Email
            </button>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return renderGeneralSettings();
            case 'security':
                return renderSecuritySettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'email':
                return renderEmailSettings();
            default:
                return renderGeneralSettings();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Pengaturan Sistem
                </h2>                    <p className="mt-1 text-sm text-gray-400">
                        Konfigurasi pengaturan dan preferensi platform.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === tab.id
                                    ? 'bg-blue-900/50 text-blue-400 border-r-2 border-blue-400'
                                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                                    }`}
                            >
                                <tab.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">                    <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl border border-gray-700/50">
                    <div className="px-6 py-4 border-b border-gray-700/50">                        <h3 className="text-lg font-medium text-white">
                        Pengaturan {tabs.find(tab => tab.id === activeTab)?.name}
                    </h3>
                    </div>
                    <div className="px-6 py-6">
                        {renderTabContent()}
                    </div>
                    <div className="px-6 py-4 bg-gray-700/30 border-t border-gray-700/50 rounded-b-xl">
                        <div className="flex justify-between items-center">                            <p className="text-sm text-gray-400">
                            Perubahan disimpan otomatis saat Anda memodifikasi pengaturan.
                        </p>
                            <button
                                onClick={handleSave}
                                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${saved
                                    ? 'bg-green-600 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >                                    {saved ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Tersimpan
                                </>
                            ) : (
                                'Simpan Perubahan'
                            )}
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
