import React from 'react';
import { useMusic } from '../context/MusicContext';

const GlobalSpotifyPlayer = () => {
    const { isOpen, toggleOpen, playlistUrl } = useMusic();

    // Hidden when closed, but MOUNTED to persist playback.
    const displayStyle = isOpen ? 'block' : 'hidden';

    return (
        <div className={`fixed top-24 right-4 z-50 animate-in fade-in slide-in-from-right-10 duration-300 ${displayStyle}`}>
            <div className="relative bg-[#121212] border border-white/10 rounded-3xl w-80 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-white/10 bg-[#121212]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#1DB954] text-xl">music_note</span>
                        <h3 className="font-bold text-white text-xs">Spotify Player</h3>
                    </div>
                    <button
                        onClick={toggleOpen}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                        title="Ocultar (Música sigue sonando)"
                    >
                        <span className="material-symbols-outlined text-base">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="h-[152px]"> {/* Compact height */}
                    <iframe
                        style={{ borderRadius: '0 0 12px 12px' }}
                        src={playlistUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Player"
                        className="bg-[#282828]"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default GlobalSpotifyPlayer;
