<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asrama extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code', 'address'];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}