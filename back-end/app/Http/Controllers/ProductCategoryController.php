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

    // Mostrar una categoría específica por su ID
    public function show($id)
    {
        $category = ProductCategory::find($id);
        if ($category) {
            return response()->json($category);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }

    // Crear una nueva categoría de producto
    public function store(Request $request)
    {
        $category = ProductCategory::create($request->all());
        return response()->json($category, 201);
    }

    // Actualizar una categoría existente
    public function update(Request $request, $id)
    {
        $category = ProductCategory::find($id);
        if ($category) {
            $category->update($request->all());
            return response()->json($category);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }

    // Eliminar una categoría de producto
    public function destroy($id)
    {
        $category = ProductCategory::find($id);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'Categoría eliminada']);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }
}
