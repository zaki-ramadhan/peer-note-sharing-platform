
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, user }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar user={user} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
