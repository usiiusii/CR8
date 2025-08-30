
import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContext';
import { View, Language, Theme } from '../types';
import GradientText from './ui/GradientText';

const Header: React.FC = () => {
    const { 
        isAdmin,
        activeView, 
        setActiveView, 
        setAdminLoginOpen, 
        theme, 
        toggleTheme, 
        language, 
        toggleLanguage, 
        t 
    } = useContext(AppContext) as AppContextType;

    const navItems = [
        { view: View.Courses, label: t('courses') },
        { view: View.Teachers, label: t('teachers') },
        { view: View.Schedule, label: t('schedule') },
        { view: View.Posts, label: t('posts') },
        { view: View.History, label: t('history') },
    ];

    const SunIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );

    const MoonIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-40 p-4 bg-white/10 dark:bg-black/10 backdrop-blur-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <GradientText>{t('appName')}</GradientText>
                </h1>
                <nav className="hidden md:flex items-center space-x-2 rounded-full bg-white/20 dark:bg-black/20 p-2 border border-white/20">
                    {navItems.map(item => (
                        <button
                            key={item.view}
                            onClick={() => setActiveView(item.view)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                activeView === item.view 
                                ? 'bg-white/50 dark:bg-white/20 text-black dark:text-white font-semibold' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                     <div className="relative inline-block w-28 h-8 cursor-pointer" onClick={toggleLanguage}>
                        <div className={`absolute inset-0 bg-white/20 dark:bg-black/20 rounded-full transition-all duration-300 ease-in-out`}></div>
                        <div className={`absolute top-1 left-1 w-12 h-6 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${language === Language.Myanmar ? 'translate-x-14' : ''}`}></div>
                        <div className="absolute inset-0 flex justify-around items-center text-sm font-bold">
                            <span className={language === Language.English ? 'text-white' : 'text-gray-500'}>EN</span>
                            <span className={language === Language.Myanmar ? 'text-white' : 'text-gray-500'}>MY</span>
                        </div>
                    </div>
                    
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-colors">
                        {theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
                    </button>

                    {!isAdmin && (
                         <button onClick={() => setAdminLoginOpen(true)} className="px-3 py-2 text-sm font-bold text-red-500 bg-red-500/10 border border-red-500/30 rounded-full hover:bg-red-500/20 transition-colors">
                            {t('adminLogin')}
                        </button>
                    )}
                </div>
            </div>
             <nav className="md:hidden mt-4 flex flex-wrap justify-center gap-2">
                 {navItems.map(item => (
                    <button
                        key={item.view}
                        onClick={() => setActiveView(item.view)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                            activeView === item.view 
                            ? 'bg-white/50 dark:bg-white/20 text-black dark:text-white font-semibold' 
                            : 'bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </header>
    );
};

export default Header;
