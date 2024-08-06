<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'role_id'
    ];

    public function getAuthPassword()
    {
        return $this->password;
    }

}