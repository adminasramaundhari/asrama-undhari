<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\PenghuniController;
use App\Http\Controllers\Admin\ComplaintController as AdminComplaintController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\NotificationController as AdminNotificationController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Admin\SurveyController;
use App\Http\Controllers\Mahasiswa\ComplaintController as MahasiswaComplaintController;
use App\Http\Controllers\Mahasiswa\AnnouncementController as MahasiswaAnnouncementController;
use App\Http\Controllers\Mahasiswa\PaymentController as MahasiswaPaymentController;
use App\Http\Controllers\Mahasiswa\NotificationController as MahasiswaNotificationController;
use App\Http\Controllers\Mahasiswa\SurveyController as MahasiswaSurveyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Admin\VerifikasiController;
use App\Http\Controllers\Admin\AsramaController;

// Landing Page (Publik)
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/galeri', [GalleryController::class, 'publicIndex'])->name('galeri');
Route::get('/pengumuman/{announcement}', [HomeController::class, 'showAnnouncement'])->name('pengumuman.show');
Route::get('/search', [SearchController::class, 'search'])->middleware('auth')->name('search');

// Profil Landing Page
Route::get('/profil/identitas', function () { return inertia('Profil/Identitas'); })->name('profil.identitas');
Route::get('/profil/struktur', function () { return inertia('Profil/Struktur'); })->name('profil.struktur');
Route::get('/profil/sejarah', function () { return inertia('Profil/Sejarah'); })->name('profil.sejarah');
Route::get('/profil/visi-misi', function () { return inertia('Profil/VisiMisi'); })->name('profil.visi-misi');

// Guest Routes (Login Required)
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
   
    // ============ RUTE ADMIN ============
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('rooms', RoomController::class);
        Route::resource('penghuni', PenghuniController::class);
        Route::post('penghuni/{penghuni}/assign-room', [PenghuniController::class, 'assignRoom'])->name('penghuni.assign-room');
        Route::post('penghuni/import', [PenghuniController::class, 'import'])->name('penghuni.import');
        Route::resource('complaints', AdminComplaintController::class);
        Route::resource('announcements', AdminAnnouncementController::class);
        Route::resource('payments', AdminPaymentController::class);
        Route::post('payments/{payment}/verify-proof', [AdminPaymentController::class, 'verifyProof'])->name('payments.verify-proof');
        Route::resource('notifications', AdminNotificationController::class);
        Route::resource('gallery', GalleryController::class);
        Route::resource('surveys', SurveyController::class);
        
        Route::prefix('laporan')->name('laporan.')->group(function () {
            Route::get('/', [LaporanController::class, 'index'])->name('index');
            Route::get('penghuni-excel', [LaporanController::class, 'exportPenghuniExcel'])->name('penghuni.excel');
            Route::get('penghuni-pdf', [LaporanController::class, 'exportPenghuniPdf'])->name('penghuni.pdf');
            Route::get('pembayaran-excel', [LaporanController::class, 'exportPembayaranExcel'])->name('pembayaran.excel');
            Route::get('pembayaran-pdf', [LaporanController::class, 'exportPembayaranPdf'])->name('pembayaran.pdf');
        });

        Route::prefix('verifikasi')->name('verifikasi.')->group(function () {
            Route::get('/', [VerifikasiController::class, 'index'])->name('index');
            Route::post('/{id}/verify', [VerifikasiController::class, 'verify'])->name('verify');
            Route::post('/{id}/reject', [VerifikasiController::class, 'reject'])->name('reject');
            Route::delete('/{id}/destroy', [VerifikasiController::class, 'destroy'])->name('destroy');
        });

        Route::resource('asramas', AsramaController::class);

        // Rute laporan
        Route::prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('penghuni-excel', [LaporanController::class, 'exportPenghuniExcel'])->name('penghuni.excel');
        Route::get('penghuni-pdf', [LaporanController::class, 'exportPenghuniPdf'])->name('penghuni.pdf');
        Route::get('pembayaran-excel', [LaporanController::class, 'exportPembayaranExcel'])->name('pembayaran.excel');
        Route::get('pembayaran-pdf', [LaporanController::class, 'exportPembayaranPdf'])->name('pembayaran.pdf');
        Route::get('kamar-excel', [LaporanController::class, 'exportKamarExcel'])->name('kamar.excel');
        Route::get('kamar-pdf', [LaporanController::class, 'exportKamarPdf'])->name('kamar.pdf');
        Route::get('asrama-excel', [LaporanController::class, 'exportAsramaExcel'])->name('asrama.excel');
        Route::get('asrama-pdf', [LaporanController::class, 'exportAsramaPdf'])->name('asrama.pdf');
        Route::get('pengaduan-excel', [LaporanController::class, 'exportPengaduanExcel'])->name('pengaduan.excel');
        Route::get('pengaduan-pdf', [LaporanController::class, 'exportPengaduanPdf'])->name('pengaduan.pdf');
        Route::get('pengumuman-excel', [LaporanController::class, 'exportPengumumanExcel'])->name('pengumuman.excel');
        Route::get('pengumuman-pdf', [LaporanController::class, 'exportPengumumanPdf'])->name('pengumuman.pdf');
        Route::get('notifikasi-excel', [LaporanController::class, 'exportNotifikasiExcel'])->name('notifikasi.excel');
        Route::get('notifikasi-pdf', [LaporanController::class, 'exportNotifikasiPdf'])->name('notifikasi.pdf');
        Route::get('survey-excel', [LaporanController::class, 'exportSurveyExcel'])->name('survey.excel');
        Route::get('survey-pdf', [LaporanController::class, 'exportSurveyPdf'])->name('survey.pdf');
        Route::get('activity-log-excel', [LaporanController::class, 'exportActivityLogExcel'])->name('activity-log.excel');
        Route::get('activity-log-pdf', [LaporanController::class, 'exportActivityLogPdf'])->name('activity-log.pdf');
        });
    });
    
    // ============ RUTE MAHASISWA ============
    Route::middleware(['role:mahasiswa'])->prefix('mahasiswa')->name('mahasiswa.')->group(function () {
        
        Route::get('/dashboard', function () { return inertia('Mahasiswa/Dashboard'); })->name('dashboard');
        
        Route::get('/galeri', [GalleryController::class, 'mahasiswaIndex'])->name('galeri');
        
        Route::resource('complaints', MahasiswaComplaintController::class)->except(['edit', 'update', 'destroy']);

        Route::resource('announcements', MahasiswaAnnouncementController::class)->only(['index', 'show']);
        
        Route::resource('payments', MahasiswaPaymentController::class)->only(['index', 'show']);
        Route::post('payments/{payment}/upload-proof', [MahasiswaPaymentController::class, 'uploadProof'])->name('payments.upload-proof');

        Route::get('notifications', [MahasiswaNotificationController::class, 'index'])->name('notifications.index');
        Route::post('notifications/{notification}/mark-read', [MahasiswaNotificationController::class, 'markAsRead'])->name('notifications.mark-read');
        Route::post('notifications/mark-all-read', [MahasiswaNotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
        
        // ============ SURVEY MAHASISWA ============
        Route::get('/surveys', [MahasiswaSurveyController::class, 'index'])->name('surveys.index');
        Route::get('/surveys/{survey}', [MahasiswaSurveyController::class, 'show'])->name('surveys.show');
        Route::post('/surveys/{survey}', [MahasiswaSurveyController::class, 'store'])->name('surveys.store');
    });
});

Route::get('/register/waiting', function () {
    return inertia('Auth/WaitingVerification');
})->name('register.waiting');

require __DIR__.'/auth.php';