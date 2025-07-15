import { toast } from 'react-toastify';

// Search related notifications
export const showSearchToast = (query) => {
    toast.info(`🔍 Searching for "${query}"...`, {
        position: "top-right",
        autoClose: 1500,
    });
};

export const showSearchResultsToast = (count, query) => {
    if (count === 0) {
        toast.info(`🔍 No results found for "${query}"`, {
            position: "top-right",
            autoClose: 2000,
        });
    } else {
        toast.success(`🎯 Found ${count} result${count > 1 ? 's' : ''} for "${query}"`, {
            position: "top-right",
            autoClose: 2000,
        });
    }
};

// Download related notifications
export const showDownloadStartToast = (title) => {
    toast.info(`📥 Downloading "${title}"...`, {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showDownloadSuccessToast = (title) => {
    toast.success(`✅ "${title}" downloaded successfully!`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showDownloadErrorToast = () => {
    toast.error('❌ Download failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
    });
};

// Rating related notifications
export const showRatingSuccessToast = (title) => {
    toast.success(`⭐ Thank you for rating "${title}"!`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showRatingErrorToast = () => {
    toast.error('❌ Failed to submit rating. Please try again.', {
        position: "top-right",
        autoClose: 3000,
    });
};

// Generic notifications
export const showGenericErrorToast = (message = 'Something went wrong!') => {
    toast.error(`❌ ${message}`, {
        position: "top-right",
        autoClose: 3000,
    });
};

export const showFeatureComingSoonToast = (feature) => {
    toast.info(`🔖 ${feature} feature coming soon!`, {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showShareSuccessToast = () => {
    toast.success('📤 Note shared successfully!', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showCopySuccessToast = () => {
    toast.success('📋 Link copied to clipboard!', {
        position: "top-right",
        autoClose: 2000,
    });
};

export const showShareErrorToast = () => {
    toast.error('❌ Failed to share note', {
        position: "top-right",
        autoClose: 2000,
    });
};
