import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, isAuthenticated, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Check admin privileges if required
    if (requireAdmin && user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
