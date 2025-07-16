import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, BookOpen, ArrowRight, School } from 'lucide-react';
import { Button, Input, Card, CardContent } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        university: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok!');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter!');
            return;
        }

        const result = await register(formData);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message || 'Registration failed. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-['Hanken_Grotesk']">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-3 group">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-md group- transition-shadow">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            PeerNote
                        </span>
                    </Link>
                </div>

                {/* Register Card */}
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-md">
                    <CardContent className="p-8">                        <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">
                            Bergabung dengan PeerNote
                        </h1>
                        <p className="text-slate-600">
                            Mulai perjalanan pembelajaran Anda bersama ribuan mahasiswa
                        </p>
                    </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Nama lengkap"
                                    icon={User}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="h-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    required
                                />

                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="alamat@email.com"
                                    icon={Mail}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    required
                                />

                                <Input
                                    type="text"
                                    name="university"
                                    placeholder="Universitas/Sekolah"
                                    icon={School}
                                    value={formData.university}
                                    onChange={handleChange}
                                    className="h-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    required
                                />

                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Kata sandi"
                                        icon={Lock}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="h-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Konfirmasi kata sandi"
                                        icon={Lock}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="h-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-1"
                                    required
                                />
                                <span className="ml-2 text-sm text-slate-600">
                                    Saya setuju dengan{' '}
                                    <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                                        Syarat & Ketentuan
                                    </Link>
                                    {' '}dan{' '}
                                    <Link to="/privacy" className="text-blue-600 hover:underline font-medium">
                                        Kebijakan Privasi
                                    </Link>
                                </span>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md  transition-all duration-200"
                                loading={loading}
                            >
                                {loading ? 'Mendaftar...' : (
                                    <>
                                        Daftar Sekarang
                                        <ArrowRight className="inline ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-slate-600">Sudah punya akun? </span>
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Masuk di sini
                            </Link>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;


