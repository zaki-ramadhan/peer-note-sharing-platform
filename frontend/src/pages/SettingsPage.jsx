import { useState } from 'react';
import Layout from '../components/layout/Layout';
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
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+62 812 3456 7890',
        location: 'Jakarta, Indonesia',
        bio: 'Computer Science student passionate about sharing knowledge and helping fellow students succeed.',
        website: 'https://johndoe.dev'
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true,
        allowMessages: true,
        showActivity: true
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        newDownloads: true,
        newComments: true,
        newFollowers: true,
        systemUpdates: true,
        weeklyDigest: false
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Handle profile update
        console.log('Profile updated:', profileData);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Handle password change
        console.log('Password change requested');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'account', label: 'Account', icon: Shield }
    ];

    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div
                    className="mb-8"
                >
                    <h1 data-aos="fade-up" className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p data-aos="fade-up" className="text-gray-600">Manage your account settings and preferences</p>
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
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>

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
                                            Change Avatar
                                        </button>                                            <p className="text-sm text-gray-500 mt-3">
                                            JPG, PNG or GIF. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Website
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
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>                                    <div
                                    className="pt-6 border-t"
                                >
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
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
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Settings</h2>

                                <div className="space-y-8">
                                    {/* Change Password */}
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                            >
                                                Update Password
                                            </button>
                                        </form>
                                    </div>                                    {/* Two-Factor Authentication */}
                                    <div
                                        className="pt-8 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">SMS Authentication</p>
                                                <p className="text-sm text-gray-600">Secure your account with SMS verification</p>
                                            </div>
                                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                                Enable
                                            </button>
                                        </div>
                                    </div>                                    {/* Login Sessions */}
                                    <div
                                        className="pt-8 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="600"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">Current Session</p>
                                                    <p className="text-sm text-gray-600">Chrome on Windows • Jakarta, Indonesia</p>
                                                </div>
                                                <span className="text-green-600 text-sm font-medium">Active Now</span>
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">Mobile App</p>
                                                    <p className="text-sm text-gray-600">Android • Last seen 2 hours ago</p>
                                                </div>
                                                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
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
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

                                <div className="space-y-6">
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Methods</h3>
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
                                                <div>
                                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                                    <p className="text-sm text-gray-600">Receive notifications via email</p>
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
                                                <div>
                                                    <p className="font-medium text-gray-900">Push Notifications</p>
                                                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>                                    <div
                                        className="pt-6 border-t"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Notifications</h3>
                                        <div className="space-y-4">
                                            {[
                                                { key: 'newDownloads', label: 'New Downloads', desc: 'When someone downloads your notes' },
                                                { key: 'newComments', label: 'New Comments', desc: 'When someone comments on your content' },
                                                { key: 'newFollowers', label: 'New Followers', desc: 'When someone follows you' },
                                                { key: 'systemUpdates', label: 'System Updates', desc: 'Important platform updates and announcements' },
                                                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of your activity' }
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
                                    >
                                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                                            <Save className="w-4 h-4" />
                                            Save Preferences
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
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>

                                <div className="space-y-6">                                    <div data-aos="fade-up" data-aos-delay="200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                                    <div className="space-y-3">
                                        {[
                                            { value: 'public', label: 'Public', desc: 'Anyone can view your profile' },
                                            { value: 'students', label: 'Students Only', desc: 'Only verified students can view your profile' },
                                            { value: 'private', label: 'Private', desc: 'Only you can view your profile' }
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
                                >
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Information Visibility</h3>
                                        <div className="space-y-4">
                                            {[
                                                { key: 'showEmail', label: 'Show Email Address', desc: 'Display your email on your profile' },
                                                { key: 'showPhone', label: 'Show Phone Number', desc: 'Display your phone number on your profile' },
                                                { key: 'showLocation', label: 'Show Location', desc: 'Display your location on your profile' },
                                                { key: 'allowMessages', label: 'Allow Direct Messages', desc: 'Let other users send you messages' },
                                                { key: 'showActivity', label: 'Show Activity Status', desc: 'Show when you were last online' }
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
                                            Save Privacy Settings
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
                                >
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Your Data</h3>
                                    <p className="text-gray-600 mb-6">
                                        Download a copy of all your data including notes, comments, and profile information.
                                    </p>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                                        Request Data Export
                                    </button>
                                </div>                                {/* Deactivate Account */}
                                <div
                                    className="bg-white rounded-xl shadow-sm p-8"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Deactivate Account</h3>
                                    <p className="text-gray-600 mb-6">
                                        Temporarily deactivate your account. You can reactivate it anytime by logging in.
                                    </p>
                                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors">
                                        Deactivate Account
                                    </button>
                                </div>                                {/* Delete Account */}
                                <div
                                    className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-red-500"
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                >
                                    <h3 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h3>
                                    <p className="text-gray-600 mb-6">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account Permanently
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;