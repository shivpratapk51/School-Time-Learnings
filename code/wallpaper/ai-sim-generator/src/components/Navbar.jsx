import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300`}>
            <div className={`max-w-5xl mx-auto px-6 rounded-full transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg' : 'bg-transparent border border-transparent'}`}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/logo.jpg" alt="Parallax Logo" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-lg font-bold text-white tracking-tight">
                            Parallax
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-slate-300 hover:text-cyan-400 font-medium transition-colors uppercase tracking-wide">Features</a>
                        <a href="#how-it-works" className="text-sm text-slate-300 hover:text-cyan-400 font-medium transition-colors uppercase tracking-wide">How it Works</a>
                        <a href="#pricing" className="text-sm text-slate-300 hover:text-cyan-400 font-medium transition-colors uppercase tracking-wide">Pricing</a>
                        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6">Get Started</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col">
                            <a href="#features" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                            <a href="#how-it-works" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
                            <a href="#pricing" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                            <Button className="w-full bg-white text-black hover:bg-slate-200">Get Started</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
