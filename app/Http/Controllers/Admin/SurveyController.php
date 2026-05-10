<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\SurveyExport;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = Survey::with('questions')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Surveys/Index', [
            'surveys' => $surveys
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Surveys/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string',
            'questions.*.type' => 'required|in:text,radio,checkbox,rating',
        ]);

        $survey = Survey::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_active' => true,
        ]);

        foreach ($request->questions as $index => $q) {
            SurveyQuestion::create([
                'survey_id' => $survey->id,
                'question' => $q['question'],
                'type' => $q['type'],
                'options' => $q['options'] ?? null,
                'order' => $index + 1,
                'is_required' => $q['is_required'] ?? true,
            ]);
        }

        return redirect()->route('admin.surveys.index')
            ->with('success', 'Survey berhasil dibuat');
    }

public function show(Survey $survey)
{
    $survey->load('questions');
    
    return Inertia::render('Admin/Surveys/Show', [
        'survey' => $survey,
    ]);
    }
    
    public function edit(Survey $survey)
    {
        return Inertia::render('Admin/Surveys/Edit', [
            'survey' => $survey
        ]);
    }

    public function update(Request $request, Survey $survey)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        $survey->update($request->all());

        return redirect()->route('admin.surveys.index')
            ->with('success', 'Survey berhasil diupdate');
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();
        
        return redirect()->route('admin.surveys.index')
            ->with('success', 'Survey berhasil dihapus');
    }

    public function export(Survey $survey)
    {
        return Excel::download(new SurveyExport($survey), 'survey-' . $survey->id . '.xlsx');
    }
}