import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('userFavorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    // Save favorites to localStorage whenever favorites change
    useEffect(() => {
        try {
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]); const addToFavorites = async (noteId) => {
        setLoading(true);
        try {
            if (!favorites.includes(noteId)) {
                const newFavorites = [...favorites, noteId];
                setFavorites(newFavorites);

                // In a real app, you would make an API call here
                // await api.addToFavorites(noteId);

                toast.success('📚 Note added to favorites!', {
                    position: "top-right",
                    autoClose: 2000,
                });

                return { success: true, message: 'Note added to favorites!' };
            }

            toast.info('📝 Note is already in favorites', {
                position: "top-right",
                autoClose: 2000,
            });
            return { success: false, message: 'Note is already in favorites' };
        } catch (error) {
            console.error('Error adding to favorites:', error);
            toast.error('❌ Failed to add note to favorites', {
                position: "top-right",
                autoClose: 3000,
            });
            return { success: false, message: 'Failed to add note to favorites' };
        } finally {
            setLoading(false);
        }
    }; const removeFromFavorites = async (noteId) => {
        setLoading(true);
        try {
            const newFavorites = favorites.filter(id => id !== noteId);
            setFavorites(newFavorites);

            // In a real app, you would make an API call here
            // await api.removeFromFavorites(noteId);

            toast.success('💔 Note removed from favorites!', {
                position: "top-right",
                autoClose: 2000,
            });

            return { success: true, message: 'Note removed from favorites!' };
        } catch (error) {
            console.error('Error removing from favorites:', error);
            toast.error('❌ Failed to remove note from favorites', {
                position: "top-right",
                autoClose: 3000,
            });
            return { success: false, message: 'Failed to remove note from favorites' };
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (noteId) => {
        if (favorites.includes(noteId)) {
            return await removeFromFavorites(noteId);
        } else {
            return await addToFavorites(noteId);
        }
    };

    const isFavorite = (noteId) => {
        return favorites.includes(noteId);
    };

    const getFavoriteNotes = (allNotes) => {
        return allNotes.filter(note => favorites.includes(note.id));
    };

    const clearAllFavorites = () => {
        setFavorites([]);
        return { success: true, message: 'All favorites cleared!' };
    };

    const value = {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoriteNotes,
        clearAllFavorites,
        favoriteCount: favorites.length
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
