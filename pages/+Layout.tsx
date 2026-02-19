import '../src/index.css';
import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    const handleNavigateHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-white">
            <Header onNavigateHome={handleNavigateHome} />
            {children}
            <Footer />
        </div>
    );
}
