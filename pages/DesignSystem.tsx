import React from 'react';

const DesignSystem = () => {
    return (
        <div className="flex h-full">
            <main className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#020202] p-10">
                <header className="mb-12">
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Technical Documentation</p>
                    <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">Guía de Estilos <span className="text-primary font-light not-italic lowercase">(Dev)</span></h1>
                </header>
                <div className="grid grid-cols-12 gap-6">
                    <section className="col-span-12 lg:col-span-7 bg-card-dark rounded-2xl border border-white/10 p-8">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase italic">Brand Palette</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2"><div className="h-24 rounded-lg bg-primary"></div><p className="text-xs font-bold text-white">Primary</p></div>
                            <div className="space-y-2"><div className="h-24 rounded-lg bg-accent-blue"></div><p className="text-xs font-bold text-white">Secondary</p></div>
                            <div className="space-y-2"><div className="h-24 rounded-lg bg-surface-dark border border-white/10"></div><p className="text-xs font-bold text-white">Surface</p></div>
                            <div className="space-y-2"><div className="h-24 rounded-lg bg-white"></div><p className="text-xs font-bold text-white">Base</p></div>
                        </div>
                    </section>
                    <section className="col-span-12 lg:col-span-5 bg-primary/10 rounded-2xl border border-primary/20 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-black italic text-primary uppercase mb-4">Performance Layering</h2>
                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-4"><div className="h-full bg-primary w-3/4 shadow-[0_0_10px_#20df70]"></div></div>
                        <p className="text-sm font-bold opacity-60 text-primary uppercase tracking-widest">System Readiness: 85%</p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default DesignSystem;
