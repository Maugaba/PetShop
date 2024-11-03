<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function getCart(Request $request)
    {
        $user = $request->user();

        $cart = Cart::with('items.product')->where('user_id', $user->id)->where('state', 'active')->first();

        if (!$cart) {
            $cart = Cart::create([
                'user_id' => $user->id,
                'state' => 'active',
            ]);
        }

        return response()->json($cart->load('items.product'), 200);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id, 'state' => 'active'],
            ['user_id' => $user->id, 'state' => 'active']
        );

        $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'state' => 'in_cart',
            ]);
        }

        return response()->json(['message' => 'Producto agregado al carrito'], 200);
    }

    public function updateCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $cart = Cart::where('user_id', $user->id)->where('state', 'active')->first();

        if (!$cart) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json(['message' => 'Cantidad actualizada'], 200);
        } else {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user();

        $cart = Cart::where('user_id', $user->id)->where('state', 'active')->first();

        if (!$cart) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->delete();

            return response()->json(['message' => 'Producto eliminado del carrito'], 200);
        } else {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }
    }
}
