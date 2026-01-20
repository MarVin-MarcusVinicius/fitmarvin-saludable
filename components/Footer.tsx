import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';

const Footer = () => {
    return (
        <footer className="w-full py-2 px-4 bg-card-light dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark mt-auto z-10 shrink-0">
            <div className="w-full flex items-center justify-center">
                <Link to="/about-creator" className="flex flex-wrap items-center justify-center gap-2 md:gap-3 hover:opacity-80 transition-opacity group cursor-pointer text-center">
                    <img
                        src={IMAGES.LOGO}
                        alt="FitMarvin Logo"
                        className="h-5 md:h-6 w-auto object-contain"
                    />
                    <span className="text-[10px] md:text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                        Aplicación creada por Marcus De Araujo , Enero 2026 con todos los derechos.
                    </span>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
