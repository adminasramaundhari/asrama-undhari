import { useState } from 'react';

export default function LanguageSwitcher() {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');

    const changeLanguage = (locale) => {
        setLang(locale);
        localStorage.setItem('lang', locale);
        window.location.reload();
    };

    return (
        <div className="flex gap-2">
            <button onClick={() => changeLanguage('id')} className={`px-2 py-1 text-sm rounded ${lang === 'id' ? 'bg-[#FF2A00] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                ID
            </button>
            <button onClick={() => changeLanguage('en')} className={`px-2 py-1 text-sm rounded ${lang === 'en' ? 'bg-[#FF2A00] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                EN
            </button>
        </div>
    );
}