import React from 'react';
import { Link } from 'react-router';
import {
    BookOpen,
    Users,
    Download,
    Star,
    Upload,
    MessageSquare,
    Trophy,
    ArrowRight,
    Zap,
    Shield,
    Sparkles,
    Rocket
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '../components/ui';

const LandingPage = () => {
    const features = [
        {
            icon: Upload,
            title: 'Upload & Share',
            description: 'Upload catatan Anda dan bagikan dengan komunitas. Dapatkan poin reward untuk setiap kontribusi.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Download,
            title: 'Download Notes',
            description: 'Akses ribuan catatan berkualitas dari berbagai mata pelajaran yang telah diverifikasi komunitas.',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: MessageSquare,
            title: 'Forum Diskusi',
            description: 'Berdiskusi dengan sesama pelajar, tanya jawab, dan saling membantu dalam belajar.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Star,
            title: 'Rating & Review',
            description: 'Sistem rating memastikan kualitas catatan terjaga dan membantu menemukan materi terbaik.',
            gradient: 'from-orange-500 to-red-500'
        },
        {
            icon: Trophy,
            title: 'Leaderboard',
            description: 'Kompetisi sehat melalui sistem poin dan leaderboard untuk memotivasi kontribusi aktif.',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            icon: Shield,
            title: 'Content Moderation',
            description: 'Tim moderasi aktif memastikan semua konten berkualitas dan sesuai dengan guidelines.',
            gradient: 'from-indigo-500 to-purple-500'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Active Students', icon: Users },
        { value: '50K+', label: 'Notes Shared', icon: BookOpen },
        { value: '100K+', label: 'Downloads', icon: Download },
        { value: '4.8/5', label: 'User Rating', icon: Star }
    ];

    const testimonials = [
        {
            name: 'Ahmad Rizki',
            role: 'Mahasiswa ITB',
            content: 'NoteShare sangat membantu saya menemukan catatan berkualitas untuk ujian. Sistemnya mudah digunakan!',
            rating: 5,
            avatar: null
        },
        {
            name: 'Sari Indah',
            role: 'Mahasiswa UGM',
            content: 'Platform ini mengubah cara saya belajar. Bisa diskusi langsung dengan penulis catatan jika ada yang tidak dipahami.',
            rating: 5,
            avatar: null
        },
        {
            name: 'Budi Santoso',
            role: 'Mahasiswa UI',
            content: 'Sistem poin memotivasi saya untuk lebih aktif berbagi. Win-win solution untuk semua pelajar!',
            rating: 5,
            avatar: null
        }
    ];

    const subjects = [
        { name: 'Matematika', icon: '📐', count: '2.5k notes' },
        { name: 'Fisika', icon: '⚛️', count: '1.8k notes' },
        { name: 'Kimia', icon: '🧪', count: '1.2k notes' },
        { name: 'Biologi', icon: '🧬', count: '1.5k notes' },
        { name: 'Bahasa Inggris', icon: '🇬🇧', count: '3.1k notes' },
        { name: 'Komputer', icon: '💻', count: '4.2k notes' },
        { name: 'Ekonomi', icon: '📈', count: '900 notes' },
        { name: 'Sejarah', icon: '🏛️', count: '700 notes' }
    ];

    return (
        <div className="min-h-screen bg-white font-['Hanken_Grotesk']">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/50 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md groupmd transition-shadow">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>                            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent font-['Hanken_Grotesk']">
                                NoteShare
                            </span>
                        </Link>                        <div className="hidden md:flex items-center space-x-8 font-['Hanken_Grotesk']">
                            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
                            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">How it Works</a>
                            <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to="/login">
                                <Button variant="ghost" className="font-medium">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 overflow-hidden pt-16">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-8 border border-blue-200/50 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Platform Berbagi Catatan #1 di Indonesia
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight">
                            Berbagi{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Catatan
                            </span>
                            ,<br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Belajar
                            </span>{' '}
                            Bersama
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                            Platform peer-to-peer sharing untuk mahasiswa dan pelajar.
                            Upload, download, dan diskusi catatan berkualitas dengan sistem reward yang menarik.
                        </p>                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link to="/register">
                                <Button size="xl" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-md transform  transition-all duration-200">
                                    <Rocket className="inline mr-2 h-5 w-5" />
                                    Mulai Gratis
                                    <ArrowRight className="inline ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/notes">
                                <Button variant="outline" size="xl" className="border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-md transform  transition-all duration-200">
                                    Jelajahi Catatan
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="group">
                                        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-md transition-all duration-300 group-">
                                            <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Fitur Lengkap untuk
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Pembelajaran</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Semua yang Anda butuhkan untuk berbagi dan menemukan catatan berkualitas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="group  transition-all duration-300 border-0 bg-white overflow-hidden">
                                    <CardContent className="p-8 text-center">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group- transition-transform duration-300 shadow-md`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Cara Kerja
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> NoteShare</span>
                        </h2>
                        <p className="text-xl text-slate-600">
                            Hanya 3 langkah mudah untuk mulai berbagi dan belajar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "1",
                                title: "Daftar & Upload",
                                description: "Buat akun gratis dan upload catatan pertama Anda. Dapatkan poin reward untuk setiap kontribusi.",
                                gradient: "from-blue-500 to-cyan-500"
                            },
                            {
                                step: "2",
                                title: "Jelajahi & Download",
                                description: "Cari catatan yang Anda butuhkan, baca review dari pengguna lain, dan download secara gratis.",
                                gradient: "from-purple-500 to-pink-500"
                            },
                            {
                                step: "3",
                                title: "Rate & Diskusi",
                                description: "Berikan rating dan review, diskusi di forum, dan bantu sesama dalam proses pembelajaran.",
                                gradient: "from-orange-500 to-red-500"
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md group- transition-transform duration-300`}>
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Mata Pelajaran
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Tersedia</span>
                        </h2>
                        <p className="text-xl text-slate-600">
                            Temukan catatan untuk berbagai mata pelajaran
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {subjects.map((subject, index) => (
                            <Card key={index} className="md transition-all duration-300 cursor-pointer border-0 bg-white overflow-hidden">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4 group- transition-transform">
                                        {subject.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {subject.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">{subject.count}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Apa Kata
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Pengguna Kami</span>
                        </h2>
                        <p className="text-xl text-slate-600">
                            Ribuan mahasiswa telah merasakan manfaatnya
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 bg-gradient-to-br from-white to-slate-50 shadow-md  transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{testimonial.name}</p>
                                            <p className="text-sm text-slate-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Siap Bergabung dengan Komunitas?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Mulai berbagi catatan dan bangun network pembelajaran yang kuat bersama ribuan mahasiswa lainnya.
                    </p>                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-md transform  transition-all duration-200">
                                <Zap className="mr-2 h-5 w-5" />
                                Daftar Sekarang - Gratis!
                            </Button>
                        </Link>
                        <Link to="/notes">
                            <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-md transform  transition-all duration-200">
                                Lihat Catatan Tersedia
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold">NoteShare</span>
                            </Link>
                            <p className="text-slate-400 max-w-md leading-relaxed">
                                Platform peer-to-peer sharing terbaik untuk mahasiswa dan pelajar di Indonesia.
                                Berbagi catatan, belajar bersama, berkembang bersama.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4 text-white">Platform</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li><Link to="/upload" className="hover:text-white transition-colors">Upload Notes</Link></li>
                                <li><Link to="/notes" className="hover:text-white transition-colors">Browse Notes</Link></li>
                                <li><Link to="/forum" className="hover:text-white transition-colors">Forum</Link></li>
                                <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4 text-white">Support</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
                        <p>&copy; 2025 NoteShare. All rights reserved. Made with ❤️ for students.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;


