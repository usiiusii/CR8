
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppData, Theme, Language, User, View } from '../types';
import { INITIAL_DATA, LOCALES, ADMIN_USERNAME, ADMIN_PASSWORD } from '../constants';
// FIX: Imported GlassCard component to resolve reference error.
import GlassCard from '../components/ui/GlassCard';

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  user: User | null;
  loginUser: (name: string) => void;
  isAdmin: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  isAdminLoginOpen: boolean;
  setAdminLoginOpen: (isOpen: boolean) => void;
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  activeView: View;
  setActiveView: (view: View) => void;
  showToast: (title: string, message: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || Theme.Light);
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || Language.English);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>(View.Courses);

  const [toast, setToast] = useState<{ title: string; message: string; show: boolean }>({ title: '', message: '', show: false });

  const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };
    return [storedValue, setValue];
  };

  const [data, setData] = useLocalStorage<AppData>('appData', INITIAL_DATA);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === Theme.Light ? Theme.Dark : Theme.Light);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const toggleTheme = () => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  const toggleLanguage = () => setLanguage(language === Language.English ? Language.Myanmar : Language.English);
  
  const t = useCallback((key: string) => {
    return LOCALES[language][key] || key;
  }, [language]);

  const loginUser = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const loginAdmin = (user: string, pass: string): boolean => {
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminLoginOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => setIsAdmin(false);

  const showToast = (title: string, message: string) => {
    setToast({ title, message, show: true });
    // Play a notification sound
    const audio = new Audio('https://cdn.freesound.org/previews/573/573381_7037-lq.mp3');
    audio.play().catch(e => console.error("Audio play failed:", e));
    setTimeout(() => setToast({ title: '', message: '', show: false }), 4000);
  };
  
  const value = {
    theme, toggleTheme,
    language, toggleLanguage, t,
    user, loginUser,
    isAdmin, loginAdmin, logoutAdmin,
    isAdminLoginOpen, setAdminLoginOpen,
    data, setData,
    activeView, setActiveView,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast.show && (
          <div className="fixed top-24 right-4 z-50 animate-slide-in-left">
              <GlassCard className="!p-4 border-green-400/50">
                  <h4 className="font-bold text-green-700 dark:text-green-300">{toast.title}</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{toast.message}</p>
              </GlassCard>
          </div>
      )}
    </AppContext.Provider>
  );
};