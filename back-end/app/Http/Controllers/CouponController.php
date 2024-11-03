<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    // Mostrar todos los cupones
    public function index()
    {
        $coupons = Coupon::where('is_active', true)->get();
        return response()->json($coupons);
    }
    

    // Crear un nuevo cupón
    public function store(Request $request)
    {
        // Validar los datos del request
        $request->validate([
            'valid_from' => 'required|date',
            'valid_to' => 'required|date',
            'code' => 'required|string',
            'discount_amount' => 'required|numeric',
            'discount_type' => 'required|string|in:percentage,fixed', // Validación del tipo de descuento
        ]);

        // Crear el cupón con is_active en true (activo por defecto)
        $coupon = new Coupon();
        $coupon->code = $request->code;
        $coupon->discount_amount = $request->discount_amount;
        $coupon->discount_type = $request->discount_type;
        $coupon->valid_from = $request->valid_from;
        $coupon->valid_to = $request->valid_to;
        $coupon->is_active = true; // Establecer como activo al crearlo automáticamente

        // Manejo de excepciones para el guardado
        try {
            $coupon->save();
            return response()->json($coupon, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el cupón', 'error' => $e->getMessage()], 500);
        }
    }

    // Cambiar el estado de activo/inactivo de un cupón
    public function changeStatus($id)
    {
        $coupon = Coupon::find($id);

        if ($coupon) {
            $coupon->is_active = !$coupon->is_active; // Cambia el estado del cupón
            $coupon->save();
            return response()->json(['message' => 'Estado del cupón cambiado con éxito', 'coupon' => $coupon]);
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }

    // Editar un cupón existente
    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if ($coupon) {
            $request->validate([
                'valid_from' => 'required|date',
                'valid_to' => 'required|date',
                'code' => 'required|string',
                'discount_amount' => 'required|numeric',
                'discount_type' => 'required|string|in:percentage,fixed',
            ]);

            $coupon->code = $request->code;
            $coupon->discount_amount = $request->discount_amount;
            $coupon->discount_type = $request->discount_type;
            $coupon->valid_from = $request->valid_from;
            $coupon->valid_to = $request->valid_to;

            try {
                $coupon->save();
                return response()->json($coupon, 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Error al actualizar el cupón', 'error' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Cupón no encontrado'], 404);
        }
    }
}
