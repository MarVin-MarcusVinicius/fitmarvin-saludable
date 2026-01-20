import React from 'react';
import { IMAGES } from '../constants';

const AboutCreator = () => {
    return (
        <div className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-slate-200 dark:border-border-dark">
                    <div className="md:flex">
                        {/* Image/Sidebar Section */}
                        <div className="md:w-1/3 bg-slate-50 dark:bg-black/20 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-border-dark">
                            <div className="w-64 h-64 bg-white dark:bg-surface-dark rounded-2xl shadow-lg mb-6 overflow-hidden">
                                <img
                                    src={IMAGES.CREATOR_PROFILE}
                                    alt="Marcus De Araujo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center">
                                MarVin
                            </h2>
                            <p className="text-primary font-semibold mt-2 text-center">
                                Marcus Vinicius De Araujo
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    Brasileño
                                </span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    44 Años
                                </span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    Desarrollador
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                Sobre el Creador
                            </h1>

                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                                <p>
                                    Hola, soy <span className="font-bold text-primary">MarVin</span> (Marcus Vinicius De Araujo), Brasileño, 44 años, casado con Fernanda Da Silva y padre de Fernandiño.
                                </p>
                                <p>
                                    Vivimos en España desde 2022. No tenía idea de cómo crear una aplicación hasta que conocí a mi mejor amigo en España, <span className="font-bold text-primary">Luisfer</span>, quien me mostró su trabajo. Él me ayuda mucho, ya que por motivos de salud no puedo hacer esfuerzo físico.
                                </p>
                                <p>
                                    Me encanta el arte visual y tener ideas para ayudar a alguien de alguna forma. Además, es un área donde puedo trabajar desde la comodidad de mi casa, cerca de mi familia y poder seguir el crecimiento de mi hijo Fernandiño.
                                </p>
                                <p>
                                    Bueno, somos una Familia Cristiana muy felices, unidos y bendecidos por Dios.
                                </p>
                                <p>
                                    Nosotros necesitamos tener buena salud mental y física. No pienses solo en trabajo y dinero, pues tu cuerpo necesita de cuidados y sin salud no se va adelante. Recuérdate: "Amar al prójimo como a sí mismo", cuida de tu salud.
                                </p>
                                <p className="italic font-medium border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
                                    "Esta es mi breve descripción, un saludo a todos y que disfruten la aplicación. Un fuerte abrazo de Marcus De Araujo."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCreator;
