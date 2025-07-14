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

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }; const onSubmit = async () => {
        setUploading(true);

        // Simulate upload
        setTimeout(() => {
            setUploading(false);
            alert('Upload berhasil!');
            reset();
            setSelectedFile(null);
            setTags([]);
        }, 3000);
    };

    return (
        <Layout user={currentUser}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Hanken_Grotesk']">
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
                                                Drop file atau klik untuk upload
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                PDF, DOC, DOCX, PPT, PPTX (Max. 10MB)
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Note Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Catatan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Judul Catatan"
                                    {...register('title', { required: 'Judul harus diisi' })}
                                    error={errors.title?.message}
                                    placeholder="Masukkan judul catatan..."
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mata Pelajaran
                                    </label>
                                    <select
                                        {...register('subject', { required: 'Mata pelajaran harus dipilih' })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih mata pelajaran</option>
                                        {subjects.map(subject => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    {...register('description', { required: 'Deskripsi harus diisi' })}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Berikan deskripsi singkat tentang catatan ini..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {tags.map((tag, index) => (
                                        <Badge key={index} variant="primary" className="flex items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="Tambah tag..."
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addTag}
                                        disabled={!tagInput.trim()}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setSelectedFile(null);
                                setTags([]);
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            loading={uploading}
                            disabled={!selectedFile || uploading}
                        >
                            {uploading ? 'Mengupload...' : 'Upload Catatan'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default UploadPage;