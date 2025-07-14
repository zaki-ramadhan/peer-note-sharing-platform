
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
    Check,
    Zap,
    Shield,
    Target
} from 'lucide-react';
import { Button, Card, CardContent, Badge } from '../components/ui';

const LandingPage = () => {
    const features = [
        {
            icon: Upload,
            title: 'Upload & Share',
            description: 'Upload catatan Anda dan bagikan dengan komunitas. Dapatkan poin reward untuk setiap kontribusi.'
        },
        {
            icon: Download,
            title: 'Download Notes',
            description: 'Akses ribuan catatan berkualitas dari berbagai mata pelajaran yang telah diverifikasi komunitas.'
        },
        {
            icon: MessageSquare,
            title: 'Forum Diskusi',
            description: 'Berdiskusi dengan sesama pelajar, tanya jawab, dan saling membantu dalam belajar.'
        },
        {
            icon: Star,
            title: 'Rating & Review',
            description: 'Sistem rating memastikan kualitas catatan terjaga dan membantu menemukan materi terbaik.'
        },
        {
            icon: Trophy,
            title: 'Leaderboard',
            description: 'Kompetisi sehat melalui sistem poin dan leaderboard untuk memotivasi kontribusi aktif.'
        },
        {
            icon: Shield,
            title: 'Content Moderation',
            description: 'Tim moderasi aktif memastikan semua konten berkualitas dan sesuai dengan guidelines.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Active Students' },
        { value: '50K+', label: 'Notes Shared' },
        { value: '100K+', label: 'Downloads' },
        { value: '4.8/5', label: 'User Rating' }
    ];

    const testimonials = [
        {
            name: 'Ahmad Rizki',
            role: 'Mahasiswa ITB',
            content: 'NoteShare sangat membantu saya menemukan catatan berkualitas untuk ujian. Sistemnya mudah digunakan!',
            rating: 5
        },
        {
            name: 'Sari Indah',
            role: 'Mahasiswa UGM',
            content: 'Platform ini mengubah cara saya belajar. Bisa diskusi langsung dengan penulis catatan jika ada yang tidak dipahami.',
            rating: 5
        },
        {
            name: 'Budi Santoso',
            role: 'Mahasiswa UI',
            content: 'Sistem poin memotivasi saya untuk lebih aktif berbagi. Win-win solution untuk semua pelajar!',
            rating: 5
        }
    ];

    const subjects = [
        'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Inggris', 'Komputer', 'Ekonomi', 'Sejarah'
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">NoteShare</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Badge variant="primary" className="mb-4">
                            🎉 Platform Berbagi Catatan #1 di Indonesia
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Berbagi <span className="text-blue-600">Catatan</span>,<br />
                            Belajar Bersama
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Platform peer-to-peer sharing untuk mahasiswa dan pelajar.
                            Upload, download, dan diskusi catatan berkualitas dengan sistem reward yang menarik.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link to="/register">
                                <Button size="lg" className="flex items-center">
                                    Mulai Gratis
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/notes">
                                <Button variant="outline" size="lg">
                                    Jelajahi Catatan
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Fitur Lengkap untuk Pembelajaran
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Semua yang Anda butuhkan untuk berbagi dan menemukan catatan berkualitas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
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
            <section id="how-it-works" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Cara Kerja NoteShare
                        </h2>
                        <p className="text-xl text-gray-600">
                            Hanya 3 langkah mudah untuk mulai berbagi dan belajar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Daftar & Upload
                            </h3>
                            <p className="text-gray-600">
                                Buat akun gratis dan upload catatan pertama Anda. Dapatkan poin reward untuk setiap kontribusi.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Jelajahi & Download
                            </h3>
                            <p className="text-gray-600">
                                Cari catatan yang Anda butuhkan, baca review dari pengguna lain, dan download secara gratis.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Rate & Diskusi
                            </h3>
                            <p className="text-gray-600">
                                Berikan rating dan review, diskusi di forum, dan bantu sesama dalam proses pembelajaran.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Mata Pelajaran Tersedia
                        </h2>
                        <p className="text-xl text-gray-600">
                            Temukan catatan untuk berbagai mata pelajaran
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                            >
                                <h3 className="font-medium text-gray-900">{subject}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Apa Kata Pengguna Kami
                        </h2>
                        <p className="text-xl text-gray-600">
                            Ribuan mahasiswa telah merasakan manfaatnya
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Siap Bergabung dengan Komunitas?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Mulai berbagi catatan dan bangun network pembelajaran yang kuat bersama ribuan mahasiswa lainnya.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                                Daftar Sekarang - Gratis!
                            </Button>
                        </Link>
                        <Link to="/notes">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                Lihat Catatan Tersedia
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="h-8 w-8 text-blue-400" />
                                <span className="text-xl font-bold">NoteShare</span>
                            </div>
                            <p className="text-gray-400 max-w-md">
                                Platform peer-to-peer sharing terbaik untuk mahasiswa dan pelajar di Indonesia.
                                Berbagi catatan, belajar bersama, berkembang bersama.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Platform</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Upload Notes</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Browse Notes</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 NoteShare. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
