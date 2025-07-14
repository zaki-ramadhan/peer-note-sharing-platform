import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, BookOpen, ArrowRight, School } from 'lucide-react';
import { Button, Input, Card, CardContent } from '../components/ui';

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Password tidak cocok!');
            return;
        }

        setLoading(true);

        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-3 group">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            NoteShare
                        </span>
                    </Link>
                </div>

                {/* Register Card */}
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Bergabung dengan NoteShare
                            </h1>
                            <p className="text-slate-600">
                                Mulai perjalanan pembelajaran Anda bersama ribuan mahasiswa
                            </p>
                        </div>

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
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                                loading={loading}
                            >
                                {loading ? 'Mendaftar...' : (
                                    <>
                                        Daftar Sekarang
                                        <ArrowRight className="ml-2 h-4 w-4" />
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

                        {/* Social Register */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-slate-500">Atau daftar dengan</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-11">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-11">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                    Twitter
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
