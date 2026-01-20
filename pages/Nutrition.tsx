import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

// --- DATA TYPES & GENERATION ---
interface DayPlan {
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
}

const generatePlan = (type: 'lose' | 'gain'): DayPlan[] => {
    const menus = type === 'lose'
        ? [
            { b: 'Tortilla de claras (4) y espinacas', l: 'Pechuga de pollo (200g) con brócoli', d: 'Ensalada de atún y aguacate' },
            { b: 'Avena cocida con frutos rojos', l: 'Pavo al horno con batata asada', d: 'Crema de calabaza y merluza al vapor' },
            { b: 'Tostada integral con aguacate', l: 'Lentejas estofadas con verduras', d: 'Salmón al vapor con espárragos' },
            { b: 'Yogur griego con nueces', l: 'Ternera magra con arroz integral', d: 'Revuelto de champiñones y gambas' },
            { b: 'Batido de proteína y plátano', l: 'Ensalada de quinoa y pollo', d: 'Lubina al horno con pimientos' },
            { b: 'Tortitas de avena fit', l: 'Hamburguesa de pavo casera', d: 'Ceviche de pescado blanco' },
            { b: 'Huevos revueltos con tomate', l: 'Pasta integral con atún natural', d: 'Pollo al limón con ensalada verde' },
        ]
        : [
            { b: '4 Huevos revueltos con tostadas', l: 'Pasta boloñesa con carne magra', d: 'Salmón con patata asada y aceite' },
            { b: 'Batido de avena, plátano y crema cacahuete', l: 'Arroz con pollo y medio aguacate', d: 'Tortilla de patata y atún' },
            { b: 'Tortitas de avena y miel', l: 'Estofado de ternera con patatas', d: 'Merluza rebozada con arroz frito' },
            { b: 'Sandwich de pavo y queso XXL', l: 'Lentejas con chorizo y arroz', d: 'Pizza casera de pollo y queso' },
            { b: 'Gachas de avena con proteína whey', l: 'Burritos de carne y frijoles', d: 'Hamburguesa de ternera completa' },
            { b: 'Tostadas francesas proteicas', l: 'Pollo al curry con arroz basmati', d: 'Lasagna de calabacín y carne' },
            { b: 'Huevos fritos con bacon de pavo', l: 'Fideuá de marisco', d: 'Bocadillo de lomo y queso' },
        ];

    const days: DayPlan[] = [];
    for (let i = 1; i <= 30; i++) {
        const menu = menus[(i - 1) % menus.length];
        days.push({
            day: i,
            breakfast: menu.b,
            lunch: menu.l,
            dinner: menu.d
        });
    }
    return days;
};

const PLAN_DATA = {
    lose: generatePlan('lose'),
    gain: generatePlan('gain')
};

