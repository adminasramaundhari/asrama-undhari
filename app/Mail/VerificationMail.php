<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $status;
    public $note;

    public function __construct(User $user, $status, $note = null)
    {
        $this->user = $user;
        $this->status = $status;
        $this->note = $note;
    }

    public function envelope(): Envelope
    {
        $subject = $this->status === 'approved' 
            ? 'Akun Anda telah diverifikasi' 
            : 'Akun Anda ditolak';

        return new Envelope(
            subject: $subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.verification',
        );
    }
}