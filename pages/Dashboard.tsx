import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';
import { useUserStats } from '../context/UserStatsContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const [chartPeriod, setChartPeriod] = useState<'7D' | '30D'>('30D');
    const { totalUsers, onlineUsers } = useUserStats();

    // Redirect to onboarding if no user is logged in
    React.useEffect(() => {
        const user = localStorage.getItem('userName');
        if (!user) {
            navigate('/onboarding');
        }
    }, [navigate]);

    return (
        <div className="flex h-full flex-col">
            <main className="flex-grow flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
                <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-4xl font-black tracking-tight mb-2">¡Hola, Marvin!</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">Tu cuerpo es el reflejo de tus hábitos. Esto es lo que tenemos para hoy.</p>
                    </div>
                    <div className="grid grid-cols-12 gap-6 auto-rows-[160px]">
                        {/* Community Stats Card */}
                        <div className="col-span-12 md:col-span-4 row-span-1 bento-card bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl flex flex-col justify-between overflow-hidden relative group cursor-default">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Comunidad</span>
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">group</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">{onlineUsers}</span>
                                    <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Online
                                    </span>
                                </div>
                                <div className="text-xs font-medium text-slate-500">
                                    de <span className="font-bold text-slate-700 dark:text-slate-300">{totalUsers.toLocaleString()}</span> usuarios totales
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-9xl">public</span>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-8 row-span-2 bento-card bg-slate-900 dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl relative overflow-hidden flex flex-col justify-end group cursor-pointer" onClick={() => navigate('/exercises')}>
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${IMAGES.WORKOUT_BG}')` }}></div>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/30">Próximo Nivel</span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2">Pecho y Tríceps - Explosivo</h3>
                                <div className="flex items-center gap-6 text-slate-300 text-sm mb-6">
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">schedule</span> 45 min</span>
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">monitoring</span> Intensidad Alta</span>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-primary/30 hover:-translate-y-1 w-fit">
                                    Empezar Entrenamiento
                                </button>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-7 row-span-2 bento-card bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Progreso de Peso</span>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-4xl font-black">78.5 kg</span>
                                        <span className="text-sm font-bold text-orange-500">-1.2% este mes</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setChartPeriod('7D')}
                                        className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${chartPeriod === '7D' ? 'bg-primary text-black' : 'bg-slate-100 dark:bg-border-dark text-slate-500'}`}
                                    >
                                        7D
                                    </button>
                                    <button
                                        onClick={() => setChartPeriod('30D')}
                                        className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${chartPeriod === '30D' ? 'bg-primary text-black' : 'bg-slate-100 dark:bg-border-dark text-slate-500'}`}
                                    >
                                        30D
                                    </button>
                                </div>
                            </div>
                            <div className="flex-grow flex items-end justify-between gap-2 px-2">
                                {chartPeriod === '30D' ? (
                                    <>
                                        <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-md h-[60%] tooltip" title="Semana 1"></div>
                                        <div className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t-md h-[55%] tooltip" title="Semana 2"></div>
                                        <div className="flex-1 bg-primary/30 hover:bg-primary/40 transition-colors rounded-t-md h-[65%] tooltip" title="Semana 3"></div>
                                        <div className="flex-1 bg-primary/40 hover:bg-primary/50 transition-colors rounded-t-md h-[50%] tooltip" title="Semana 4"></div>
                                        <div className="flex-1 bg-primary hover:bg-primary/90 transition-colors rounded-t-md h-[42%] tooltip" title="Semana 5"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-1 bg-primary/10 rounded-t-md h-[30%] animate-pulse"></div>
                                        <div className="flex-1 bg-primary/20 rounded-t-md h-[45%] animate-pulse" style={{ animationDelay: '100ms' }}></div>
                                        <div className="flex-1 bg-primary/30 rounded-t-md h-[40%] animate-pulse" style={{ animationDelay: '200ms' }}></div>
                                        <div className="flex-1 bg-primary/40 rounded-t-md h-[35%] animate-pulse" style={{ animationDelay: '300ms' }}></div>
                                        <div className="flex-1 bg-primary/60 rounded-t-md h-[42%] animate-pulse" style={{ animationDelay: '400ms' }}></div>
                                        <div className="flex-1 bg-primary/80 rounded-t-md h-[38%] animate-pulse" style={{ animationDelay: '500ms' }}></div>
                                        <div className="flex-1 bg-primary rounded-t-md h-[42%] animate-pulse" style={{ animationDelay: '600ms' }}></div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 row-span-2 bento-card bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Comunidad</span>
                                <Link to="/community" className="text-primary text-xs font-bold hover:underline">Ver todos</Link>
                            </div>
                            <div className="flex flex-col gap-5">
                                {[1, 2].map(i => (
                                    <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-border-dark transition-colors border border-transparent hover:border-slate-200 dark:hover:border-border-dark cursor-pointer group">
                                        <div className="size-12 shrink-0 rounded-lg bg-cover bg-center bg-slate-200" style={{ backgroundImage: `url('${IMAGES.COMMUNITY_AVATAR_1}')` }}></div>
                                        <div>
                                            <p className="text-sm font-bold mb-0.5 group-hover:text-primary transition-colors">@maria_power</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">"¡Finalmente completé el reto de 30 días!"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;