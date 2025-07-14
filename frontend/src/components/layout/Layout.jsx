import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, user }) => {
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 font-['Hanken_Grotesk']">
        <Navbar user={user} />
        <main className="pt-16">
            {children}
        </main>
        <Footer />
    </div>
    );
};

export default Layout;
