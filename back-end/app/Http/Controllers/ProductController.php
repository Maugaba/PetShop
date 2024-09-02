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

    // Mostrar un producto específico por su ID
    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    // Actualizar un producto existente
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($request->all());
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Producto eliminado']);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }
}
