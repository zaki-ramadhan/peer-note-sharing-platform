import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, FileText, X, Plus } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { currentUser } from '../data/dummyData';

const UploadPage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const subjects = [
        'Matematika', 'Fisika', 'Kimia', 'Biologi',
        'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah',
        'Geografi', 'Ekonomi', 'Komputer', 'Lainnya'
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const onSubmit = async (data) => {
        if (!selectedFile) {
            alert('Silakan pilih file untuk diupload');
            return;
        }

        setUploading(true);

        // Simulate upload process
        setTimeout(() => {
            console.log('Upload data:', {
                ...data,
                file: selectedFile,
                tags,
                author: currentUser
            });

            alert('Catatan berhasil diupload!');

            // Reset form
            reset();
            setSelectedFile(null);
            setTags([]);
            setUploading(false);
        }, 2000);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Layout user={currentUser}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Upload Catatan</h1>
                    <p className="text-gray-600 mt-2">
                        Bagikan catatan Anda dengan komunitas dan dapatkan poin reward!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* File Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>File Catatan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                    ? 'border-blue-400 bg-blue-50'
                                    : selectedFile
                                        ? 'border-green-400 bg-green-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />

                                {selectedFile ? (
                                    <div className="space-y-3">
                                        <FileText className="w-12 h-12 text-green-600 mx-auto" />
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                                            <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedFile(null)}
                                        >
                                            Ganti File
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">
                                                Drop file di sini atau klik untuk browse
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Mendukung PDF, DOC, DOCX, PPT, PPTX (Max. 10MB)
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Note Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Catatan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <Input
                                label="Judul Catatan *"
                                placeholder="Masukkan judul catatan yang deskriptif"
                                {...register('title', {
                                    required: 'Judul catatan wajib diisi',
                                    minLength: { value: 5, message: 'Judul minimal 5 karakter' }
                                })}
                                error={errors.title?.message}
                            />

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi *
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Jelaskan isi catatan, topik yang dibahas, dan hal penting lainnya"
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    {...register('description', {
                                        required: 'Deskripsi wajib diisi',
                                        minLength: { value: 20, message: 'Deskripsi minimal 20 karakter' }
                                    })}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mata Pelajaran *
                                </label>
                                <select
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    {...register('subject', { required: 'Mata pelajaran wajib dipilih' })}
                                >
                                    <option value="">Pilih mata pelajaran</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (Opsional)
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Tambahkan tag"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <Button type="button" onClick={addTag} size="sm">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Tag membantu orang lain menemukan catatan Anda. Tekan Enter untuk menambah tag.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => {
                            reset();
                            setSelectedFile(null);
                            setTags([]);
                        }}>
                            Reset
                        </Button>
                        <Button type="submit" loading={uploading} disabled={!selectedFile}>
                            {uploading ? 'Mengupload...' : 'Upload Catatan'}
                        </Button>
                    </div>
                </form>

                {/* Upload Guidelines */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Panduan Upload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">✅ Yang Boleh:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Catatan hasil belajar sendiri</li>
                                    <li>• Ringkasan materi dari berbagai sumber</li>
                                    <li>• Solusi soal dengan penjelasan</li>
                                    <li>• Mind map dan diagram</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">❌ Yang Tidak Boleh:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Hasil copy-paste langsung</li>
                                    <li>• Kunci jawaban ujian/ulangan</li>
                                    <li>• Konten yang melanggar hak cipta</li>
                                    <li>• File yang tidak berkaitan dengan edukasi</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default UploadPage;
