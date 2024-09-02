<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'name', 
        'description', 
        'images', 
        'videos', 
        'specifications', 
        'stock', 
        'price', 
        'status', 
        'product_category_id'
    ];

    // Relación con la categoría de producto
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    // Definir cualquier otra relación que pueda existir, por ejemplo, con 'orders' o 'carts'
}
