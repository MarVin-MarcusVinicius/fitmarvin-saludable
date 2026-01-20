import React, { useState, useRef, useEffect } from 'react';
import { useUserStats } from '../context/UserStatsContext';
import AttendanceCalendar from '../components/AttendanceCalendar';
import EvolutionChart from '../components/EvolutionChart';
import { IMAGES } from '../constants';

const ProfileSettings = () => {
    // Check initial dark mode from html class
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const { deleteAccount } = useUserStats();
    const [avatar, setAvatar] = useState(IMAGES.USER_AVATAR);

    // Editable States
    const [name, setName] = useState('Marvin R.');
    const [weight, setWeight] = useState('75');
    const [height, setHeight] = useState('180');
    const [instagram, setInstagram] = useState('@marvin_fit');
    const [goal, setGoal] = useState('');

    // New Features state
    const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | undefined>>({});
    const [weightHistory, setWeightHistory] = useState<{ date: string, weight: number }[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedAvatar = localStorage.getItem('userAvatar');
        const storedName = localStorage.getItem('userName');
        const storedWeight = localStorage.getItem('userWeight');
        const storedHeight = localStorage.getItem('userHeight');
        const storedInsta = localStorage.getItem('userInstagram');
        const storedGoal = localStorage.getItem('userGoal');

        const storedAttendance = localStorage.getItem('userAttendance');
        const storedHistory = localStorage.getItem('userWeightHistory');

        if (storedAvatar) setAvatar(storedAvatar);
        if (storedName) setName(storedName);
        if (storedWeight) setWeight(storedWeight);
        if (storedHeight) setHeight(storedHeight);
        if (storedInsta) setInstagram(storedInsta);
        if (storedGoal) setGoal(storedGoal);

        if (storedAttendance) {
            try {
                setAttendance(JSON.parse(storedAttendance));
            } catch (e) { console.error("Error parsing attendance", e); }
        }

        if (storedHistory) {
            try {
                setWeightHistory(JSON.parse(storedHistory));
            } catch (e) { console.error("Error parsing weight history", e); }
        } else if (storedWeight) {
            // Initialize history with current weight if no history exists
            setWeightHistory([{ date: new Date().toISOString().split('T')[0], weight: parseFloat(storedWeight) }]);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    const handleSave = () => {
        // Save all data to localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userWeight', weight);
        localStorage.setItem('userHeight', height);
        localStorage.setItem('userInstagram', instagram);
        localStorage.setItem('userAvatar', avatar);

        // Update Weight History
        const today = new Date().toISOString().split('T')[0];
        const currentWeightVal = parseFloat(weight);

        let newHistory = [...weightHistory];
        const existingEntryIndex = newHistory.findIndex(h => h.date === today);

        if (existingEntryIndex >= 0) {
            newHistory[existingEntryIndex].weight = currentWeightVal;
        } else {
            newHistory.push({ date: today, weight: currentWeightVal });
        }

        // Sort by date just in case
        newHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setWeightHistory(newHistory);
        localStorage.setItem('userWeightHistory', JSON.stringify(newHistory));
        localStorage.setItem('userAttendance', JSON.stringify(attendance));

        // Dispatch event so Sidebar updates immediately
        window.dispatchEvent(new Event('user-update'));

        // UI Feedback
        const btn = document.getElementById('save-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined">check</span> Guardado';
            btn.classList.add('bg-green-500', 'text-white');
            btn.classList.remove('bg-primary', 'text-black');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-500', 'text-white');
                btn.classList.add('bg-primary', 'text-black');
            }, 2000);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                setAvatar(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleToggleAttendance = (dateKey: string) => {
        const newAttendance = { ...attendance };
        const currentStatus = newAttendance[dateKey];

        if (currentStatus === 'present') {
            newAttendance[dateKey] = 'absent';
        } else if (currentStatus === 'absent') {
            delete newAttendance[dateKey]; // remove status
        } else {
            newAttendance[dateKey] = 'present';
        }

        setAttendance(newAttendance);
        // Save immediately for better UX
        localStorage.setItem('userAttendance', JSON.stringify(newAttendance));
    };

    return (
        <div className="flex h-full">
            <main className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
                <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-8 py-8 border-b border-slate-200 dark:border-border-dark">
                    <div className="max-w-4xl mx-auto flex justify-between items-end">
                        <div>
                            <h2 className="text-4xl font-extrabold">Perfil y Ajustes</h2>
                            <p className="text-slate-500 mt-2">Gestiona tus datos físicos y preferencias.</p>
                        </div>
                        <button
                            id="save-btn"
                            onClick={handleSave}
                            className="bg-primary text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-lg">save</span> Guardar
                        </button>
                    </div>
                </header>
                <div className="max-w-4xl mx-auto w-full px-8 py-10 space-y-12">

                    {/* Editable User Header */}
                    <section className="flex flex-col md:flex-row items-center gap-8 p-8 bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-3xl shadow-sm">
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-border-dark group-hover:border-primary transition-colors">
                                <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex-1 w-full text-center md:text-left space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-background-dark/50 border-none rounded-xl px-4 py-3 text-xl font-bold focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Objetivo Actual</label>
                                <div className="p-3 bg-slate-100 dark:bg-background-dark/50 rounded-xl flex items-center gap-2 border border-transparent hover:border-slate-200 dark:hover:border-border-dark transition-colors cursor-pointer group/goal" onClick={() => alert('Para cambiar tu objetivo, ve a Configurar Plan.')}>
                                    <span className="material-symbols-outlined text-primary group-hover/goal:scale-110 transition-transform">flag</span>
                                    <span className="font-bold text-lg text-slate-700 dark:text-slate-300">{goal || 'Sin definir'}</span>
                                    <span className="material-symbols-outlined text-slate-400 text-sm ml-auto opacity-0 group-hover/goal:opacity-100 transition-opacity">edit</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Instagram / Red Social</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">@</span>
                                    <input
                                        type="text"
                                        value={instagram.replace('@', '')}
                                        onChange={(e) => setInstagram('@' + e.target.value.replace('@', ''))}
                                        className="w-full bg-slate-100 dark:bg-background-dark/50 border-none rounded-xl pl-10 pr-4 py-3 text-lg font-medium focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-300"
                                        placeholder="usuario"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Plan Configuration Button */}
                    <button
                        onClick={() => alert("Próximamente: Configuración de Plan Personalizado y Rutinas.")}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 text-primary font-bold text-lg hover:from-primary/30 hover:to-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm"
                    >
                        <span className="material-symbols-outlined">settings_suggest</span>
                        Configurar Plan de Entrenamiento
                    </button>

                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">monitoring</span> Datos Físicos Editables</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Weight Input */}
                            <div className="p-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl flex justify-between items-center hover:border-primary/50 transition-colors group focus-within:ring-2 focus-within:ring-primary/20">
                                <div className="flex flex-col">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Peso Actual</p>
                                    <div className="flex items-baseline gap-1">
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="bg-transparent border-none p-0 w-24 text-4xl font-black text-slate-900 dark:text-white focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="text-primary text-xl font-bold">kg</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-4xl opacity-10 group-hover:opacity-30 transition-opacity">scale</span>
                            </div>

                            {/* Height Input */}
                            <div className="p-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl flex justify-between items-center hover:border-primary/50 transition-colors group focus-within:ring-2 focus-within:ring-primary/20">
                                <div className="flex flex-col">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Altura</p>
                                    <div className="flex items-baseline gap-1">
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="bg-transparent border-none p-0 w-24 text-4xl font-black text-slate-900 dark:text-white focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="text-primary text-xl font-bold">cm</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-4xl opacity-10 group-hover:opacity-30 transition-opacity">straighten</span>
                            </div>
                        </div>
                    </section>

                    {/* New Calendar and Chart Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Attendance Calendar */}
                            <AttendanceCalendar
                                attendance={attendance}
                                onToggleDay={handleToggleAttendance}
                                goal={goal} // Pass the user goal
                            />

                            {/* Weight History Chart */}
                            <EvolutionChart data={weightHistory} />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">accessibility_new</span> Accesibilidad & Tema</h3>
                        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-border-dark">

                            <div className="p-6 flex justify-between items-center">
                                <div><p className="font-bold">Modo Oscuro</p><p className="text-sm text-slate-500">Cambia entre tema claro y oscuro.</p></div>
                                <button
                                    onClick={toggleDarkMode}
                                    className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 size-5 bg-white rounded-full transition-all duration-300 shadow-sm ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </section>
                    <div className="pt-10 border-t border-slate-200 dark:border-border-dark">
                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer y reducirá el contador de usuarios.')) {
                                    deleteAccount();
                                }
                            }}
                            className="text-rose-500 font-bold hover:text-rose-400 flex items-center gap-2 transition-colors px-4 py-2 hover:bg-rose-500/10 rounded-lg w-fit"
                        >
                            <span className="material-symbols-outlined">delete_forever</span> Eliminar cuenta y Salir
                        </button>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default ProfileSettings;