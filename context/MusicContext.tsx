import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MusicContextType {
    isOpen: boolean;
    toggleOpen: () => void;
    playlistUrl: string;
    setPlaylist: (url: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    // Default playlist: Workout Beast Mode
    const [playlistUrl, setPlaylistUrl] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator&theme=0");

    const toggleOpen = () => setIsOpen(prev => !prev);
    const setPlaylist = (url: string) => setPlaylistUrl(url);

    return (
        <MusicContext.Provider value={{ isOpen, toggleOpen, playlistUrl, setPlaylist }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
