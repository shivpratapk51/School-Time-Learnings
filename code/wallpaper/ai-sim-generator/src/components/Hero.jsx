import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        New: Physics Engine 2.0
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 drop-shadow-2xl">
                        Create AI Simulations <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            for Schools
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Empower students with interactive, AI-generated simulations. Turn complex concepts into engaging visual experiments in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-105 border border-cyan-400/50">
                            Start Creating Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-black/50 backdrop-blur-sm border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/50 rounded-full px-8 py-6 text-lg transition-all hover:scale-105 hover:text-cyan-300">
                            <Play className="mr-2 w-5 h-5 fill-current" />
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Subtle gradient overlay at the bottom to blend into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-black to-transparent z-0 pointer-events-none" />
        </section>
    );
};

export default Hero;
