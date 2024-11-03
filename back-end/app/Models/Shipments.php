<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipments extends Model
{
    protected $table = 'shipments';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'cart_id',
        'address',
        'city',
        'postal_code',
        'country',
        'state'
    ];
    // Relación con la categoría de producto
}
