import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ auth, survey }) {
    const [answers, setAnswers] = useState({});

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleCheckboxChange = (questionId, value, checked) => {
        const current = answers[questionId] || [];
        if (checked) {
            setAnswers(prev => ({ ...prev, [questionId]: [...current, value] }));
        } else {
            setAnswers(prev => ({ ...prev, [questionId]: current.filter(v => v !== value) }));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        for (const q of survey.questions) {
            if (q.is_required && (!answers[q.id] || answers[q.id].length === 0)) {
                alert(`Pertanyaan "${q.question}" wajib diisi`);
                return;
            }
        }
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/mahasiswa/surveys/${survey.id}`;
        
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.content;
        form.appendChild(csrfInput);
        
        for (const [key, value] of Object.entries(answers)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }
        
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{survey.title}</h2>}
        >
            <Head title={survey.title} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    <Link 
                        href={route('mahasiswa.surveys.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Survey
                    </Link>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="3" />
                                        <line x1="8" y1="8" x2="16" y2="8" />
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-xl font-black">{survey.title}</h1>
                                    {survey.description && (
                                        <p className="text-white/70 text-sm mt-0.5">{survey.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                </svg>
                                {survey.start_date?.split('T')[0]} — {survey.end_date?.split('T')[0]}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                </svg>
                                {survey.questions?.length || 0} pertanyaan
                            </span>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-6">
                            {survey.questions?.map((question, idx) => (
                                <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                                    <label className="font-semibold text-gray-900 dark:text-white mb-3 block">
                                        {idx + 1}. {question.question}
                                        {question.is_required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    
                                    {question.type === 'text' && (
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" 
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)} 
                                            required={question.is_required} 
                                        />
                                    )}
                                    
                                    {question.type === 'rating' && (
                                        <div className="flex gap-3">
                                            {[1,2,3,4,5].map(rating => (
                                                <label key={rating} className="flex flex-col items-center gap-1 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name={`q_${question.id}`} 
                                                        value={rating} 
                                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)} 
                                                        required={question.is_required} 
                                                        className="sr-only peer"
                                                    />
                                                    <span className="w-10 h-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition-all duration-300">
                                                        {rating}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {question.type === 'radio' && question.options && (
                                        <div className="space-y-2">
                                            {question.options.map(opt => (
                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name={`q_${question.id}`} 
                                                        value={opt} 
                                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)} 
                                                        required={question.is_required} 
                                                        className="w-4 h-4 text-primary focus:ring-primary/20"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {question.type === 'checkbox' && question.options && (
                                        <div className="space-y-2">
                                            {question.options.map(opt => (
                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        value={opt} 
                                                        onChange={(e) => handleCheckboxChange(question.id, opt, e.target.checked)} 
                                                        className="w-4 h-4 rounded text-primary focus:ring-primary/20"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('mahasiswa.surveys.index')}>
                                    <SecondaryButton type="button"
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 12H5" />
                                                <polyline points="12 19 5 12 12 5" />
                                            </svg>
                                        }
                                    >
                                        Batal
                                    </SecondaryButton>
                                </Link>
                                <PrimaryButton type="submit"
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    Kirim Jawaban
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}