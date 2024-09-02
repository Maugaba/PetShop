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

    // Mostrar un cupón específico por su ID
    public function show($id)
    {
        $coupon = Coupon::find($id);
        if ($coupon) {
            return response()->json($coupon);
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }

    // Crear un nuevo cupón
    public function store(Request $request)
    {
        $coupon = Coupon::create($request->all());
        return response()->json($coupon, 201);
    }

    // Actualizar un cupón existente
    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);
        if ($coupon) {
            $coupon->update($request->all());
            return response()->json($coupon);
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }

    // Eliminar un cupón
    public function destroy($id)
    {
        $coupon = Coupon::find($id);
        if ($coupon) {
            $coupon->delete();
            return response()->json(['message' => 'Cupón eliminado']);
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }
}
