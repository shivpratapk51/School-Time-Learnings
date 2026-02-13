import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';

function App() {
    return (
        <div className="min-h-screen font-sans text-slate-200 relative">
            <TechBackground />
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}

export default App;
