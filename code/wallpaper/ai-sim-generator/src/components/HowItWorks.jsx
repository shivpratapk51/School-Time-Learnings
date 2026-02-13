import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Describe the Concept",
        description: "Type a prompt like 'Show a pendulum's period changing with length' or 'Demonstrate photosynthesis'."
    },
    {
        number: "02",
        title: "AI Generates Simulation",
        description: "Our engine builds the visual assets, physics rules, and interactive controls in seconds."
    },
    {
        number: "03",
        title: "Customize & Share",
        description: "Tweak the parameters, add your quiz questions, and share the link with your students."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                            From idea to interactive lesson in <span className="text-blue-600">three steps</span>
                        </h2>
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex gap-6"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10" />
                        <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
                            {/* Mock Code/Prompt Interface */}
                            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="text-slate-400">
                                    <span className="text-purple-400">User</span>: Create a simulation of the solar system with adjustable gravity.
                                </div>
                                <div className="text-blue-400">
                                    <span className="text-green-400">AI</span>: Processing request...
                                </div>
                                <div className="pl-4 border-l-2 border-slate-700 space-y-2">
                                    <div className="text-slate-300">Generating celestial bodies... <span className="text-green-500">Done</span></div>
                                    <div className="text-slate-300">Applying orbital mechanics... <span className="text-green-500">Done</span></div>
                                    <div className="text-slate-300">Building UI controls... <span className="text-green-500">Done</span></div>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg mt-4 border border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-200 font-bold">Preview Ready</span>
                                        <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-500">Launch</button>
                                    </div>
                                    <div className="h-32 bg-slate-900 rounded flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                                        <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-1/4 top-1/3" />
                                        <div className="absolute w-20 h-20 border border-slate-700 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
