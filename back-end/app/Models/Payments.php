<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $table = 'payments';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'cart_id',
        'payment_method',
        'transaction_id',
        'amount',
        'currency',
        'status'
    ];
    // Relación con la categoría de producto
}
