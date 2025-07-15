import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    AOS.init({
        duration: 1400,
        easing: 'ease',
    });
    const currentYear = new Date().getFullYear(); return (
        <footer data-aos="fade-up" data-aos-delay="500" data-aos-offset="-100" className="bg-gray-50 border-t border-gray-200 font-['Hanken_Grotesk']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">NoteShare</span>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                            Platform berbagi catatan untuk mahasiswa dan pelajar.
                            Saling upload, unduh, dan diskusi untuk pembelajaran yang lebih efektif.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/upload" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Upload Note
                                </Link>
                            </li>
                            <li>
                                <Link to="/forum" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link to="/leaderboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} NoteShare. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


