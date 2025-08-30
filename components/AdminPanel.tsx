
import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../context/AppContext';
import { Course, Post, Teacher, ScheduleItem } from '../types';
import GlassCard from './ui/GlassCard';
import { FONT_OPTIONS } from '../constants';
// FIX: Imported GradientText component to resolve reference error.
import GradientText from './ui/GradientText';

const AdminPanel: React.FC = () => {
    const { data, setData, logoutAdmin, t } = useContext(AppContext) as AppContextType;

    // Font setting state
    const [selectedFont, setSelectedFont] = useState(document.documentElement.style.getPropertyValue('--font-family') || FONT_OPTIONS[0].value);

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFont(e.target.value);
        document.documentElement.style.setProperty('--font-family', e.target.value);
    };

    const handleSave = () => {
        // Here you would typically save to a backend.
        // For this example, we just show an alert.
        alert('Data saved to localStorage!');
    };

    // Generic CRUD handlers
    const handleAdd = <T,>(key: keyof typeof data, newItem: Omit<T, 'id'>) => {
        setData(prev => ({
            ...prev,
            [key]: [...prev[key], { ...newItem, id: Date.now().toString() }] as any,
        }));
    };

    const handleUpdate = <T extends {id: string}>(key: keyof typeof data, updatedItem: T) => {
        setData(prev => ({
            ...prev,
            [key]: prev[key].map((item: T) => item.id === updatedItem.id ? updatedItem : item) as any,
        }));
    };

    const handleDelete = (key: keyof typeof data, id: string) => {
        if(window.confirm('Are you sure you want to delete this item?')){
            setData(prev => ({
                ...prev,
                [key]: prev[key].filter((item: {id: string}) => item.id !== id) as any,
            }));
        }
    };

    const renderCourseForm = (course: Course | null, onSave: (course: Course) => void) => {
        const [formData, setFormData] = useState(course || { id: '', title: '', teacher: '', telegramLink: '', date: '', description: '' });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        
        return (
            <div className="space-y-2 p-2 bg-black/10 rounded-lg mt-2">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={t('title')} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <input type="text" name="teacher" value={formData.teacher} onChange={handleChange} placeholder={t('teacher')} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <input type="text" name="telegramLink" value={formData.telegramLink} onChange={handleChange} placeholder={t('telegramLink')} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder={t('description')} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20" />
                <button onClick={() => onSave(formData)} className="px-4 py-2 bg-green-500/50 rounded hover:bg-green-500/70">{t('saveChanges')}</button>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-100/80 dark:bg-black/80 backdrop-blur-md overflow-y-auto p-4 pt-32">
            <div className="container mx-auto">
                <GlassCard>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold"><GradientText>{t('adminDashboard')}</GradientText></h2>
                        <button onClick={logoutAdmin} className="px-4 py-2 bg-red-500/50 rounded hover:bg-red-500/70">{t('logout')}</button>
                    </div>
                    <p className="mt-2 mb-6 text-gray-600 dark:text-gray-300">{t('manageContent')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Settings */}
                        <GlassCard>
                            <h3 className="text-xl font-semibold mb-2">{t('manageSettings')}</h3>
                             <div className="space-y-2">
                                <label className="block">{t('siteFont')}</label>
                                <select value={selectedFont} onChange={handleFontChange} className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20">
                                    {FONT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                                <label className="block mt-2">{t('uploadFontFile')}</label>
                                <input type="file" className="w-full text-sm" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">Note: Font upload is a visual demo. Selected font will be applied.</p>
                            </div>
                        </GlassCard>

                        {/* Courses */}
                        <GlassCard>
                            <h3 className="text-xl font-semibold mb-2">{t('manageCourses')}</h3>
                            {renderCourseForm(null, (course) => handleAdd('courses', course))}
                             <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                                {data.courses.map(course => (
                                    <div key={course.id} className="p-2 bg-black/10 rounded flex justify-between items-center">
                                        <span>{course.title}</span>
                                        <button onClick={() => handleDelete('courses', course.id)} className="text-red-500">X</button>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                         {/* Posts */}
                         <GlassCard>
                            <h3 className="text-xl font-semibold mb-2">{t('managePosts')}</h3>
                            {/* Simplified form for brevity */}
                        </GlassCard>

                        {/* Teachers */}
                        <GlassCard>
                            <h3 className="text-xl font-semibold mb-2">{t('manageTeachers')}</h3>
                            {/* Simplified form for brevity */}
                        </GlassCard>

                        {/* Schedule */}
                        <GlassCard>
                             <h3 className="text-xl font-semibold mb-2">{t('manageSchedule')}</h3>
                            {/* Simplified form for brevity */}
                        </GlassCard>

                        {/* History & Contact */}
                        <GlassCard>
                            <h3 className="text-xl font-semibold mb-2">{t('manageHistory')} & {t('manageContact')}</h3>
                             <div className="space-y-2">
                                <label>{t('history')}</label>
                                <textarea 
                                    value={data.courseHistory} 
                                    onChange={(e) => setData(p => ({...p, courseHistory: e.target.value}))}
                                    className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20 h-24" 
                                />
                                <label>{t('viberNumber')}</label>
                                <input 
                                    type="text"
                                    value={data.contactViber}
                                    onChange={(e) => setData(p => ({...p, contactViber: e.target.value}))}
                                    className="w-full p-2 rounded bg-white/50 dark:bg-black/50 border border-white/20"
                                />
                             </div>
                        </GlassCard>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AdminPanel;