import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, BookOpen, ArrowRight } from 'lucide-react';
import { Button, Input, Card, CardContent } from '../components/ui';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
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
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            NoteShare
                        </span>
                    </Link>
                </div>

                {/* Login Card */}
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-md">
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Selamat Datang Kembali
                            </h1>
                            <p className="text-slate-600">
                                Masuk ke akun Anda untuk melanjutkan pembelajaran
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
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
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Lupa kata sandi?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md  transition-all duration-200"
                                loading={loading}
                            >
                                {loading ? 'Masuk...' : (
                                    <>
                                        Masuk
                                        <ArrowRight className="inline ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-slate-600">Belum punya akun? </span>
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Daftar sekarang
                            </Link>
                        </div>

                    </CardContent>
                </Card>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-500">
                        Dengan masuk, Anda menyetujui{' '}
                        <Link to="/terms" className="text-blue-600 hover:underline">Syarat & Ketentuan</Link>
                        {' '}dan{' '}
                        <Link to="/privacy" className="text-blue-600 hover:underline">Kebijakan Privasi</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


