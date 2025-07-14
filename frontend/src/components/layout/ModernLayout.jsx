import React from 'react';
import ModernNavbar from './ModernNavbar';
import Footer from './Footer';

const ModernLayout = ({ children, user }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            <ModernNavbar user={user} />
            <main className="pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default ModernLayout;
