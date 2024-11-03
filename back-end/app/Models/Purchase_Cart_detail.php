<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase_Cart_detail extends Model
{
    protected $table = 'purchase_cart_detail';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'id_product',
        'name',
        'price',
        'quantity',
        'id_purchase_cart'
    ];
    // Relación con la categoría de producto
}