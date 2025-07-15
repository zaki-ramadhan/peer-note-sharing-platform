import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in on app start
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []); const login = async (credentials) => {
        try {
            setLoading(true);

            // Simulate API call
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    // Check if admin credentials
                    const isAdmin = credentials.email === 'admin@noteshare.com' && credentials.password === 'admin123';

                    // Mock user data based on credentials
                    const mockUser = {
                        id: isAdmin ? 'admin-1' : 'user-' + Date.now(),
                        name: isAdmin ? 'Administrator' : 'John Doe',
                        email: credentials.email,
                        role: isAdmin ? 'admin' : 'user',
                        avatar: isAdmin
                            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                        points: isAdmin ? 0 : 1250,
                        joinDate: new Date().toISOString(),
                        university: isAdmin ? 'System Admin' : 'Tech University',
                        bio: isAdmin ? 'Platform Administrator' : 'Computer Science student passionate about sharing knowledge and helping fellow students succeed.',
                        phone: isAdmin ? '' : '+62 812 3456 7890',
                        location: isAdmin ? 'Server Room' : 'Jakarta, Indonesia',
                        website: isAdmin ? 'https://admin.noteshare.com' : 'https://johndoe.dev'
                    };

                    const mockToken = 'mock-jwt-token-' + Date.now();

                    // Validate credentials (simple check for demo)
                    const isValidUser = credentials.email && credentials.password;

                    if (isValidUser) {
                        resolve({
                            success: true,
                            data: {
                                user: mockUser,
                                token: mockToken
                            }
                        });
                    } else {
                        resolve({
                            success: false,
                            message: 'Invalid credentials'
                        });
                    }
                }, 1500);
            });

            if (response.success) {
                const { user: userData, token } = response.data;

                // Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                // Update state
                setUser(userData);
                setIsAuthenticated(true);

                return { success: true, user: userData };
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.message || 'Login failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);

            // Simulate API call
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    const mockUser = {
                        id: 'user-' + Date.now(),
                        name: userData.name,
                        email: userData.email,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3B82F6&color=fff`,
                        points: 0,
                        role: 'user',
                        joinDate: new Date().toISOString(),
                        university: userData.university,
                        bio: '',
                        phone: '',
                        location: '',
                        website: ''
                    };

                    const mockToken = 'mock-jwt-token-' + Date.now();

                    resolve({
                        success: true,
                        data: {
                            user: mockUser,
                            token: mockToken
                        }
                    });
                }, 2000);
            });

            if (response.success) {
                const { user: newUser, token } = response.data;

                // Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(newUser));

                // Update state
                setUser(newUser);
                setIsAuthenticated(true);

                return { success: true, user: newUser };
            } else {
                throw new Error(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: error.message || 'Registration failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);

            // Simulate logout API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Update state
            setUser(null);
            setIsAuthenticated(false);

            // Navigate to home
            navigate('/');

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Logout failed' };
        } finally {
            setLoading(false);
        }
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
