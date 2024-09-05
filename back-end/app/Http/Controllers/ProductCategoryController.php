<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;

class ProductCategoryController extends Controller
{
    // Mostrar todas las categorías de productos
    public function index()
    {
        $categories = ProductCategory::all();
        return response()->json($categories);
    }

    // Crear una nueva categoría de producto
    public function store(Request $request)
    {
        $category = ProductCategory::create($request->all());
        return response()->json($category, 201);
    }
}
