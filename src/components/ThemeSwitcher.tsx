import { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    // Cambia el tema cuando darkMode cambia
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Alterna entre el modo oscuro y claro
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
            <button
                onClick={toggleDarkMode}
                className="px-4 py-2 bg-blue-500 dark:bg-gray-800 text-white rounded"
            >
                {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
