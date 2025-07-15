import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MessageSquare, ArrowLeft, Save } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { currentUser } from '../data/dummyData';
import { showSuccessToast } from '../utils/toastUtils';

const CreatePostPage = () => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const categories = [
        'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah',
        'Geografi', 'Ekonomi', 'Komputer', 'Tips Belajar', 'Lainnya'
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease',
        });
    }, []);

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const onSubmit = async () => {
        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            showSuccessToast('Diskusi berhasil dibuat!');
            reset();
            setTags([]);
            navigate('/forum');
        }, 2000);
    };

    return (
        <Layout user={currentUser}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Hanken_Grotesk']">
                {/* Header */}
                <div data-aos="fade-up" className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/forum')}
                        className="mb-4 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 inline" />
                        Kembali ke Forum
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">Buat Diskusi Baru</h1>
                    <p className="text-gray-600 mt-2">
                        Bagikan pertanyaan, tips, atau mulai diskusi dengan komunitas
                    </p>
                </div>

                <form data-aos="fade-up" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Post Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Diskusi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul Diskusi *
                                    </label>
                                    <Input
                                        {...register('title', { required: 'Judul harus diisi' })}
                                        placeholder="Masukkan judul diskusi..."
                                        className="w-full"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori *
                                    </label>
                                    <select
                                        {...register('category', { required: 'Kategori harus dipilih' })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih kategori</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konten Diskusi *
                                </label>
                                <textarea
                                    {...register('content', {
                                        required: 'Konten diskusi harus diisi',
                                        minLength: { value: 20, message: 'Konten minimal 20 karakter' }
                                    })}
                                    rows={8}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tuliskan diskusi Anda di sini. Jelaskan pertanyaan atau topik yang ingin dibahas dengan jelas..."
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (Opsional)
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {tags.map((tag, index) => (
                                        <Badge key={index} variant="primary" className="flex items-center gap-1">
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="Tambah tag..."
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        disabled={tags.length >= 5}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addTag}
                                        disabled={!tagInput.trim() || tags.length >= 5}
                                    >
                                        Tambah
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Maksimal 5 tags. Gunakan tag untuk membantu orang lain menemukan diskusi Anda.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Guidelines */}
                    <Card>
                        <CardContent className="p-4 bg-blue-50">
                            <h3 className="font-semibold text-blue-800 mb-2">📝 Panduan Diskusi</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Gunakan judul yang jelas dan deskriptif</li>
                                <li>• Jelaskan pertanyaan atau topik dengan detail</li>
                                <li>• Gunakan bahasa yang sopan dan konstruktif</li>
                                <li>• Pilih kategori yang sesuai untuk memudahkan pencarian</li>
                                <li>• Tambahkan tag yang relevan untuk diskoverabilitas</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/forum')}
                            disabled={submitting}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            loading={submitting}
                            disabled={submitting}
                        >
                            <Save className="w-4 h-4 mr-2 inline" />
                            {submitting ? 'Menyimpan...' : 'Buat Diskusi'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default CreatePostPage;
