import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MESSAGES = [
    { type: 'hydration', text: '💧 ¡Hora de hidratarse! Un sorbo de agua para seguir con energía.' },
    { type: 'motivation', text: '💪 ¡Tú puedes! Cada pequeño esfuerzo te acerca a tu gran meta.' },
    { type: 'hydration', text: '💧 No olvides beber agua. Tu cuerpo te lo agradecerá.' },
    { type: 'motivation', text: '🔥 ¡Siente el fuego! Estás haciendo un gran trabajo.' },
    { type: 'hydration', text: '💧 Agua = Energía. ¡Bebe un poco ahora!' },
    { type: 'motivation', text: '🌟 La disciplina es el puente entre tus metas y tus logros.' },
    { type: 'hydration', text: '💧 Mantente fresco. Hidrátate para rendir mejor.' },
    { type: 'motivation', text: '🚀 ¡Despegamos! Tu potencial no tiene límites.' },
    { type: 'hydration', text: '💧 ¿Ya has bebido agua? Es el momento perfecto.' },
    { type: 'motivation', text: '✨ Cree en ti mismo y serás imparable.' },
    { type: 'hydration', text: '💧 Tu salud es tu mayor riqueza. ¡Bebe agua!' },
    { type: 'motivation', text: '🏆 El éxito es la suma de pequeños esfuerzos repetidos día tras día.' },
    { type: 'hydration', text: '💧 Hidratación inteligente: pequeñas dosis durante todo el día.' },
    { type: 'motivation', text: '🌈 Después de la tormenta del entrenamiento, vendrá el arcoíris del resultado.' },
    { type: 'hydration', text: '💧 Refresca tu mente y cuerpo con un vaso de agua.' },
    { type: 'motivation', text: '🦁 Tienes la fuerza de un león. ¡Sigue adelante!' },
    { type: 'hydration', text: '💧 No esperes a tener sed. ¡Hidrátate ahora!' },
    { type: 'motivation', text: '🎯 Enfócate en tu objetivo. Estás más cerca de lo que crees.' },
    { type: 'hydration', text: '💧 Agua fría para un entrenamiento intenso. ¡Vamos!' },
    { type: 'motivation', text: '❤️ Amar al prójimo empieza por cuidarte a ti mismo. ¡Dale duro!' },
    { type: 'motivation', text: '🙏 Bendecido para triunfar. ¡No te rindas!' },
    { type: 'motivation', text: '🏠 La comodidad de casa es genial, pero el esfuerzo te hace crecer.' }
];

const HealthReminders = () => {
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Check if we are NOT on the home page
    const isNotHome = location.pathname !== '/';

    useEffect(() => {
        if (!isNotHome) {
            setIsVisible(false);
            return;
        }

        const showMessage = () => {
            const randomIndex = Math.floor(Math.random() * MESSAGES.length);
            setCurrentMessage(MESSAGES[randomIndex].text);
            setIsVisible(true);

            // Hide after 8 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 8000);
        };

        // Initial delay before first message (or show quickly for testing)
        const initialTimer = setTimeout(showMessage, 30000); // 30 seconds after entering a page

        // Set interval for 15 minutes (900000 ms)
        const interval = setInterval(showMessage, 900000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [isNotHome, location.pathname]);

    if (!isVisible || !isNotHome) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-right-full duration-500">
            <div className="bg-card-light dark:bg-surface-dark border-l-4 border-primary p-4 rounded-xl shadow-2xl max-w-sm flex items-start gap-4 ring-1 ring-black/5">
                <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {currentMessage}
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        </div>
    );
};

export default HealthReminders;
