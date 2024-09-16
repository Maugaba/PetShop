<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;

class ProductCategoryController extends Controller
{
    // Mostrar todas las categorías de productos
    public function index()
    {
        // Obtener todas las categorías
        $categories = ProductCategory::all();
        return response()->json($categories);
    }

    // Crear una nueva categoría de producto
    public function store(Request $request)
    {
        // Validar los datos entrantes
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Crear una nueva categoría
        $category = new ProductCategory();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        return response()->json($category, 201);
    }

    // Editar una categoría de producto existente
    public function update(Request $request, $id)
    {
        // Validar los datos entrantes
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Buscar la categoría por ID y actualizarla
        $category = ProductCategory::find($id);

        if ($category) {
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save(); // Guardar los cambios en la base de datos

            return response()->json($category, 200);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }

    // Cambiar el estado de activo/inactivo de una categoría
    public function changeStatus($id)
    {
        // Buscar la categoría por ID
        $category = ProductCategory::find($id);

        if ($category) {
            // Cambiar el estado activo/inactivo
            $category->state = !$category->state;
            $category->save();

            return response()->json(['message' => 'Estado de la categoría cambiado con éxito', 'category' => $category]);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }
}
