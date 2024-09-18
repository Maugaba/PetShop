<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'product_categories';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'name', 
        'description',
        'state'
    ];

    // Relación con productos
    public function products()
    {
        return $this->hasMany(Product::class, 'product_categorie_id'); 
    }
}
