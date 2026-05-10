import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth }) {
    const [questions, setQuestions] = useState([
        { question: '', type: 'text', options: [], is_required: true }
    ]);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        questions: questions,
    });

    const addQuestion = () => {
        const newQuestions = [...questions, { question: '', type: 'text', options: [], is_required: true }];
        setQuestions(newQuestions);
        setData('questions', newQuestions);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
        setData('questions', newQuestions);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
        setData('questions', newQuestions);
    };

    const updateOptions = (index, optionsString) => {
        const options = optionsString.split(',').map(opt => opt.trim()).filter(Boolean);
        const newQuestions = [...questions];
        newQuestions[index].options = options;
        setQuestions(newQuestions);
        setData('questions', newQuestions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.surveys.store'));
    };

    const questionTypes = [
        { value: 'text', label: 'Text (Isian Singkat)', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/></svg>
        )},
        { value: 'radio', label: 'Radio (Pilih Satu)', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
        )},
        { value: 'checkbox', label: 'Checkbox (Pilih Banyak)', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        )},
        { value: 'rating', label: 'Rating (1-5)', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        )},
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Buat Survey Baru</h2>}
        >
            <Head title="Buat Survey" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <line x1="8" y1="8" x2="16" y2="8" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Survey Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Buat survey untuk mengumpulkan feedback penghuni</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-6">
                            
                            {/* Informasi Survey */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="16" x2="12" y2="12" />
                                    </svg>
                                    Informasi Survey
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <InputLabel value="Judul Survey" required />
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            placeholder="Masukkan judul survey"
                                            required
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputLabel value="Deskripsi" hint="Penjelasan singkat tentang survey" />
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                            placeholder="Deskripsi survey..."
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Tanggal Mulai" required />
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            required
                                        />
                                        <InputError message={errors.start_date} />
                                    </div>
                                    <div>
                                        <InputLabel value="Tanggal Selesai" required />
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            required
                                        />
                                        <InputError message={errors.end_date} />
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 dark:border-gray-700" />

                            {/* Pertanyaan */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <line x1="8" y1="6" x2="21" y2="6" />
                                            <line x1="8" y1="12" x2="21" y2="12" />
                                        </svg>
                                        Pertanyaan ({questions.length})
                                    </h4>
                                    <SecondaryButton
                                        type="button"
                                        onClick={addQuestion}
                                        size="sm"
                                        iconLeft={
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        }
                                    >
                                        Tambah
                                    </SecondaryButton>
                                </div>

                                <div className="space-y-4">
                                    {questions.map((q, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-black">
                                                        {index + 1}
                                                    </span>
                                                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Pertanyaan</h5>
                                                </div>
                                                {questions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeQuestion(index)}
                                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <InputLabel value="Teks Pertanyaan" />
                                                    <input
                                                        type="text"
                                                        value={q.question}
                                                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                                        placeholder="Tulis pertanyaan..."
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <InputLabel value="Tipe Jawaban" />
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                                                        {questionTypes.map((type) => (
                                                            <label
                                                                key={type.value}
                                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                                    q.type === type.value
                                                                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                                }`}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`type-${index}`}
                                                                    value={type.value}
                                                                    checked={q.type === type.value}
                                                                    onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                                                                    className="sr-only"
                                                                />
                                                                <span className="text-primary">{type.icon}</span>
                                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{type.label.split(' ')[0]}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {(q.type === 'radio' || q.type === 'checkbox') && (
                                                    <div>
                                                        <InputLabel value="Pilihan" hint="Pisahkan dengan koma" />
                                                        <input
                                                            type="text"
                                                            placeholder="Sangat Puas, Puas, Biasa, Tidak Puas"
                                                            onChange={(e) => updateOptions(index, e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                                        />
                                                        {q.options && q.options.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {q.options.map((opt, i) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-xs font-medium rounded-lg">
                                                                        {opt}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={q.is_required}
                                                        onChange={(e) => updateQuestion(index, 'is_required', e.target.checked)}
                                                        className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 text-primary bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                                    />
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Wajib diisi
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.surveys.index')}>
                                    <SecondaryButton type="button"
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 12H5" />
                                                <polyline points="12 19 5 12 12 5" />
                                            </svg>
                                        }
                                    >
                                        Kembali
                                    </SecondaryButton>
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} loading={processing}
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                        </svg>
                                    }
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Survey'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}