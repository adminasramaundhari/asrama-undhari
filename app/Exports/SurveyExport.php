<?php

namespace App\Exports;

use App\Models\Survey;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SurveyExport implements FromCollection, WithHeadings
{
    protected $survey;

    public function __construct($survey = null)
    {
        $this->survey = $survey;
    }

    public function collection()
    {
        if ($this->survey) {
            return collect([$this->survey]);
        }
        return Survey::with('questions')->get();
    }

    public function headings(): array
    {
        return ['ID', 'Judul', 'Deskripsi', 'Start Date', 'End Date', 'Status', 'Jumlah Pertanyaan'];
    }
}