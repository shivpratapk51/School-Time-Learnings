import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { Brain, Share2, Zap, Layout, Lock, Users } from 'lucide-react';

const Features = () => {
    return (
        <section id="features" className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Everything you need to <span className="text-blue-400">transform</span> your classroom
                    </h2>
                    <p className="text-lg text-slate-300">
                        Built for educators, powered by advanced AI. We handle the complexity so you can focus on teaching.
                    </p>
                </div>
            </div>
            <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
};

const ImageHeader = ({ src }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-none overflow-hidden">
        <img src={src} alt="Feature" className="w-full h-full object-cover" />
    </div>
);

const items = [
    {
        title: "AI-Powered Generation",
        description: "Describe any scenario in plain English, and our AI builds a physics-accurate simulation instantly.",
        header: <ImageHeader src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" />,
        icon: <Brain className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Real-time Interaction",
        description: "Students can manipulate variables and see results immediately.",
        header: <ImageHeader src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" />,
        icon: <Zap className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "LMS Integration",
        description: "Seamlessly export simulations to Google Classroom, Canvas, and other platforms.",
        header: <ImageHeader src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" />,
        icon: <Share2 className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Customizable Templates",
        description: "Start from scratch or use our library of curriculum-aligned templates.",
        header: <ImageHeader src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" />,
        icon: <Layout className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Collaborative Learning",
        description: "Enable multiplayer mode for group experiments.",
        header: <ImageHeader src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" />,
        icon: <Users className="h-4 w-4 text-neutral-500" />,
    },
];

export default Features;
