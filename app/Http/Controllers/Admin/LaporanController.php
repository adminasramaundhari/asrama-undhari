<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Exports\PenghuniExport;
use App\Exports\PembayaranExport;
use App\Exports\KamarExport;
use App\Exports\AsramaExport;
use App\Exports\PengaduanExport;
use App\Exports\PengumumanExport;
use App\Exports\NotifikasiExport;
use App\Exports\SurveyExport;
use App\Models\User;
use App\Models\Payment;
use App\Models\Room;
use App\Models\Asrama;
use App\Models\Complaint;
use App\Models\Announcement;
use App\Models\Notification;
use App\Models\Survey;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        $stats = [
            'total_penghuni' => User::where('role', 'mahasiswa')->count(),
            'total_kamar' => Room::count(),
            'total_asrama' => Asrama::count(),
            'total_pembayaran' => Payment::count(),
            'total_pengaduan' => Complaint::count(),
            'total_pengumuman' => Announcement::count(),
            'total_notifikasi' => Notification::count(),
            'total_survey' => Survey::count(),
        ];

        return Inertia::render('Admin/Laporan/Index', [
            'stats' => $stats
        ]);
    }

    // LAPORAN PENGHUNI
    public function exportPenghuniExcel()
    {
        return Excel::download(new PenghuniExport, 'laporan-penghuni-' . date('Y-m-d') . '.xlsx');
    }

    public function exportPenghuniPdf()
    {
        $data = User::where('role', 'mahasiswa')->get();
        $pdf = Pdf::loadView('exports.penghuni-pdf', ['data' => $data]);
        return $pdf->download('laporan-penghuni-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN PEMBAYARAN
    public function exportPembayaranExcel()
    {
        return Excel::download(new PembayaranExport, 'laporan-pembayaran-' . date('Y-m-d') . '.xlsx');
    }

    public function exportPembayaranPdf()
    {
        $data = Payment::with('user')->get();
        $pdf = Pdf::loadView('exports.pembayaran-pdf', ['data' => $data]);
        return $pdf->download('laporan-pembayaran-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN KAMAR
    public function exportKamarExcel()
    {
        return Excel::download(new KamarExport, 'laporan-kamar-' . date('Y-m-d') . '.xlsx');
    }

    public function exportKamarPdf()
    {
        $data = Room::with('asrama')->get();
        $pdf = Pdf::loadView('exports.kamar-pdf', ['data' => $data]);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->download('laporan-kamar-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN ASRAMA
    public function exportAsramaExcel()
    {
        return Excel::download(new AsramaExport, 'laporan-asrama-' . date('Y-m-d') . '.xlsx');
    }

    public function exportAsramaPdf()
    {
        $data = Asrama::withCount('rooms')->get();
        $pdf = Pdf::loadView('exports.asrama-pdf', ['data' => $data]);
        return $pdf->download('laporan-asrama-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN PENGADUAN
    public function exportPengaduanExcel()
    {
        return Excel::download(new PengaduanExport, 'laporan-pengaduan-' . date('Y-m-d') . '.xlsx');
    }

    public function exportPengaduanPdf()
    {
        $data = Complaint::with('user')->get();
        $pdf = Pdf::loadView('exports.pengaduan-pdf', ['data' => $data]);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->download('laporan-pengaduan-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN PENGUMUMAN
    public function exportPengumumanExcel()
    {
        return Excel::download(new PengumumanExport, 'laporan-pengumuman-' . date('Y-m-d') . '.xlsx');
    }

    public function exportPengumumanPdf()
    {
        $data = Announcement::all();
        $pdf = Pdf::loadView('exports.pengumuman-pdf', ['data' => $data]);
        return $pdf->download('laporan-pengumuman-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN NOTIFIKASI
    public function exportNotifikasiExcel()
    {
        return Excel::download(new NotifikasiExport, 'laporan-notifikasi-' . date('Y-m-d') . '.xlsx');
    }

    public function exportNotifikasiPdf()
    {
        $data = Notification::with('user')->get();
        $pdf = Pdf::loadView('exports.notifikasi-pdf', ['data' => $data]);
        return $pdf->download('laporan-notifikasi-' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN SURVEY
    public function exportSurveyExcel()
    {
        return Excel::download(new SurveyExport, 'laporan-survey-' . date('Y-m-d') . '.xlsx');
    }

    public function exportSurveyPdf()
    {
        $data = Survey::with('questions')->get();
        $pdf = Pdf::loadView('exports.survey-pdf', ['data' => $data]);
        return $pdf->download('laporan-survey-' . date('Y-m-d') . '.pdf');
    }
}