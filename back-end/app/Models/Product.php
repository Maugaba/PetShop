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
        'discount',
        'state',  // Asegúrate de incluir el campo de estado
        'product_categorie_id'
    ];

    // Relación con la categoría de producto
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_categorie_id');
    }
}
