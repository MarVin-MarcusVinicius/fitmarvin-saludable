import React, { useState, useMemo } from 'react';
import { IMAGES } from '../constants';
import { useMusic } from '../context/MusicContext';
import { useLanguage, Language } from '../context/LanguageContext';

// --- DATA TYPES ---
interface ExerciseDetail {
    title: string;
    muscle: string;
    description: string;
    instructions: string[];
    sets: string;
}

type CategoryType = 'All' | 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Abs' | 'Cardio' | 'Routines';
type FitnessPurpose = 'strength' | 'endurance' | 'fat-loss' | 'muscle-gain';

interface Exercise {
    id: string;
    videoId: string;
    img: string;
    category: CategoryType;
    details: Record<Language, ExerciseDetail>;
    gender: 'male' | 'female' | 'both';
    location: 'home' | 'gym' | 'both';
    purpose: FitnessPurpose[];
}

// --- DATA SOURCE (Detailed Instructions & Specific Sets) ---
const EXERCISE_DB: Exercise[] = [
    // --- CHEST (PECHO) ---
    {
        id: 'chest-1', videoId: '7aQY3u0Dk-Q', img: IMAGES.EXERCISE_PRESS, category: 'Chest', // Powerexplosive (Press Banca)
        details: {
            ES: {
                title: 'Press de Banca: Guía Maestra', muscle: 'Pectoral, Tríceps',
                description: 'La guía técnica más completa para ganar fuerza y evitar lesiones.',
                instructions: [
                    'Ojos bajo la barra. Retracción escapular (hombros al banco).',
                    'Arco lumbar natural. Pies firmes en el suelo.',
                    'Baja la barra al esternón controlando el peso.',
                    'Empuja explosivamente hacia arriba.'
                ],
                sets: '4 series: 5-8 reps (Pesado)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['strength', 'muscle-gain']
    },
    {
        id: 'chest-2', videoId: 'PPPDs2Qhkmo', img: IMAGES.EXERCISE_PRESS, category: 'Chest', // Sergio Peinado (Aprobado)
        details: {
            ES: {
                title: 'Press Superior / Rutina', muscle: 'Pectoral Superior',
                description: 'Enfoque en la parte alta del pecho con mancuernas.',
                instructions: [
                    'Banco inclinado a 30 grados.',
                    'Controla la bajada sintiendo el estiramiento.',
                    'Concéntrate en la conexión mente-músculo.',
                    'Mantén el pecho alto durante todo el movimiento.'
                ],
                sets: '3 series de 10-12 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain']
    },
    {
        id: 'chest-3', videoId: '2z8JmcrW-As', img: IMAGES.EXERCISE_PRESS, category: 'Chest', // Fondos (Safe)
        details: {
            ES: {
                title: 'Fondos Básicos', muscle: 'Pectoral Inferior',
                description: 'Ejercicio clásico de calistenia para fuerza de empuje.',
                instructions: [
                    'Cuerpo inclinado hacia adelante.',
                    'Baja hasta 90 grados en los codos.',
                    'Sube exhalando el aire.',
                    'Evita bloquear codos bruscamente.'
                ],
                sets: '3 series al Fallo'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['strength', 'muscle-gain', 'endurance']
    },
    {
        id: 'chest-4', videoId: 'Iwe6AmxVf7o', img: IMAGES.EXERCISE_PRESS, category: 'Chest',
        details: {
            ES: {
                title: 'Cruces de Polea', muscle: 'Definición',
                description: 'Aislamiento constante para detallar el pecho.',
                instructions: [
                    'Posición estable, un pie adelante.',
                    'Brazos semi-flexionados.',
                    'Junta las manos al centro apretando el pecho.',
                    'Regresa despacio controlando el peso.'
                ],
                sets: '3 series de 15 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'fat-loss']
    },
    {
        id: 'chest-5', videoId: 'VmB1G1K7v94', img: IMAGES.EXERCISE_PRESS, category: 'Chest',
        details: {
            ES: {
                title: 'Aperturas', muscle: 'Pectoral',
                description: 'Estiramiento controlado para expansión torácica.',
                instructions: [
                    'Tumbado boca arriba en banco plano.',
                    'Abre los brazos lentamente sintiendo el estiramiento.',
                    'No bajes más allá de la línea del cuerpo.',
                    'Vuelve a la posición inicial.'
                ],
                sets: '3 series de 12-15 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain']
    },

    // --- BACK (ESPALDA) ---
    {
        id: 'back-1', videoId: 'JMFjtHhwqSg', img: IMAGES.EXERCISE_ROW, category: 'Back', // Iron Masters Remo Mancuerna (Verified)
        details: {
            ES: {
                title: 'Remo Unilateral: Guía', muscle: 'Dorsal, Espalda Alta',
                description: 'La técnica definitiva para activar el dorsal y evitar errores.',
                instructions: [
                    'Apoyo de 3 puntos (mano, rodilla, pie).',
                    'Espalda neutra, sin rotar el tronco excesivamente.',
                    'Lleva la mancuerna hacia la cadera (como guardándola en el bolsillo).',
                    'Controla el descenso estirando el dorsal.'
                ],
                sets: '4 series de 10-12 reps por brazo'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    },
    {
        id: 'back-2', videoId: 'BYXCXeO64go', img: IMAGES.EXERCISE_ROW, category: 'Back', // Powerexplosive Dominadas (Verified)
        details: {
            ES: {
                title: 'Dominadas Explosivas', muscle: 'Espalda Completa',
                description: 'Técnica avanzada para romper tus límites en dominadas.',
                instructions: [
                    'Agarre prono, ancho biacromial + 1 palmo.',
                    'Retracción escapular explosiva al inicio.',
                    'Sube con potencia intentando tocar el pecho.',
                    'Negativa controlada (bajada lenta).'
                ],
                sets: '4 series al Fallo'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['strength', 'muscle-gain', 'endurance']
    },
    {
        id: 'back-3', videoId: 'y0gQvWwJ1mI', img: IMAGES.EXERCISE_ROW, category: 'Back', // Jalón al Pecho
        details: {
            ES: {
                title: 'Jalón al Pecho', muscle: 'Dorsales',
                description: 'Técnica estricta para ampliar la espalda.',
                instructions: [
                    'Agarre un poco más ancho que los hombros.',
                    'Saca el pecho antes de jalar.',
                    'Lleva la barra a la clavícula (no más abajo).',
                    'Controla el retorno para estirar el dorsal.'
                ],
                sets: '3 series de 12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'back-4', videoId: 'e_WLgzvjzxc', img: IMAGES.EXERCISE_ROW, category: 'Back', // Iron Masters Remo (Verified)
        details: {
            ES: {
                title: 'Remo con Barra', muscle: 'Grosor',
                description: 'La guía definitiva de Iron Masters para un remo perfecto.',
                instructions: [
                    'Saca el pecho y mantén la espalda neutra.',
                    'Inclínate a 45 grados o paralelo (según flexibilidad).',
                    'Lleva la barra a la cadera (no al pecho alto).',
                    'Control total en la bajada.'
                ],
                sets: '4 series de 8-10 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['strength', 'muscle-gain']
    },
    {
        id: 'back-5', videoId: 'zX3Qy8F_Q1s', img: IMAGES.EXERCISE_ROW, category: 'Back',
        details: {
            ES: {
                title: 'Remo en Polea', muscle: 'Espalda Media',
                description: 'Aislamiento seguro sentado.',
                instructions: [
                    'Pecho alto, hombros atrás.',
                    'Jala hacia el abdomen.',
                    'Junta los omóplatos fuertemente.',
                    'Evita balancearte.'
                ],
                sets: '3 series de 12-15 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },

    // --- LEGS (PIERNAS) ---
    {
        id: 'legs-1', videoId: 'l4Y7Q6J0f8w', img: IMAGES.EXERCISE_SQUAT, category: 'Legs', // Sentadilla
        details: {
            ES: {
                title: 'Sentadilla Educativa', muscle: 'Cuádriceps, Glúteos',
                description: 'Aprende el patrón de movimiento correcto.',
                instructions: [
                    'Pies ancho de caderas, puntas levemente fuera.',
                    'Inicia el movimiento desde la cadera (sentarse).',
                    'Rodillas siguen la línea de los pies.',
                    'Espalda recta en todo momento.'
                ],
                sets: '4 series de 6-8 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['strength', 'muscle-gain']
    },
    {
        id: 'legs-2', videoId: '7_Wm0YGQinw', img: IMAGES.WORKOUT_BG, category: 'Legs', // Powerexplosive Peso Muerto (Verified)
        details: {
            ES: {
                title: 'Peso Muerto: Guía', muscle: 'Cadena Posterior',
                description: 'El rey de los ejercicios compuestos. Potencia total.',
                instructions: [
                    'Barra pegada a las tibias.',
                    'Cadera a la altura correcta (ni muy baja ni muy alta).',
                    'Tensión en el dorsal antes de jalar.',
                    'Empuja el suelo, no tires con la espalda.'
                ],
                sets: '3 series de 5 reps (Pesado)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['strength', 'muscle-gain']
    },
    {
        id: 'legs-3', videoId: 'c2h5pE6C9rY', img: IMAGES.EXERCISE_SQUAT, category: 'Legs', // Buff Academy Legs (Seemed OK)
        details: {
            ES: {
                title: 'Rutina de Pierna', muscle: 'Piernas Completas',
                description: 'Circuito intenso para pierna y glúteo.',
                instructions: [
                    'Zancadas alternas.',
                    'Sentadillas con salto.',
                    'Puente de glúteo.',
                    'Mantener intensidad alta.'
                ],
                sets: '3 rondas'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['fat-loss', 'endurance']
    },
    {
        id: 'legs-4', videoId: 'pT_H1a-n48s', img: IMAGES.EXERCISE_SQUAT, category: 'Legs', // Buff Academy Brutal Legs
        details: {
            ES: {
                title: 'Piernas Brutales', muscle: 'Cuádriceps',
                description: 'Entrenamiento de alta intensidad desde casa o gym.',
                instructions: [
                    'Enfoque en el tiempo bajo tensión.',
                    'Controlar la bajada en cada repetición.',
                    'No bloquear rodillas completamente.',
                    'Respirar rítmicamente.'
                ],
                sets: '4 series de 12-15 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain']
    },
    {
        id: 'legs-5', videoId: '-M4-G8p8fmc', img: IMAGES.EXERCISE_SQUAT, category: 'Legs',
        details: {
            ES: {
                title: 'Sillón de Cuádriceps', muscle: 'Cuádriceps (Aislamiento)',
                description: 'Detalla el vasto interno y recto femoral.',
                instructions: [
                    'Ajusta el respaldo para que tu rodilla coincida con el eje de la máquina.',
                    'Extiende las piernas completamente y aguanta 1 segundo arriba.',
                    'Baja lento resistiendo el peso.',
                    'No des "patadas", usa fuerza controlada.'
                ],
                sets: '3 series de 15-20 reps (Ardor)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },

    // --- SHOULDERS (HOMBROS) ---
    {
        id: 'shoulders-1', videoId: 'P9o0Q1r2S3t', img: IMAGES.EXERCISE_PRESS, category: 'Shoulders',
        details: {
            ES: {
                title: 'Press Militar Barra', muscle: 'Deltoides Anterior',
                description: 'Fuerza base para hombros grandes y redondos.',
                instructions: [
                    'De pie, glúteos y abdomen apretados (bloqueo).',
                    'Barra descansa en el pecho superior. Agarre cerrado.',
                    'Empuja vertical. Mete la cabeza ligeramente hacia adelante al pasar la barra.',
                    'Controla la bajada hasta el pecho.'
                ],
                sets: '4 series de 6-8 reps (Fuerza)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['strength', 'muscle-gain']
    },
    {
        id: 'shoulders-2', videoId: '3VcKaXpzqRo', img: IMAGES.EXERCISE_PRESS, category: 'Shoulders',
        details: {
            ES: {
                title: 'Elevaciones Laterales', muscle: 'Deltoides Lateral',
                description: 'El ÚNICO ejercicio que te dará anchura visual.',
                instructions: [
                    'Inicia con mancuernas a los lados, no al frente.',
                    'Eleva imaginando que lanzas las mancuernas lejos, no hacia arriba.',
                    'Codos lideran el movimiento, muñecas por debajo de codos.',
                    'Baja resistiendo la gravedad.'
                ],
                sets: '4 series de 15-20 reps (Drop set al final)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'shoulders-3', videoId: 'rep-qVOkqgk', img: IMAGES.EXERCISE_PRESS, category: 'Shoulders',
        details: {
            ES: {
                title: 'Face Pulls', muscle: 'Deltoides Posterior',
                description: 'Salud articular y postura. Contrarresta el trabajo de pecho.',
                instructions: [
                    'Polea a la altura de la cara. Agarre neutro o prono.',
                    'Jala la cuerda hacia tus ojos, separando las manos.',
                    'Al final, haz una rotación externa (puños atrás, codos abajo).',
                    'Aguanta 2 segundos la contracción.'
                ],
                sets: '3 series de 15-20 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'shoulders-4', videoId: 'z-3C7n77j7k', img: IMAGES.EXERCISE_PRESS, category: 'Shoulders',
        details: {
            ES: {
                title: 'Press Arnold', muscle: 'Hombro Completo',
                description: 'Trabaja las 3 cabezas del deltoides con gran rango de movimiento.',
                instructions: [
                    'Inicia con mancuernas frente a la cara, palmas hacia ti.',
                    'Al subir, abre los codos y rota las muñecas 180 grados.',
                    'Termina con palmas al frente y brazos estirados.',
                    'Invierte el giro al bajar.'
                ],
                sets: '3 series de 10-12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    },

    // --- ARMS (BRAZOS) ---
    {
        id: 'arms-1', videoId: 'in7PaeYlhrM', img: IMAGES.EXERCISE_ROW, category: 'Arms',
        details: {
            ES: {
                title: 'Curl con Barra', muscle: 'Bíceps (Masa)',
                description: 'El básico para masa en bíceps. Carga peso controlado.',
                instructions: [
                    'Agarre supino (palmas arriba) ancho de hombros.',
                    'Pega los codos a las costillas y no los muevas.',
                    'Sube la barra contrayendo bíceps, sin balancear la espalda.',
                    'Baja lento (3 seg) hasta estirar el brazo.'
                ],
                sets: '3 series de 8-12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    },
    {
        id: 'arms-2', videoId: 'nRiJVZDpdL0', img: IMAGES.EXERCISE_PRESS, category: 'Arms',
        details: {
            ES: {
                title: 'Tríceps en Polea', muscle: 'Tríceps (Lateral)',
                description: 'Da la forma de "herradura" al brazo.',
                instructions: [
                    'Usa cuerda. Inclina el torso levemente.',
                    'Mantén codos fijos a los costados.',
                    'Extiende hacia abajo y SEPARA la cuerda al final.',
                    'No subas las manos más allá del pecho.'
                ],
                sets: '3 series de 12-15 reps (Burn)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'arms-3', videoId: 'zC3nLlEvin4', img: IMAGES.EXERCISE_ROW, category: 'Arms',
        details: {
            ES: {
                title: 'Curl Martillo', muscle: 'Braquial/Antebrazo',
                description: 'Da grosor al brazo visto de frente.',
                instructions: [
                    'Mancuernas con agarre neutro (palmas se miran).',
                    'Sube la mancuerna cruzada hacia el pectoral opuesto o recta.',
                    'Aprieta fuerte el antebrazo arriba.',
                    'Evita el balanceo.'
                ],
                sets: '3 series de 10-12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'arms-4', videoId: 'd_KZxkY_0cM', img: IMAGES.EXERCISE_PRESS, category: 'Arms',
        details: {
            ES: {
                title: 'Rompecráneos', muscle: 'Tríceps (Cabeza Larga)',
                description: 'Estiramiento extremo para crecimiento masivo del tríceps.',
                instructions: [
                    'Usa barra Z para comodidad de muñecas.',
                    'Baja la barra DETRÁS de la cabeza, no a la frente (mayor estiramiento).',
                    'Mantén los codos apuntando al techo.',
                    'Extiende solo el antebrazo.'
                ],
                sets: '3 series de 10-12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'arms-5', videoId: 'kwG2ipFRgfo', img: IMAGES.EXERCISE_ROW, category: 'Arms',
        details: {
            ES: {
                title: 'Curl Predicador', muscle: 'Bíceps (Pico)',
                description: 'Aislamiento total. Imposible hacer trampa.',
                instructions: [
                    'Ajusta el asiento para que la axila repose sobre el borde.',
                    'Baja la barra hasta estirar casi completo el brazo.',
                    'Sube sin despegar los codos del cojín.',
                    'Aprieta el bíceps 1 segundo arriba.'
                ],
                sets: '3 series de 12-15 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'arms-6', videoId: '7SVGCl5GFfY', img: IMAGES.EXERCISE_ROW, category: 'Arms',
        details: {
            ES: {
                title: 'Rutina Brazos Masivos', muscle: 'Bíceps y Tríceps',
                description: 'Super-series para congestión extrema.',
                instructions: [
                    'Mira el video y prepara mancuernas y barra.',
                    'Realiza los ejercicios en pares (Bíceps + Tríceps) sin descanso.',
                    'Controla la fase negativa (bajada) en cada repetición.',
                    'Bebe agua entre super-series.'
                ],
                sets: '4 Super-series de 12 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'endurance']
    },

    // --- ABS & CARDIO ---
    {
        id: 'abs-1', videoId: 'wkD8rjkodUI', img: IMAGES.WORKOUT_BG, category: 'Abs',
        details: {
            ES: {
                title: 'Plancha Abdominal', muscle: 'Core (Isométrico)',
                description: 'Construye una faja abdominal de acero y protege la espalda.',
                instructions: [
                    'Apoya antebrazos. Codos bajo hombros.',
                    'Cuerpo en línea recta (no subas ni bajes la cadera).',
                    'Aprieta glúteos y abdomen fuertemente como si te fueran a golpear.',
                    'Respira corto pero fluido.'
                ],
                sets: '3 series al fallo (Meta: 60s)'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain', 'endurance']
    },
    {
        id: 'abs-2', videoId: 'Xyd_fa5zoEU', img: IMAGES.WORKOUT_BG, category: 'Abs',
        details: {
            ES: {
                title: 'Crunch Abdominal', muscle: 'Recto Abdominal',
                description: 'Enfoca los "cuadritos" superiores.',
                instructions: [
                    'Manos tras la nuca (sin tirar del cuello).',
                    'Imagina que quieres llevar las costillas hacia la cadera.',
                    'Despega solo los hombros del suelo, lumbar pegada.',
                    'Expulsa todo el aire al subir (contracción máxima).'
                ],
                sets: '3 series de 20-25 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain']
    },
    {
        id: 'abs-3', videoId: 'kL6pL4K9B4Y', img: IMAGES.WORKOUT_BG, category: 'Abs', // Scott Herman Hanging Leg Raise (Verified)
        details: {
            ES: {
                title: 'Elevación de Piernas', muscle: 'Abdominal Inferior',
                description: 'Ataca la zona baja del abdomen (la más difícil).',
                instructions: [
                    'Colgado en barra, evita el balanceo inicial.',
                    'Sube las piernas hasta la altura de la cadera (o más).',
                    'Controla la bajada para no usar inercia.',
                    'Si es difícil, inicia con rodillas al pecho.'
                ],
                sets: '3 series de 10-15 reps'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['muscle-gain', 'strength']
    },
    {
        id: 'cardio-1', videoId: 'M0uO8X3_tEA', img: IMAGES.EXERCISE_SQUAT, category: 'Cardio',
        details: {
            ES: {
                title: 'Burpees', muscle: 'Metabólico Total',
                description: 'El quemagrasas #1. Resistencia y potencia.',
                instructions: [
                    'Desde pie, baja a posición de flexión.',
                    'Haz la flexión (pecho al suelo).',
                    'Recoge las piernas de un salto explosivo.',
                    'Salta verticalmente aplaudiendo sobre la cabeza.'
                ],
                sets: '4 rondas de 45 seg activos / 15 descanso'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['fat-loss', 'endurance']
    },
    {
        id: 'cardio-2', videoId: 'UpH7rm0cYbM', img: IMAGES.EXERCISE_SQUAT, category: 'Cardio',
        details: {
            ES: {
                title: 'Jumping Jacks', muscle: 'Calentamiento',
                description: 'Eleva pulsaciones y calienta articulaciones.',
                instructions: [
                    'Inicia pies juntos, manos abajo.',
                    'Salta abriendo piernas y subiendo brazos a la vez.',
                    'Aterriza suave sobre las puntas de los pies.',
                    'Mantén un ritmo constante y fluido.'
                ],
                sets: '3 min (Calentamiento)'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['fat-loss', 'endurance']
    },
    {
        id: 'cardio-3', videoId: 'zcHNk7VYV-g', img: IMAGES.WORKOUT_BG, category: 'Cardio',
        details: {
            ES: {
                title: 'HIIT 10 Minutos', muscle: 'Quema Grasa',
                description: 'Intervalos de Alta Intensidad. Quema calorías post-entreno.',
                instructions: [
                    'Necesitas cronómetro o seguir el video.',
                    'Durante el trabajo (ej: 30s) ve al 100% de intensidad.',
                    'Durante el descanso (ej: 30s) recupera el aire caminando.',
                    'No te detengas por completo.'
                ],
                sets: '10 Minutos (30s ON / 30s OFF)'
            },
        },
        gender: 'both',
        location: 'both',
        purpose: ['fat-loss', 'endurance']
    },

    // --- FULL ROUTINES (RUTINAS) ---
    {
        id: 'routine-lose-1', videoId: 'FrHVu_Xue9k', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Rutina Perfecta Pérdida Peso', muscle: 'Cuerpo Completo',
                description: 'Clase guiada paso a paso para maximizar gasto calórico.',
                instructions: [
                    'Prepara: Botella de agua, toalla y espacio de 2x2 metros.',
                    'Sigue al instructor. Si un ejercicio es muy difícil, haz la versión modificada.',
                    'Mantén el movimiento constante, evita pausas largas.',
                    'Enfócate en terminar, no en la perfección.'
                ],
                sets: 'Video Completo (Sin pausas extra)'
            },
        },
        gender: 'both',
        location: 'home',
        purpose: ['fat-loss', 'endurance']
    },
    {
        id: 'routine-lose-2', videoId: 'QnpuWZk6mQ0', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Quema Grasa con Máquinas', muscle: 'Circuito Gym',
                description: 'Aprovecha el gimnasio para quemar grasa sin impacto.',
                instructions: [
                    'Elige 4-5 máquinas (ej: Prensa, Remo, Chest Press, Jalón).',
                    'Realiza 15 repeticiones en una, pasa a la siguiente sin descanso.',
                    'Al terminar la ronda completa, descansa 2 minutos.',
                    'Repite el circuito.'
                ],
                sets: '4 Circuitos de 15 reps'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['fat-loss', 'endurance']
    },
    {
        id: 'routine-lose-3', videoId: 'VDYd5ylBhnM', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Plan 5 Días Definición', muscle: 'Plan Semanal',
                description: 'Estructura semanal para perder grasa manteniendo músculo.',
                instructions: [
                    'Lunes: Pecho + Espalda (Super-series).',
                    'Martes: Pierna (Enfoque metabólico).',
                    'Miércoles: Cardio LISS 45 min + Abdominales.',
                    'Jueves: Hombros + Brazos.',
                    'Viernes: Full Body Circuito.'
                ],
                sets: '5 Días / Semana'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['fat-loss', 'muscle-gain']
    },
    {
        id: 'routine-lose-4', videoId: 'CHMdoR9B3SQ', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Pérdida de Peso (Hombres)', muscle: 'Fuerza Metabólica',
                description: 'Rutina híbrida: Pesas pesadas + descansos cortos.',
                instructions: [
                    'Usa pesos que te cuesten (RPE 8).',
                    'Descansa solo 45-60 segundos entre series.',
                    'Incluye ejercicios compuestos (Sentadilla, Peso Muerto, Press).',
                    'Termina con 15 min de cardio HIIT.'
                ],
                sets: 'Rutina Completa'
            },
        },
        gender: 'male',
        location: 'gym',
        purpose: ['fat-loss', 'strength']
    },
    {
        id: 'routine-lose-5', videoId: 'rsj6iH-7h08', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Pérdida de Peso (Mujeres)', muscle: 'Tonificación',
                description: 'Enfoque en tren inferior y cintura estrecha.',
                instructions: [
                    'Prioriza ejercicios de glúteo y pierna.',
                    'Mantén repeticiones altas (15-20) para tono muscular.',
                    'Realiza "Vacío Abdominal" al final para cintura.',
                    'Sé constante con el cardio post-pesas.'
                ],
                sets: 'Rutina Completa'
            },
        },
        gender: 'female',
        location: 'gym',
        purpose: ['fat-loss']
    },
    {
        id: 'routine-gain-1', videoId: 'IFMZ98a5yhQ', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Hipertrofia 5 Días', muscle: 'Volumen',
                description: 'Plan avanzado para máxima ganancia muscular.',
                instructions: [
                    'Come en superávit calórico (+300-500 kcal).',
                    'Cada grupo muscular se entrena cada 4-5 días.',
                    'Enfócate en la sobrecarga progresiva (subir peso/reps cada semana).',
                    'Duerme al menos 7-8 horas para crecer.'
                ],
                sets: 'Plan 5 Días'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain']
    },
    {
        id: 'routine-gain-2', videoId: 's15efS6-iRU', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Fullbody Alta Frecuencia', muscle: 'Cuerpo Completo',
                description: 'Entrena todo el cuerpo 3 veces por semana. Ideal naturales.',
                instructions: [
                    'Lunes, Miércoles y Viernes.',
                    'Elige 1 ejercicio por grupo muscular (1 Pecho, 1 Espalda, 1 Pierna...).',
                    'Haz 3-4 series intensas por ejercicio.',
                    'Descansa días alternos para recuperación.'
                ],
                sets: '3 Días / Semana'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    },
    {
        id: 'routine-gain-3', videoId: 'V2Jw3kc9ofI', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Masa para Principiantes', muscle: 'Fundamentos',
                description: 'Rutina A/B sencilla para empezar a ganar fuerza y tamaño.',
                instructions: [
                    'Sesión A: Sentadilla, Press Banca, Remo.',
                    'Sesión B: Peso Muerto, Press Militar, Dominadas.',
                    'Alterna A y B dejando un día de descanso.',
                    'Aprende la técnica perfecta antes de subir peso.'
                ],
                sets: '3 Series de 5 Reps (5x5)'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    },
    {
        id: 'routine-gain-4', videoId: '44FltTwyIj0', img: IMAGES.WORKOUT_BG, category: 'Routines',
        details: {
            ES: {
                title: 'Split Clásico 3 Días', muscle: 'Equilibrio',
                description: 'Divide el cuerpo en partes para mayor intensidad por músculo.',
                instructions: [
                    'Día 1: Empuje (Pecho, Hombro, Tríceps).',
                    'Día 2: Tirón (Espalda, Bíceps, Trapecio).',
                    'Día 3: Piernas completo.',
                    'Ideal para quienes tienen tiempo limitado.'
                ],
                sets: '3-4 Días / Semana'
            },
        },
        gender: 'both',
        location: 'gym',
        purpose: ['muscle-gain', 'strength']
    }
];

const ExerciseLibrary = () => {
    const { language, t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
    const [activeGender, setActiveGender] = useState<'all' | 'male' | 'female'>('all');
    const [activeLocation, setActiveLocation] = useState<'all' | 'home' | 'gym'>('all');
    const [activePurpose, setActivePurpose] = useState<'all' | FitnessPurpose>('all');
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
    const { toggleOpen } = useMusic();

    // Filter Logic
    const filteredExercises = useMemo(() => {
        return EXERCISE_DB.filter(ex => {
            const details = ex.details[language];
            const matchesSearch =
                details.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                details.muscle.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;

            // Gender Filter: Show if exercise is for 'both' or matches specific gender
            const matchesGender = activeGender === 'all' || ex.gender === 'both' || ex.gender === activeGender;

            // Location Filter
            let matchesLocation = true;
            if (activeLocation === 'home') {
                matchesLocation = ex.location === 'home' || ex.location === 'both';
            } else if (activeLocation === 'gym') {
                matchesLocation = true;
            }

            // Purpose Filter
            const matchesPurpose = activePurpose === 'all' || ex.purpose.includes(activePurpose);

            return matchesSearch && matchesCategory && matchesGender && matchesLocation && matchesPurpose;
        });
    }, [searchTerm, activeCategory, activeGender, activeLocation, activePurpose, language]);

    // Categories List for UI
    const categories: { id: CategoryType, label: Record<Language, string> }[] = [
        { id: 'All', label: { ES: 'Todos' } },
        { id: 'Routines', label: { ES: 'Rutinas Completas' } },
        { id: 'Chest', label: { ES: 'Pecho' } },
        { id: 'Back', label: { ES: 'Espalda' } },
        { id: 'Legs', label: { ES: 'Piernas' } },
        { id: 'Shoulders', label: { ES: 'Hombros' } },
        { id: 'Arms', label: { ES: 'Brazos' } },
        { id: 'Abs', label: { ES: 'Abdominales' } },
        { id: 'Cardio', label: { ES: 'Cardio' } },
    ];

    return (
        <div className="flex h-full flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
            <div className="flex-grow overflow-y-auto custom-scrollbar p-8">

                {/* Hero Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider animate-pulse">
                            {language === 'ES' ? 'Nuevo 2025' : 'New 2025'}
                        </span>
                        <span className="text-primary text-xs font-bold uppercase tracking-wider">
                            4K / HD
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 dark:text-white">
                        {language === 'ES' ? 'Biblioteca Técnica' : 'Technical Library'}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        {language === 'ES'
                            ? 'Tutoriales actualizados con biomecánica de vanguardia. Visualiza y aprende.'
                            : 'Updated tutorials with cutting-edge biomechanics. Visualize and learn.'}
                    </p>
                </header>

                {/* Spotify Floating Button (Mobile/Desktop) */}
                <div className="fixed bottom-6 right-6 z-40 md:absolute md:top-8 md:right-8 md:bottom-auto">
                    <button
                        onClick={toggleOpen}
                        className="bg-[#1DB954] hover:bg-[#1ed760] text-white p-4 rounded-full shadow-lg shadow-green-500/20 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        title="Abrir Spotify"
                    >
                        <span className="material-symbols-outlined text-2xl">music_note</span>
                        <span className="font-bold hidden md:inline">Music</span>
                    </button>
                </div>

                {/* Filters Section */}
                <div className="mb-8 flex flex-col gap-4 bg-card-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">

                    {/* Row 1: Gender & Location */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Gender Toggle */}
                        <div className="flex bg-slate-100 dark:bg-black/20 p-1 rounded-xl gap-1">
                            <button
                                onClick={() => setActiveGender('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all btn-green-hover ${activeGender === 'all' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                {language === 'ES' ? 'Todos' : 'All'}
                            </button>
                            <button
                                onClick={() => setActiveGender('male')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 btn-green-hover ${activeGender === 'male' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                <span className="material-symbols-outlined text-sm">male</span>
                                {language === 'ES' ? 'Hombres' : 'Men'}
                            </button>
                            <button
                                onClick={() => setActiveGender('female')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 btn-green-hover ${activeGender === 'female' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                <span className="material-symbols-outlined text-sm">female</span>
                                {language === 'ES' ? 'Mujeres' : 'Women'}
                            </button>
                        </div>

                        {/* Location Toggle */}
                        <div className="flex bg-slate-100 dark:bg-black/20 p-1 rounded-xl gap-1">
                            <button
                                onClick={() => setActiveLocation('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all btn-green-hover ${activeLocation === 'all' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                {language === 'ES' ? 'Cualquiera' : 'Anywhere'}
                            </button>
                            <button
                                onClick={() => setActiveLocation('home')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 btn-green-hover ${activeLocation === 'home' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                <span className="material-symbols-outlined text-sm">home</span>
                                {language === 'ES' ? 'Casa' : 'Home'}
                            </button>
                            <button
                                onClick={() => setActiveLocation('gym')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 btn-green-hover ${activeLocation === 'gym' ? 'bg-primary text-black shadow-lg shadow-primary/40' : 'bg-card-light dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/10'}`}
                            >
                                <span className="material-symbols-outlined text-sm">fitness_center</span>
                                {language === 'ES' ? 'Gimnasio' : 'Gym'}
                            </button>
                        </div>
                    </div>

                    {/* Row 2: Purpose Filter */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActivePurpose('all')}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${activePurpose === 'all' ? 'bg-primary text-black shadow' : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-black/40'}`}
                        >
                            {language === 'ES' ? 'Todos' : 'All'}
                        </button>
                        <button
                            onClick={() => setActivePurpose('strength')}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${activePurpose === 'strength' ? 'bg-red-500 text-white shadow shadow-red-500/30' : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-black/40'}`}
                        >
                            <span className="material-symbols-outlined text-sm">flash_on</span>
                            {language === 'ES' ? 'Fuerza' : 'Strength'}
                        </button>
                        <button
                            onClick={() => setActivePurpose('muscle-gain')}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${activePurpose === 'muscle-gain' ? 'bg-blue-500 text-white shadow shadow-blue-500/30' : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-black/40'}`}
                        >
                            <span className="material-symbols-outlined text-sm">favorite</span>
                            {language === 'ES' ? 'Ganancia Muscular' : 'Muscle Gain'}
                        </button>
                        <button
                            onClick={() => setActivePurpose('fat-loss')}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${activePurpose === 'fat-loss' ? 'bg-orange-500 text-white shadow shadow-orange-500/30' : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-black/40'}`}
                        >
                            <span className="material-symbols-outlined text-sm">local_fire_department</span>
                            {language === 'ES' ? 'Pérdida de Grasa' : 'Fat Loss'}
                        </button>
                        <button
                            onClick={() => setActivePurpose('endurance')}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${activePurpose === 'endurance' ? 'bg-emerald-500 text-white shadow shadow-emerald-500/30' : 'bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-black/40'}`}
                        >
                            <span className="material-symbols-outlined text-sm">timer</span>
                            {language === 'ES' ? 'Resistencia' : 'Endurance'}
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {filteredExercises.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-4 text-slate-400">sentiment_dissatisfied</span>
                        <p className="text-xl text-slate-500">
                            {language === 'ES' ? 'No se encontraron ejercicios.' : 'No exercises found.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                        {filteredExercises.map((ex) => {
                            const details = ex.details[language];
                            return (
                                <div
                                    key={ex.id}
                                    className="group bg-card-light dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-in fade-in zoom-in-95 flex flex-col"
                                    onClick={() => setActiveExercise(ex)}
                                >
                                    <div className="relative aspect-video overflow-hidden flex-shrink-0 bg-slate-900 group-hover:bg-slate-800 transition-colors">
                                        {/* Exercise Image Background */}
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-90" style={{ backgroundImage: `url('${ex.img}')` }}></div>

                                        {/* Gradient Overlay for Legibility */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Floating Logo Watermark */}
                                        <div className="absolute bottom-2 right-2 z-10 opacity-90">
                                            <img
                                                src={IMAGES.LOGO}
                                                alt="FitMarvin"
                                                className="h-8 w-auto object-contain drop-shadow-md"
                                            />
                                        </div>

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                                            </div>
                                        </div>

                                        {/* Category Tag */}
                                        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-black px-2 py-1 rounded-md z-20 shadow-sm">
                                            <p className="text-[10px] font-black uppercase tracking-widest">{ex.category}</p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">{details.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">accessibility_new</span>
                                                {details.muscle}
                                            </p>
                                            <div className="w-full h-1 bg-slate-100 dark:bg-border-dark rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveExercise(ex);
                                            }}
                                            className="w-full mt-4 py-3 bg-slate-50 dark:bg-white/5 hover:bg-primary hover:text-black text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                                        >
                                            <span className="material-symbols-outlined">play_circle</span>
                                            {language === 'ES' ? 'Ver Tutorial' : 'Watch Tutorial'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Immersive Video Player Modal */}
            {activeExercise && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-200"
                    onClick={() => setActiveExercise(null)}
                >
                    <div
                        className="w-full max-w-6xl flex flex-col lg:flex-row bg-surface-dark rounded-none md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-full md:h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Video Section */}
                        <div className="flex-grow lg:w-2/3 bg-black relative flex items-center justify-center group">
                            <iframe
                                key={activeExercise.videoId}
                                className="w-full h-full aspect-video"
                                src={`https://www.youtube-nocookie.com/embed/${activeExercise.videoId}?rel=0&modestbranding=1`}
                                title={activeExercise.details[language].title}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Info Section */}
                        <div className="lg:w-1/3 bg-card-light dark:bg-surface-dark p-8 flex flex-col overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-red-500">smart_display</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">YouTube Player</span>
                                </div>
                                <button
                                    onClick={() => setActiveExercise(null)}
                                    className="bg-slate-100 dark:bg-border-dark hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors text-slate-900 dark:text-white"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                                {activeExercise.details[language].title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg uppercase tracking-wide border border-primary/20">
                                    {activeExercise.details[language].muscle}
                                </span>
                                <a
                                    href={`https://www.youtube.com/watch?v=${activeExercise.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded-lg uppercase tracking-wide flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_new</span> YouTube
                                </a>
                            </div>

                            <div className="space-y-6 flex-grow">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">info</span>
                                        {language === 'ES' ? 'Descripción' : 'Description'}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        {activeExercise.details[language].description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">format_list_numbered</span>
                                        {language === 'ES' ? 'Cómo hacerlo' : 'How to do it'}
                                    </h4>
                                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600 dark:text-slate-300 text-sm">
                                        {activeExercise.details[language].instructions.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-xs uppercase tracking-wider">
                                        {language === 'ES' ? 'Series Recomendadas' : 'Recommended Sets'}
                                    </h4>
                                    <p className="text-primary font-bold">
                                        {activeExercise.details[language].sets}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3 shrink-0">
                                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">add_circle</span>
                                    {language === 'ES' ? 'Añadir a rutina' : 'Add to workout'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ExerciseLibrary;