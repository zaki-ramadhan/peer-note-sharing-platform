// Generate dummy data for development
export const generateDummyNotes = () => [
    {
        id: '1',
        title: 'Kalkulus Diferensial - Limit dan Turunan',
        description: 'Catatan lengkap tentang konsep limit, turunan, dan aplikasinya dalam matematika. Dilengkapi dengan contoh soal dan pembahasan detail.',
        subject: 'Matematika',
        author: {
            id: 'user1',
            name: 'Ahmad Rizki',
            avatar: null,
            points: 1250
        },
        uploadDate: '2025-07-10T08:30:00Z',
        downloadCount: 245,
        averageRating: 4.8,
        reviewCount: 32,
        fileType: 'pdf',
        tags: ['kalkulus', 'diferensial', 'limit', 'turunan'],
        thumbnail: null,
        fileSize: '2.5 MB'
    },
    {
        id: '2',
        title: 'Fisika Mekanika - Hukum Newton',
        description: 'Penjelasan komprehensif tentang tiga hukum Newton dan penerapannya dalam berbagai kasus fisika mekanika.',
        subject: 'Fisika',
        author: {
            id: 'user2',
            name: 'Sari Indah',
            avatar: null,
            points: 980
        },
        uploadDate: '2025-07-08T14:15:00Z',
        downloadCount: 189,
        averageRating: 4.6,
        reviewCount: 24,
        fileType: 'pdf',
        tags: ['mekanika', 'newton', 'gaya', 'gerak'],
        thumbnail: null,
        fileSize: '1.8 MB'
    },
    {
        id: '3',
        title: 'Struktur Data dan Algoritma - Sorting',
        description: 'Implementasi berbagai algoritma sorting seperti bubble sort, merge sort, quick sort dengan analisis kompleksitas.',
        subject: 'Komputer',
        author: {
            id: 'user3',
            name: 'Budi Santoso',
            avatar: null,
            points: 1560
        },
        uploadDate: '2025-07-05T10:45:00Z',
        downloadCount: 312,
        averageRating: 4.9,
        reviewCount: 45,
        fileType: 'pdf',
        tags: ['algoritma', 'sorting', 'data-structure', 'programming'],
        thumbnail: null,
        fileSize: '3.2 MB'
    },
    {
        id: '4',
        title: 'Kimia Organik - Hidrokarbon',
        description: 'Materi lengkap tentang senyawa hidrokarbon, tata nama, sifat-sifat, dan reaksi-reaksi yang terjadi.',
        subject: 'Kimia',
        author: {
            id: 'user4',
            name: 'Diana Putri',
            avatar: null,
            points: 720
        },
        uploadDate: '2025-07-03T16:20:00Z',
        downloadCount: 156,
        averageRating: 4.4,
        reviewCount: 18,
        fileType: 'pdf',
        tags: ['organik', 'hidrokarbon', 'alkana', 'alkena'],
        thumbnail: null,
        fileSize: '2.1 MB'
    },
    {
        id: '5',
        title: 'Bahasa Inggris - Grammar Tenses',
        description: 'Panduan lengkap 16 tenses dalam bahasa Inggris dengan contoh kalimat dan latihan soal.',
        subject: 'Bahasa Inggris',
        author: {
            id: 'user5',
            name: 'Michael Johnson',
            avatar: null,
            points: 890
        },
        uploadDate: '2025-07-01T09:00:00Z',
        downloadCount: 278,
        averageRating: 4.7,
        reviewCount: 38,
        fileType: 'pdf',
        tags: ['grammar', 'tenses', 'english', 'language'],
        thumbnail: null,
        fileSize: '1.9 MB'
    },
    {
        id: '6',
        title: 'Biologi Sel - Struktur dan Fungsi',
        description: 'Penjelasan detail tentang struktur sel prokariota dan eukariota, organel sel, dan fungsi masing-masing.',
        subject: 'Biologi',
        author: {
            id: 'user6',
            name: 'Dr. Rina Wijaya',
            avatar: null,
            points: 2100
        },
        uploadDate: '2025-06-28T11:30:00Z',
        downloadCount: 203,
        averageRating: 4.8,
        reviewCount: 29,
        fileType: 'pdf',
        tags: ['biologi', 'sel', 'organel', 'struktur'],
        thumbnail: null,
        fileSize: '2.7 MB'
    }
];

