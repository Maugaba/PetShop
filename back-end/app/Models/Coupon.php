<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupons';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'code', 
        'discount_amount', 
        'discount_type', 
        'valid_from', 
        'valid_to', 
        'is_active'
    ];

    // Agregar cualquier relación si es necesario, por ejemplo, con 'orders'
}
