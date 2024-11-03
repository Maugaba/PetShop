<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase_Cart extends Model
{
    protected $table = 'purchase_cart';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'total'
    ];
    // Relación con la categoría de producto
}
