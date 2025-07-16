import { toast } from 'react-toastify';

// Search related notifications
export const showSearchToast = (query) => {
    toast.info(`🔍 Mencari "${query}"...`, {
        position: "top-right",
        autoClose: 1500,
    });
};

export const showSearchResultsToast = (count, query) => {
    if (count === 0) {
        toast.info(`🔍 Tidak ada hasil untuk "${query}"`, {
            position: "top-right",
            autoClose: 2000,
        });
    } else {
        toast.success(`🎯 Ditemukan ${count} hasil untuk "${query}"`, {
            position: "top-right",
            autoClose: 2000,
        });
    }
};

// Download related notifications
export const showDownloadStartToast = (title) => {
    toast.info(`📥 Mengunduh "${title}"...`, {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showDownloadSuccessToast = (title) => {
    toast.success(`✅ "${title}" berhasil diunduh!`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showDownloadErrorToast = () => {
    toast.error('❌ Unduhan gagal. Silakan coba lagi.', {
        position: "top-right",
        autoClose: 3000,
    });
};

// Rating related notifications
export const showRatingSuccessToast = (title) => {
    toast.success(`⭐ Terima kasih telah menilai "${title}"!`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showRatingErrorToast = () => {
    toast.error('❌ Gagal mengirim penilaian. Silakan coba lagi.', {
        position: "top-right",
        autoClose: 3000,
    });
};

// Authentication related notifications
export const showLoginStartToast = () => {
    toast.info('🔐 Sedang masuk...', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showLoginSuccessToast = (userName) => {
    toast.success(`🎉 Selamat datang kembali, ${userName}!`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showLoginErrorToast = (message = 'Login gagal') => {
    toast.error(`❌ ${message}`, {
        position: "top-right",
        autoClose: 4000,
    });
};

export const showRegisterStartToast = () => {
    toast.info('📝 Membuat akun Anda...', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showRegisterSuccessToast = (userName) => {
    toast.success(`🎉 Selamat datang di PeerNote, ${userName}! Akun Anda berhasil dibuat.`, {
        position: "top-right",
        autoClose: 4000,
    });
};

export const showRegisterErrorToast = (message = 'Pendaftaran gagal') => {
    toast.error(`❌ ${message}`, {
        position: "top-right",
        autoClose: 4000,
    });
};

export const showLogoutStartToast = () => {
    toast.info('👋 Sedang keluar...', {
        position: "top-right",
        autoClose: 1500,
    });
};

export const showLogoutSuccessToast = () => {
    toast.success('👋 Anda berhasil keluar!', {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showLogoutErrorToast = () => {
    toast.error('❌ Logout gagal. Silakan coba lagi.', {
        position: "top-right",
        autoClose: 3000,
    });
};

// Session related notifications
export const showSessionExpiredToast = () => {
    toast.warning('⚠️ Sesi Anda telah berakhir. Silakan masuk kembali.', {
        position: "top-right",
        autoClose: 4000,
    });
};

export const showInvalidCredentialsToast = () => {
    toast.error('❌ Email atau kata sandi salah. Silakan coba lagi.', {
        position: "top-right",
        autoClose: 4000,
    });
};

export const showAccountCreatedToast = () => {
    toast.success('✅ Akun berhasil dibuat! Silakan periksa email Anda untuk verifikasi akun.', {
        position: "top-right",
        autoClose: 5000,
    });
};

// Generic notifications
export const showGenericErrorToast = (message = 'Terjadi kesalahan!') => {
    toast.error(`❌ ${message}`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showFeatureComingSoonToast = (feature) => {
    toast.info(`🔖 Fitur ${feature} segera hadir!`, {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showShareSuccessToast = () => {
    toast.success('📤 Catatan berhasil dibagikan!', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showCopySuccessToast = () => {
    toast.success('📋 Tautan berhasil disalin!', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showShareErrorToast = () => {
    toast.error('❌ Gagal membagikan catatan', {
        position: "top-right",
        autoClose: 2000,
    });
};

// Generic success notification
export const showSuccessToast = (message) => {
    toast.success(`✅ ${message}`, {
        position: "top-right",
        autoClose: 3000,
    });
};

// Generic error notification
export const showErrorToast = (message = 'Terjadi kesalahan!') => {
    toast.error(`❌ ${message}`, {
        position: "top-right",
        autoClose: 3000,
    });
};

// Generic info notification
export const showInfoToast = (message) => {
    toast.info(`ℹ️ ${message}`, {
        position: "top-right",
        autoClose: 3000,
    });
};
