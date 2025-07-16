import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(formData);

            if (result.success) {
                // Check if user is admin
                if (result.user.role === 'admin') {
                    showSuccessToast('Admin login successful');
                    navigate('/admin');
                } else {
                    showErrorToast('Access denied. Admin privileges required.');
                    // Logout the user if they're not admin
                    // logout();
                }
            } else {
                showErrorToast(result.message || 'Login failed');
            }
        } catch {
            showErrorToast('An error occurred during login');
        } finally {
            setLoading(false);
        }
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">                <div>
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                </div>                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Akses Admin
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Masuk untuk mengakses dashboard admin
                </p>
            </div>

                <div className="bg-gray-800/50 backdrop-blur-sm py-8 px-6 shadow-xl rounded-xl border border-gray-700/50">                    <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Alamat Email
                    </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white sm:text-sm"
                                placeholder="admin@peernote.com"
                            />
                        </div>
                    </div>

                    <div>                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Kata Sandi
                    </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white sm:text-sm"
                                placeholder="Masukkan kata sandi Anda"
                            />                                <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
                        >                            {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Masuk...
                            </div>
                        ) : (
                            'Masuk ke Panel Admin'
                        )}
                        </button>
                    </div>
                </form>                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700/50" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800/50 text-gray-400">Kredensial Demo</span>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-600/30">                            <div className="text-sm text-blue-300">
                            <p className="font-medium">Untuk keperluan demo:</p>
                            <p>Email: <span className="font-mono text-blue-200 select-all">admin@peernote.com</span></p>
                            <p>Password: <span className="font-mono text-blue-200 select-all">admin123</span></p>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            ← Back to regular login
                        </Link>
                    </div>
                </div>                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        This is a secured admin area. Only authorized personnel may access.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
