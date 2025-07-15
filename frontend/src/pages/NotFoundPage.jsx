import React from 'react';
import { Link } from 'react-router';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';
import { Button, Card, CardContent } from '../components/ui';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-['Hanken_Grotesk']">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="relative">
                        <h1 className="text-[12rem] md:text-[16rem] font-bold text-blue-100 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg mb-8">
                    <CardContent className="p-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Maaf, halaman yang Anda cari tidak dapat ditemukan.
                            Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
                        </p>

                        {/* Suggestions */}
                        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Yang bisa Anda lakukan:</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    Periksa kembali URL yang Anda masukkan
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    Kembali ke halaman sebelumnya
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    Gunakan fitur pencarian untuk menemukan catatan
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    Kunjungi halaman utama NoteShare
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => window.history.back()}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4 inline mr-2 -mt-0.5" />
                                Kembali
                            </Button>

                            <Link to="/">
                                <Button className="flex items-center gap-2 w-full sm:w-auto">
                                    <Home className="w-4 h-4 inline mr-2 -mt-0.5" />
                                    Halaman Utama
                                </Button>
                            </Link>

                            <Link to="/notes">
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 w-full sm:w-auto"
                                >
                                    <Search className="w-4 h-4 inline mr-2 -mt-0.5" />
                                    Cari Catatan
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Links */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">Halaman populer:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Dashboard
                        </Link>
                        <Link to="/notes" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Browse Notes
                        </Link>
                        <Link to="/upload" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Upload Note
                        </Link>
                        <Link to="/forum" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Forum
                        </Link>
                        <Link to="/leaderboard" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Leaderboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
