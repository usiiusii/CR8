
import React, { useState, useContext, useEffect } from 'react';
import { AppProvider, AppContext, AppContextType } from './context/AppContext';
import Header from './components/Header';
import AdminPanel from './components/AdminPanel';
import Modal from './components/ui/Modal';
import GlassButton from './components/ui/GlassButton';
import GradientText from './components/ui/GradientText';
import { View, Course, Post } from './types';
import GlassCard from './components/ui/GlassCard';

// Define components outside of the main App component
const UserLogin: React.FC = () => {
    const { loginUser, t } = useContext(AppContext) as AppContextType;
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            loginUser(name.trim());
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <GlassCard className="w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-4"><GradientText>{t('welcomeMessage')}</GradientText></h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">{t('enterUsername')}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('username')}
                        className="p-3 text-center rounded-lg bg-white/50 dark:bg-black/50 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                    <GlassButton type="submit">{t('enter')}</GlassButton>
                </form>
            </GlassCard>
        </div>
    );
};

const AdminLoginModal: React.FC = () => {
    const { isAdminLoginOpen, setAdminLoginOpen, loginAdmin, t } = useContext(AppContext) as AppContextType;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!loginAdmin(username, password)) {
            setError('Invalid credentials');
        } else {
            setError('');
        }
    };

    return (
        <Modal isOpen={isAdminLoginOpen} onClose={() => setAdminLoginOpen(false)} title={t('adminLogin')}>
            <div className="flex flex-col gap-4">
                <input type="text" placeholder={t('username')} value={username} onChange={e => setUsername(e.target.value)} className="p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <input type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <GlassButton onClick={handleLogin}>{t('login')}</GlassButton>
            </div>
        </Modal>
    );
};

const CoursesView: React.FC = () => {
    const { data, t } = useContext(AppContext) as AppContextType;
    return (
        <div className="space-y-6">
            {data.courses.map(course => (
                <GlassCard key={course.id}>
                    <h3 className="text-2xl font-bold"><GradientText>{course.title}</GradientText></h3>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">{course.teacher} - {new Date(course.date).toLocaleDateString()}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{course.description}</p>
                    <div className="mt-4">
                        <GlassButton onClick={() => window.open(course.telegramLink, '_blank')}>
                            {t('viewOnTelegram')}
                        </GlassButton>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};

const PostsView: React.FC = () => {
    const { data, t } = useContext(AppContext) as AppContextType;
    return (
        <div className="space-y-6">
            {data.posts.map(post => (
                <GlassCard key={post.id}>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" className="rounded-lg mb-4 w-full h-64 object-cover" />}
                    <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{post.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">{new Date(post.date).toLocaleString()}</p>
                </GlassCard>
            ))}
        </div>
    );
};
const HistoryView: React.FC = () => {
    const { data } = useContext(AppContext) as AppContextType;
    return <GlassCard><p className="whitespace-pre-wrap">{data.courseHistory}</p></GlassCard>
};

const AppContent: React.FC = () => {
    const { user, isAdmin, activeView, t, data } = useContext(AppContext) as AppContextType;
    const [isInstallPromptOpen, setInstallPromptOpen] = useState(false);

    useEffect(() => {
        const isFirstVisit = !localStorage.getItem('visited');
        if (isFirstVisit) {
            setTimeout(() => setInstallPromptOpen(true), 3000);
            localStorage.setItem('visited', 'true');
        }
    }, []);
    
    if (!user) {
        return <UserLogin />;
    }

    const renderView = () => {
        switch (activeView) {
            case View.Courses: return <CoursesView />;
            case View.Posts: return <PostsView />;
            case View.History: return <HistoryView />;
            default: return <GlassCard>{activeView} content coming soon.</GlassCard>
        }
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
                <h2 className="text-4xl font-bold mb-8 text-center"><GradientText>{t(activeView)}</GradientText></h2>
                {renderView()}
            </main>
            {isAdmin && <AdminPanel />}
            <AdminLoginModal />

            <Modal isOpen={isInstallPromptOpen} onClose={() => setInstallPromptOpen(false)} title={t('installApp')}>
                <p>{t('installInstructions')}</p>
                <div className="mt-4 text-right">
                    <GlassButton onClick={() => setInstallPromptOpen(false)}>{t('close')}</GlassButton>
                </div>
            </Modal>
        </>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="bg-yellow-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500
        bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]
      ">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-transparent to-pink-100/30 dark:from-indigo-900/30 dark:via-transparent dark:to-purple-900/30"></div>
        <div className="relative">
            <AppContent />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