const NutritionPlan = () => {
    const { language } = useLanguage();
    const [goal, setGoal] = useState<'lose' | 'gain'>('lose');
    const [weight, setWeight] = useState(78.5);
    const [isUpdating, setIsUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleUpdateWeight = () => {
        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            const change = Math.random() > 0.5 ? -0.2 : 0.1;
            setWeight(prev => Number((prev + change).toFixed(1)));
            setIsUpdating(false);
            alert("¡Peso actualizado correctamente!");
        }, 800);
    };

    const filteredPlan = useMemo(() => {
        const currentPlan = PLAN_DATA[goal];
        if (!searchTerm) return currentPlan;
        const lowerTerm = searchTerm.toLowerCase();
        return currentPlan.filter(day =>
            day.day.toString().includes(lowerTerm) ||
            day.breakfast.toLowerCase().includes(lowerTerm) ||
            day.lunch.toLowerCase().includes(lowerTerm) ||
            day.dinner.toLowerCase().includes(lowerTerm)
        );
    }, [goal, searchTerm]);

    return (
        <div className="flex h-full">
            <main className="flex-grow flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
                <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-7xl mx-auto w-full">

                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">Plan Nutricional</h1>
                                <p className="text-slate-500 text-lg max-w-xl">
                                    Tu hoja de ruta de 30 días para {goal === 'lose' ? 'definición máxima' : 'volumen limpio'}.
                                </p>
                            </div>
                            <div className="flex h-12 bg-card-light dark:bg-surface-dark p-1 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                                <button
                                    onClick={() => setGoal('lose')}
                                    className={`px-6 rounded-lg font-bold text-sm uppercase transition-all ${goal === 'lose' ? 'bg-primary text-black shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Perder Peso
                                </button>
                                <button
                                    onClick={() => setGoal('gain')}
                                    className={`px-6 rounded-lg font-bold text-sm uppercase transition-all ${goal === 'gain' ? 'bg-primary text-black shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Ganar Masa
                                </button>
                            </div>
                        </div>

                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                            <div className="p-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-sm">
                                <p className="text-slate-500 text-xs font-bold uppercase mb-2">Días Completados</p>
                                <p className="text-3xl font-black">12/30</p>
                                <div className="w-full bg-slate-100 dark:bg-border-dark h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-primary h-full w-[40%]"></div>
                                </div>
                            </div>
                            <div className="p-6 bg-primary text-black rounded-xl relative overflow-hidden group shadow-lg shadow-primary/20">
                                <p className="text-black/60 text-xs font-bold uppercase mb-2">Peso Actual</p>
                                <p className="text-3xl font-black flex items-center gap-2">
                                    {weight} kg
                                    {isUpdating && <span className="material-symbols-outlined animate-spin text-lg">sync</span>}
                                </p>
                                <button
                                    onClick={handleUpdateWeight}
                                    disabled={isUpdating}
                                    className="mt-4 w-full py-2 bg-black text-primary text-[10px] font-black uppercase rounded hover:bg-black/80 transition-colors disabled:opacity-70"
                                >
                                    {isUpdating ? 'Actualizando...' : 'Actualizar'}
                                </button>
                            </div>
                            <div className="p-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl md:col-span-2 shadow-sm">
                                <p className="text-slate-500 text-xs font-bold uppercase mb-2">Macros Diarios ({goal === 'lose' ? 'Déficit' : 'Superávit'})</p>
                                <div className="flex gap-4 items-center h-full justify-around">
                                    <div className="text-center"><p className="font-bold text-2xl text-slate-900 dark:text-white">{goal === 'lose' ? '185' : '220'}g</p><p className="text-[10px] uppercase text-slate-500 font-bold">Proteína</p></div>
                                    <div className="w-px h-10 bg-slate-200 dark:bg-border-dark"></div>
                                    <div className="text-center"><p className="font-bold text-2xl text-slate-900 dark:text-white">{goal === 'lose' ? '210' : '350'}g</p><p className="text-[10px] uppercase text-slate-500 font-bold">Carbos</p></div>
                                    <div className="w-px h-10 bg-slate-200 dark:bg-border-dark"></div>
                                    <div className="text-center"><p className="font-bold text-2xl text-slate-900 dark:text-white">{goal === 'lose' ? '65' : '80'}g</p><p className="text-[10px] uppercase text-slate-500 font-bold">Grasas</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Plan Section */}
                        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                Calendario de Comidas
                            </h2>
                            {/* Search Bar Removed */}
                        </div>

                        {filteredPlan.length === 0 ? (
                            <div className="text-center py-20 opacity-50 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark">
                                <span className="material-symbols-outlined text-6xl mb-4 text-slate-400">no_food</span>
                                <p className="text-xl text-slate-500">No se encontraron comidas con esa búsqueda.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredPlan.map((plan) => (
                                    <div
                                        key={plan.day}
                                        className={`group rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${plan.day === 12
                                            ? 'bg-white dark:bg-surface-dark border-primary ring-1 ring-primary relative overflow-hidden'
                                            : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark hover:border-primary/50'
                                            }`}
                                    >
                                        {plan.day === 12 && (
                                            <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                                                Hoy
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`size-10 rounded-full flex items-center justify-center font-black text-lg ${plan.day === 12 ? 'bg-primary text-black' : 'bg-slate-100 dark:bg-border-dark text-slate-500'
                                                }`}>
                                                {plan.day}
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Día {plan.day}</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex gap-3 items-start">
                                                <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">wb_sunny</span>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Desayuno</p>
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{plan.breakfast}</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
                                            <div className="flex gap-3 items-start">
                                                <span className="material-symbols-outlined text-yellow-500 text-lg mt-0.5">restaurant</span>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Almuerzo</p>
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{plan.lunch}</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
                                            <div className="flex gap-3 items-start">
                                                <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5">nights_stay</span>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cena</p>
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{plan.dinner}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default NutritionPlan;