import React, { useState, useEffect, useRef } from 'react';
import { useMusic } from '../context/MusicContext';

const WalkingSimulation = () => {
    const [duration, setDuration] = useState(0);
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [showHydration, setShowHydration] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { toggleOpen } = useMusic();

    // Using a known working 4K Beach Walk video
    // "Run Miami Beach" or similar generic high quality walking/running video
    const VIDEO_ID = "lWaJ8wQKIUQ";
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPlaying) {
            timer = setInterval(() => {
                setDuration(prev => {
                    const newDuration = prev + 1;

                    // Show hydration reminder every 5 minutes (300 seconds)
                    if (newDuration % 300 === 0 && newDuration > 0) {
                        setShowHydration(true);
                        setTimeout(() => setShowHydration(false), 5000);
                    }
                    return newDuration;
                });

                // Update stats
                setSteps(prev => prev + 2); // Approx 2 steps per second
                setCalories(prev => prev + 0.15); // Approx burn rate
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isPlaying]);

    // Send commands to YouTube iframe
    const sendVideoCommand = (command: string, args: any = null) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: command,
                    args: args || []
                }),
                '*'
            );
        }
    };

    const handleStart = () => {
        setIsPlaying(true);
        sendVideoCommand('playVideo');
    };

    const handlePause = () => {
        setIsPlaying(false);
        sendVideoCommand('pauseVideo');
    };

    const handleStop = () => {
        setIsPlaying(false);
        sendVideoCommand('pauseVideo');
        sendVideoCommand('seekTo', [0, true]);
        sendVideoCommand('pauseVideo'); // Ensure it stays paused at 0
    };

    const handleReset = () => {
        setIsPlaying(false);
        setDuration(0);
        setSteps(0);
        setCalories(0);
        sendVideoCommand('pauseVideo');
        sendVideoCommand('seekTo', [0, true]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
            {/* Spotify Modal */}


            {/* YouTube Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/ntgzWa_QYFQ?autoplay=1&mute=1&controls=0&loop=1&playlist=ntgzWa_QYFQ,GZkSqcKcHYM`}
                    title="Walking Simulation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover scale-[1.35]"
                ></iframe>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex-grow flex flex-col justify-between p-8 md:p-12 text-white">

                {/* Header Stats */}
                <div className="flex justify-between items-start">
                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Tiempo</p>
                        <p className="text-4xl font-black font-mono">{formatTime(duration)}</p>
                    </div>

                    {/* Spotify Toggle Button */}
                    <button
                        onClick={toggleOpen}
                        className="bg-[#1DB954] hover:bg-[#1ed760] text-white p-4 rounded-full shadow-lg shadow-green-500/20 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        title="Abrir Spotify"
                    >
                        <span className="material-symbols-outlined text-3xl">music_note</span>
                        <span className="font-bold hidden md:inline">Spotify</span>
                    </button>

                    {showHydration && (
                        <div className="bg-blue-500/90 backdrop-blur-md px-6 py-4 rounded-full flex items-center gap-4 animate-bounce shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-3xl">water_drop</span>
                            <div>
                                <p className="font-bold text-lg">¡Hora de Hidratarse!</p>
                                <p className="text-xs opacity-90">Bebe un sorbo de agua.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="absolute bottom-8 right-8 flex items-end justify-end pointer-events-none">
                    <div className="pointer-events-auto flex items-center gap-4 bg-black/50 backdrop-blur-md p-4 rounded-3xl border border-white/10 transition-opacity duration-300 hover:bg-black/70 scale-90 origin-bottom-right">

                        {/* Play/Pause Button */}
                        {!isPlaying ? (
                            <button
                                onClick={handleStart}
                                className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white shadow-lg shadow-primary/30 transition-all hover:scale-110 active:scale-95 group"
                                aria-label="Iniciar caminata"
                            >
                                <span className="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform">play_arrow</span>
                            </button>
                        ) : (
                            <button
                                onClick={handlePause}
                                className="w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-110 active:scale-95 group"
                                aria-label="Pausar caminata"
                            >
                                <span className="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform">pause</span>
                            </button>
                        )}

                        {/* Stop Button */}
                        <button
                            onClick={handleStop}
                            className="w-14 h-14 rounded-full bg-zinc-700/80 hover:bg-red-500 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                            title="Parar"
                            aria-label="Parar"
                        >
                            <span className="material-symbols-outlined text-3xl">stop</span>
                        </button>

                        {/* Reset Button */}
                        <button
                            onClick={handleReset}
                            className="w-14 h-14 rounded-full bg-zinc-700/80 hover:bg-blue-500 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                            title="Reiniciar"
                            aria-label="Reiniciar"
                        >
                            <span className="material-symbols-outlined text-3xl">restart_alt</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-black/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-orange-500">footprint</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Pasos</span>
                        </div>
                        <p className="text-3xl font-black">{steps}</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-black/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-rose-500">local_fire_department</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Calorías</span>
                        </div>
                        <p className="text-3xl font-black">{calories.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalkingSimulation;
