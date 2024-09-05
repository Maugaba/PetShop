<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Mostrar todos los productos
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Crear un nuevo producto
    public function store(Request $request)
{
    // Validación de datos
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'images' => 'nullable|string',
        'videos' => 'nullable|string',
        'specifications' => 'nullable|string',
        'stock' => 'required|integer',
        'price' => 'required|numeric',
        'state' => 'required|integer|in:0,1',  // Verifica que state sea 0 o 1
        'product_categorie_id' => 'required|exists:product_categories,id',
    ]);

    // Crear el producto con los datos validados
    $product = Product::create($validatedData);

    return response()->json($product, 201);
}
    // Cambiar el estado de activo a inactivo
    public function changeStatus($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->state = !$product->state; // Cambia el estado del producto (1 o 0)
            $product->save();
            return response()->json(['message' => 'Estado cambiado con éxito', 'product' => $product]);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }
}
