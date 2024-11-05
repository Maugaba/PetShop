<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    // Mostrar todos los productos
    public function index()
    {
        $products = Product::all();
        foreach ($products as $product) {
            $product_category_name = ProductCategory::find($product->product_categorie_id);
            $product->product_category = $product_category_name->name;
            
            // Calcular el precio final con descuento si aplica
            if ($product->discount) {
                if ($product->discount_type === 'percentage') {
                    $product->final_price = $product->price * (1 - $product->discount / 100);
                } else if ($product->discount_type === 'fixed') {
                    $product->final_price = $product->price - $product->discount;
                }
            } else {
                $product->final_price = $product->price;
            }
        }
        return response()->json($products);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $images = $request->file('images'); // Obtener las imágenes del request como archivos
        $videos = $request->file('videos'); // Obtener los videos del request como archivos

        $imageNames = []; // Inicializar un array para guardar los nombres de las imágenes
        $videoNames = []; // Inicializar un array para guardar los nombres de los videos
        $imagesConcatenated = ''; // Inicializar una cadena para concatenar los nombres de las imágenes
        $videosConcatenated = ''; // Inicializar una cadena para concatenar los nombres de los videos

        // Verificar si hay imágenes y si es un array
        if ($images && is_array($images)) {
            // Recorrer cada imagen del array
            foreach ($images as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName); // Mover la imagen a la carpeta de destino
                $imageNames[] = $imageName; // Agregar el nombre de la imagen al array
            }

            // Concatenar los nombres de las imágenes en una cadena separada por comas
            $imagesConcatenated = implode(',', $imageNames);
        }

        // Verificar si hay videos y si es un array
        if ($videos && is_array($videos)) {
            // Recorrer cada video del array
            foreach ($videos as $video) {
                $videoName = time() . '_' . uniqid() . '.' . $video->getClientOriginalExtension();
                $video->move(public_path('videos'), $videoName); // Mover el video a la carpeta de destino
                $videoNames[] = $videoName; // Agregar el nombre del video al array
            }

            // Concatenar los nombres de los videos en una cadena separada por comas
            $videosConcatenated = implode(',', $videoNames);
        }

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->images = $imagesConcatenated; // Guardar la cadena de nombres de imágenes
        $product->videos = $videosConcatenated; // Guardar la cadena de nombres de videos
        $product->specifications = $request->specifications;
        $product->price = $request->price;
        if ($request->discount) {
            $product->discount = $request->discount;
        }
        $product->stock = $request->stock;
        $product->state = 1; // Por defecto, el producto se crea activo
        $product->product_categorie_id = $request->category;
        $product->save();

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

     // Editar un producto existente
     public function update(Request $request, $id)
     {
         $product = Product::find($id);
 
         if ($product) {
             $images = $request->file('images');
             $videos = $request->file('videos');
 
             $imageNames = [];
             $videoNames = [];
             $imagesConcatenated = '';
             $videosConcatenated = '';
 
             if ($images && is_array($images)) {
                 foreach ($images as $image) {
                     $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                     $image->move(public_path('images'), $imageName);
                     $imageNames[] = $imageName;
                 }
                 $imagesConcatenated = implode(',', $imageNames);
             }
 
             if ($videos && is_array($videos)) {
                 foreach ($videos as $video) {
                     $videoName = time() . '_' . uniqid() . '.' . $video->getClientOriginalExtension();
                     $video->move(public_path('videos'), $videoName);
                     $videoNames[] = $videoName;
                 }
                 $videosConcatenated = implode(',', $videoNames);
             }
 
             $product->name = $request->name;
             $product->description = $request->description;
             if ($imagesConcatenated) {
                 $product->images = $imagesConcatenated;
             }
             if ($videosConcatenated) {
                 $product->videos = $videosConcatenated;
             }
             $product->specifications = $request->specifications;
             $product->price = $request->price;
             $product->discount = $request->discount;
             $product->stock = $request->stock;
             $product->product_categorie_id = $request->category; // Aseguramos que el campo sea correcto
             $product->save();
 
             return response()->json($product, 200);
         } else {
             return response()->json(['message' => 'Producto no encontrado'], 404);
         }
     }
}
