<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = Survey::where('is_active', true)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->orderBy('created_at', 'desc')
            ->get();
        
        $answeredSurveys = SurveyAnswer::where('user_id', auth()->id())
            ->pluck('survey_id')
            ->toArray();
        
        return Inertia::render('Mahasiswa/Surveys/Index', [
            'surveys' => $surveys,
            'answeredSurveys' => $answeredSurveys,
        ]);
    }

    public function show(Survey $survey)
    {
        $hasAnswered = SurveyAnswer::where('survey_id', $survey->id)
            ->where('user_id', auth()->id())
            ->exists();
        
        if ($hasAnswered) {
            return redirect()->route('mahasiswa.surveys.index')
                ->with('error', 'Anda sudah mengisi survey ini');
        }
        
        if (!$survey->is_active || now() < $survey->start_date || now() > $survey->end_date) {
            return redirect()->route('mahasiswa.surveys.index')
                ->with('error', 'Survey tidak tersedia');
        }
        
        $survey->load('questions');
        
        return Inertia::render('Mahasiswa/Surveys/Show', [
            'survey' => $survey
        ]);
    }

    public function store(Request $request, Survey $survey)
    {
        $answers = $request->except('_token');
        
        foreach ($answers as $questionId => $answer) {
            if (is_array($answer)) {
                $answer = json_encode($answer);
            }
            
            SurveyAnswer::create([
                'survey_id' => $survey->id,
                'question_id' => $questionId,
                'user_id' => auth()->id(),
                'answer' => $answer,
            ]);
        }
        
        return redirect()->route('mahasiswa.surveys.index')
            ->with('success', 'Survey berhasil dikirim');
    }
}