export const generateDummyUsers = () => [
    {
        id: 'user1',
        name: 'Ahmad Rizki',
        email: 'ahmad.rizki@email.com',
        avatar: null,
        points: 1250,
        role: 'user',
        joinDate: '2025-01-15T00:00:00Z',
        uploadCount: 12,
        downloadCount: 45,
        university: 'Institut Teknologi Bandung'
    },
    {
        id: 'user2',
        name: 'Sari Indah',
        email: 'sari.indah@email.com',
        avatar: null,
        points: 980,
        role: 'user',
        joinDate: '2025-02-20T00:00:00Z',
        uploadCount: 8,
        downloadCount: 32,
        university: 'Universitas Gadjah Mada'
    },
    {
        id: 'user3',
        name: 'Budi Santoso',
        email: 'budi.santoso@email.com',
        avatar: null,
        points: 1560,
        role: 'user',
        joinDate: '2024-11-10T00:00:00Z',
        uploadCount: 18,
        downloadCount: 67,
        university: 'Universitas Indonesia'
    },
    {
        id: 'user4',
        name: 'Diana Putri',
        email: 'diana.putri@email.com',
        avatar: null,
        points: 720,
        role: 'user',
        joinDate: '2025-03-05T00:00:00Z',
        uploadCount: 6,
        downloadCount: 28,
        university: 'Universitas Padjajaran'
    },
    {
        id: 'user5',
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        avatar: null,
        points: 890,
        role: 'user',
        joinDate: '2025-01-28T00:00:00Z',
        uploadCount: 9,
        downloadCount: 41,
        university: 'Universitas Bina Nusantara'
    },
    {
        id: 'user6',
        name: 'Dr. Rina Wijaya',
        email: 'rina.wijaya@email.com',
        avatar: null,
        points: 2100,
        role: 'user',
        joinDate: '2024-09-15T00:00:00Z',
        uploadCount: 25,
        downloadCount: 89,
        university: 'Universitas Airlangga'
    }
];

export const generateDummyForumPosts = () => [
    {
        id: '1',
        title: 'Cara Efektif Belajar Kalkulus untuk Pemula',
        content: 'Halo teman-teman! Saya mau share tips belajar kalkulus yang efektif. Pertama, pahami konsep dasar limit...',
        author: {
            id: 'user1',
            name: 'Ahmad Rizki',
            avatar: null
        },
        subject: 'Matematika',
        createdAt: '2025-07-14T10:30:00Z',
        replyCount: 12,
        likes: 8,
        tags: ['tips', 'kalkulus', 'belajar']
    },
    {
        id: '2',
        title: 'Request: Catatan Fisika Kuantum',
        content: 'Ada yang punya catatan lengkap tentang fisika kuantum? Khususnya tentang persamaan Schrödinger.',
        author: {
            id: 'user2',
            name: 'Sari Indah',
            avatar: null
        },
        subject: 'Fisika',
        createdAt: '2025-07-13T14:15:00Z',
        replyCount: 5,
        likes: 3,
        tags: ['request', 'kuantum', 'fisika']
    }
];

export const generateDummyReviews = (noteId) => [
    {
        id: '1',
        noteId,
        author: {
            id: 'user2',
            name: 'Sari Indah',
            avatar: null
        },
        rating: 5,
        comment: 'Catatan sangat lengkap dan mudah dipahami. Sangat membantu untuk ujian!',
        createdAt: '2025-07-12T09:20:00Z'
    },
    {
        id: '2',
        noteId,
        author: {
            id: 'user3',
            name: 'Budi Santoso',
            avatar: null
        },
        rating: 4,
        comment: 'Bagus, tapi mungkin bisa ditambahkan lebih banyak contoh soal.',
        createdAt: '2025-07-11T15:45:00Z'
    }
];

// Current user (for authentication simulation)
export const currentUser = {
    id: 'current-user',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: null,
    points: 450,
    role: 'user',
    joinDate: '2025-06-01T00:00:00Z',
    uploadCount: 3,
    downloadCount: 15,
    university: 'Universitas Negeri Jakarta'
};
