import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUserStats } from '../context/UserStatsContext';
import { IMAGES } from '../constants';

const TopHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const { onlineUsers } = useUserStats();
    const [hasNotifs, setHasNotifs] = useState(true);

    // User Data State
    const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem('userAvatar') || IMAGES.USER_AVATAR);
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'Marvin R.');

    // Listen for profile updates
    React.useEffect(() => {
        const handleUserUpdate = () => {
            const storedAvatar = localStorage.getItem('userAvatar');
            const storedName = localStorage.getItem('userName');
            if (storedAvatar) setUserAvatar(storedAvatar);
            if (storedName) setUserName(storedName);
        };

        window.addEventListener('user-update', handleUserUpdate);
        return () => window.removeEventListener('user-update', handleUserUpdate);
    }, []);

    const navItemClass = (path: string) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${location.pathname === path ? 'bg-primary text-black font-bold' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'}`;

    return (
        <header className="h-auto py-4 flex flex-col md:flex-row items-center justify-between px-6 border-b border-slate-200 dark:border-border-dark shrink-0 bg-card-light dark:bg-surface-dark z-20 sticky top-0">
            {/* Logo & Brand Section */}
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                <Link to="/" className="block mb-2">
                    <img
                        src={IMAGES.LOGO}
                        alt="FitMarvin"
                        className="h-16 w-auto object-contain"
                    />
                </Link>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">settings</span>
                        Configurar Plan
                    </button>
                    {/* User Stats Indicator */}
                    <div className="md:hidden flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 w-fit mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 tabular-nums">
                            {onlineUsers} online
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-wrap justify-center gap-2 mb-4 md:mb-0">
                <Link to="/" className={navItemClass('/')}>
                    <span className="material-symbols-outlined text-xl">dashboard</span>
                    <span className="text-sm">{t('nav.home')}</span>
                </Link>
                <Link to="/walking" className={navItemClass('/walking')}>
                    <span className="material-symbols-outlined text-xl">directions_walk</span>
                    <span className="text-sm">Caminata Virtual</span>
                </Link>
                <Link to="/cycling" className={navItemClass('/cycling')}>
                    <span className="material-symbols-outlined text-xl">directions_bike</span>
                    <span className="text-sm">Ciclismo Virtual</span>
                </Link>
                <Link to="/exercises" className={navItemClass('/exercises')}>
                    <span className="material-symbols-outlined text-xl">fitness_center</span>
                    <span className="text-sm">{t('nav.exercises')}</span>
                </Link>
                <Link to="/nutrition" className={navItemClass('/nutrition')}>
                    <span className="material-symbols-outlined text-xl">restaurant</span>
                    <span className="text-sm">{t('nav.nutrition')}</span>
                </Link>
                <Link to="/community" className={navItemClass('/community')}>
                    <span className="material-symbols-outlined text-xl">group</span>
                    <span className="text-sm">{t('nav.community')}</span>
                </Link>

            </nav>

            {/* User & Actions */}
            <div className="flex items-center gap-4">
                {/* Online Users Indicator (Desktop) */}
                <div className="hidden md:flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 mr-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 tabular-nums">
                        {onlineUsers} online
                    </span>
                </div>



                <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10 hover:opacity-80 transition-opacity">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold leading-none">{userName}</p>
                        <p className="text-[10px] text-primary font-bold">Pro Member</p>
                    </div>
                    <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-primary" style={{ backgroundImage: `url('${userAvatar}')` }}></div>
                </Link>
            </div>
        </header>
    );
};

export default TopHeader;