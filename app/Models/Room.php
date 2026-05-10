<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'room_type',
        'capacity',
        'current_occupancy',
        'price_per_month',
        'status',
        'facilities',
        'description'
    ];

    protected $casts = [
        'price_per_month' => 'decimal:2',
        'capacity' => 'integer',
        'current_occupancy' => 'integer'
    ];

    // Relasi ke RoomOccupancy
    public function occupancies()
    {
        return $this->hasMany(RoomOccupancy::class);
    }

    // Relasi ke penghuni aktif
    public function activeOccupants()
    {
        return $this->hasMany(RoomOccupancy::class)->where('status', 'active');
    }

    // Cek apakah kamar tersedia
    public function isAvailable()
    {
        return $this->status === 'available' && $this->current_occupancy < $this->capacity;
    }

    public function asrama()
    {
        return $this->belongsTo(Asrama::class);
    }

    // Status otomatis
    public function getStatusTextAttribute()
    {
        if ($this->current_occupancy >= $this->capacity) {
            return 'Penuh';
        }
        return 'Tersedia';
    }

    public function getStatusColorAttribute()
    {
        if ($this->current_occupancy >= $this->capacity) {
            return 'bg-red-500';
        }
        return 'bg-green-500';
    }
}