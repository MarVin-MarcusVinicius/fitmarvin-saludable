import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Dashboard from './pages/Dashboard';
import ExerciseLibrary from './pages/Exercises';
import NutritionPlan from './pages/Nutrition';
import Community from './pages/Community';
import ProfileSettings from './pages/Profile';
import Onboarding from './pages/Onboarding';
import DesignSystem from './pages/DesignSystem';
import CyclingSimulation from './pages/CyclingSimulation';
import WalkingSimulation from './pages/WalkingSimulation';
import AboutCreator from './pages/AboutCreator';
import TopHeader from './components/TopHeader';
import { MusicProvider } from './context/MusicContext';
import { UserStatsProvider } from './context/UserStatsContext';
import GlobalSpotifyPlayer from './components/GlobalSpotifyPlayer';
import Footer from './components/Footer';
import HealthReminders from './components/HealthReminders';

const App = () => {
    return (
        <LanguageProvider>
            <MusicProvider>
                <HashRouter>
                    <UserStatsProvider>
                        <div className="h-screen w-screen overflow-hidden flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white max-w-screen-2xl 2xl:mx-auto">
                            <TopHeader />
                            <GlobalSpotifyPlayer />
                            <HealthReminders />
                            <div className="flex-1 overflow-hidden relative">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/exercises" element={<ExerciseLibrary />} />
                                    <Route path="/nutrition" element={<NutritionPlan />} />
                                    <Route path="/community" element={<Community />} />
                                    <Route path="/profile" element={<ProfileSettings />} />
                                    <Route path="/onboarding" element={<Onboarding />} />
                                    <Route path="/design-system" element={<DesignSystem />} />
                                    <Route path="/cycling" element={<CyclingSimulation />} />
                                    <Route path="/walking" element={<WalkingSimulation />} />
                                    <Route path="/about-creator" element={<AboutCreator />} />
                                </Routes>
                            </div>
                            <Footer />
                        </div>
                    </UserStatsProvider>
                </HashRouter>
            </MusicProvider>
        </LanguageProvider>
    );
};

export default App;