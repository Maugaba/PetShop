<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = new ProductCategory();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->state = 1; // Estado activo por defecto
        $category->save();

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = ProductCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        return response()->json($category, 200);
    }

    public function changeStatus($id)
    {
        $category = ProductCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $category->state = !$category->state;
        $category->save();

        $message = $category->state ? 'Categoría activada' : 'Categoría desactivada';

        return response()->json(['message' => $message, 'category' => $category]);
    }
}
