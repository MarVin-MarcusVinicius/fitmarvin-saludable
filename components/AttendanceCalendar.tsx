import React, { useState } from 'react';

interface AttendanceCalendarProps {
    attendance: Record<string, 'present' | 'absent' | undefined>;
    onToggleDay: (date: string) => void;
    goal?: string; // New prop
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ attendance, onToggleDay, goal }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Motivational Messages
    const motivationalMessages: Record<string, string[]> = {
        'Lose Weight': [
            "¡Genial! Estás quemando calorías.",
            "¡Un paso más cerca de tu peso ideal!",
            "¡El sudor es grasa llorando!"
        ],
        'Lose Fat': [
            "¡Adiós grasa, hola energía!",
            "¡Te estás definiendo!",
            "¡Cada día cuenta para tu transformación!"
        ],
        'Gain Muscle': [
            "¡Esos músculos están creciendo!",
            "¡Fuerza pura! Sigue así.",
            "¡Construyendo tu mejor versión!"
        ],
        'Gain Weight': [
            "¡Nutrición y entreno, la clave del éxito!",
            "¡Estás ganando volumen de calidad!",
            "¡Sigue sumando!"
        ],
        'default': [
            "¡Buen trabajo!",
            "¡La constancia es la clave!",
            "¡Sigue así, vas muy bien!"
        ]
    };

    const getRandomMessage = (userGoal: string = '') => {
        // Simple matching logic
        let key = 'default';
        if (userGoal.includes('Lose') || userGoal.includes('Perder')) key = 'Lose Weight';
        if (userGoal.includes('Muscle') || userGoal.includes('Músculo')) key = 'Gain Muscle';

        const messages = motivationalMessages[key] || motivationalMessages['default'];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const handleDayClick = (dateKey: string) => {
        onToggleDay(dateKey);

        // Show message if we are marking as PRESENT (current state is not present)
        // Wrap in setTimeout to allow UI to update (show checkmark) before blocking with alert
        if (attendance[dateKey] !== 'present') {
            setTimeout(() => {
                alert(getRandomMessage(goal));
            }, 100);
        }
    };

    const getWeeklyCount = () => {
        // Calculate days present in the CURRENT week (Mon-Sun or Sun-Sat)
        // Let's assume current week of "Today"
        const now = new Date();
        const startOfWeek = new Date(now);
        const day = startOfWeek.getDay() || 7; // Make Sunday=7
        if (day !== 1) startOfWeek.setHours(-24 * (day - 1)); // Go back to Monday

        let count = 0;
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(d.getDate() + i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (attendance[key] === 'present') count++;
        }
        return count;
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = new Date(year, month, 1).getDay();
        return (day - 1 + 7) % 7;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const formatDateKey = (day: number) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${month}-${d}`;
    };

    const renderDays = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-full" />);
        }

        // Days of current month
        for (let day = 1; day <= totalDays; day++) {
            const dateKey = formatDateKey(day);
            const status = attendance[dateKey];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <button
                    key={dateKey}
                    onClick={() => handleDayClick(dateKey)}
                    className={`h-10 w-full rounded-lg flex items-center justify-center text-sm font-bold transition-all
                        ${status === 'present'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : status === 'absent'
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-100 dark:bg-card-dark text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-border-dark'
                        }
                        ${isToday ? 'border-2 border-primary' : 'border border-transparent'}
                    `}
                >
                    {status === 'present' ? (
                        <span className="material-symbols-outlined text-lg">check</span>
                    ) : status === 'absent' ? (
                        <span className="material-symbols-outlined text-lg">close</span>
                    ) : (
                        day
                    )}
                </button>
            );
        }

        return days;
    };

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <div className="bg-card-light dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                    Asistencia
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">
                        Semana: {getWeeklyCount()}/7
                    </span>
                </h3>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-background-dark p-1 rounded-lg">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-white dark:hover:bg-surface-dark rounded transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <span className="font-bold min-w-[100px] text-center">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-white dark:hover:bg-surface-dark rounded transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <span key={d} className="text-xs font-bold text-slate-400">{d}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {renderDays()}
            </div>

            <div className="mt-6 flex gap-4 text-xs font-bold text-slate-500 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div> Presente
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Ausente
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-card-dark"></div> Sin registro
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;
