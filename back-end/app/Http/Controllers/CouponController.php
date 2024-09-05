<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    // Mostrar todos los cupones
    public function index()
    {
        $coupons = Coupon::all();
        return response()->json($coupons);
    }

    // Crear un nuevo cupón
    public function store(Request $request)
    {
        $coupon = Coupon::create($request->all());
        return response()->json($coupon, 201);
    }

    // Cambiar el estado de activo/inactivo de un cupón
    public function changeStatus($id)
    {
        $coupon = Coupon::find($id);

        if ($coupon) {
            $coupon->active = !$coupon->active; // Cambia el estado del cupón
            $coupon->save();
            return response()->json(['message' => 'Estado del cupón cambiado con éxito', 'coupon' => $coupon]);
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }
}
