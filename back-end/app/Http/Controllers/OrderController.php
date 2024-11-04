<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Payments;
use App\Models\Shipments;
use App\Models\ShipmentsTracking;
use App\Models\Purchase_Cart;
use App\Models\Purchase_Cart_detail;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{
    // Store data
    public function store(Request $request)
    {
        try{
            DB::beginTransaction();
            $Transaccion_id = "";
            if($request->paymentMethod == "Pago Contra Entrega"){
                //CTE mas un numero al azar
                $Transaccion_id = "CTE".rand(1000,9999);
            }else{
                $Transaccion_id = $request->transactionNumber;
            }
            $Purchase_Cart = new Purchase_Cart();
            $Purchase_Cart->total = $request->total;
            $Purchase_Cart->save();

            foreach ($request->cart as $cart) {
                $Purchase_Cart_detail = new Purchase_Cart_detail();
                $Purchase_Cart_detail->id_product = $cart['id'];
                $Purchase_Cart_detail->name = $cart['name'];
                $Purchase_Cart_detail->price = $cart['price'];
                $Purchase_Cart_detail->quantity = $cart['quantity'];
                $Purchase_Cart_detail->id_purchase_cart = $Purchase_Cart->id;
                $Purchase_Cart_detail->save();


                //Verificar stock antes de actualizar
                $product = Product::where('id', $cart['id'])->first();
                if($product->stock < $cart['quantity']){
                    return response()->json(['message' => 'No hay suficiente stock para el producto '.$product->name], 500);
                }
                //Actualizar stock
                $product->stock = $product->stock - $cart['quantity'];
                $product->save();

            }


            $Payments = new Payments();
            $Payments->cart_id = $Purchase_Cart->id;
            $Payments->payment_method = $request->paymentMethod;
            $Payments->transaction_id = $Transaccion_id;
            $Payments->amount = $request->total;
            if($request->paymentMethod == 'paypal'){
                $Payments->currency = 'USD';
            }else{
                $Payments->currency = 'GTQ';
            }
            $Payments->status = 'Aprobado';
            $Payments->user_id = $request->user()->id;
            $Payments->save();

            $Shipments = new Shipments();
            $Shipments->cart_id = $Purchase_Cart->id;
            $Shipments->address = $request->address;
            $Shipments->city = $request->state;
            $Shipments->postal_code = $request->zip;
            $Shipments->country = $request->country;
            $Shipments->state = 0;
            $Shipments->user_id = $request->user()->id;
            $Shipments->save();

            $ShipmentsTracking = new ShipmentsTracking();
            $ShipmentsTracking->shipment_id = $Shipments->id;
            //Generar numero al azar del shipmen id que empiece con PETSHOP
            $ShipmentsTracking->tracking_number = 'PETSHOP'.rand(1000,9999);
            $ShipmentsTracking->status = 'Pendiente de Recolectar';
            $ShipmentsTracking->update_details = 'El pedido ha sido enviado';
            $ShipmentsTracking->user_id = $request->user()->id;
            $ShipmentsTracking->save();


            //BORRAR CARRITO ANTERIOR
            $cart_items = CartItem::where('cart_id', $request->cart_id)->get();
            foreach ($cart_items as $cart_item) {
                $cart_item->delete();
            }
            $cart = Cart::where('id', $request->cart_id)->first();
            $cart->delete();

            

            DB::commit();
            return response()->json(['message' => 'Orden creada correctamente'], 200);
        }
        catch(\Exception $e){
            DB::rollBack();
            return response()->json(['message' => $e], 500);
        }
    }

    public function getAllOrders()
    {
        // Obtener todos los registros de ShipmentsTracking con su relación a Shipments
        $trackingRecords = ShipmentsTracking::with('shipment')->get();
    
        // Crear un array para almacenar los datos completos de cada pedido
        $orders = $trackingRecords->map(function($tracking) {
            return [
                'tracking_number' => $tracking->tracking_number,
                'status' => $tracking->status,
                'update_details' => $tracking->update_details,
                'updated_at' => $tracking->updated_at,
                'shipment' => $tracking->shipment ? [
                    'address' => $tracking->shipment->address,
                    'city' => $tracking->shipment->city,
                    'postal_code' => $tracking->shipment->postal_code,
                    'country' => $tracking->shipment->country,
                    'state' => $tracking->shipment->state,
                    'created_at' => $tracking->shipment->created_at,
                ] : null,
            ];
        });
    
        return response()->json($orders, 200);
    }
    

    public function get_orders(){
        $Payments = Payments::where('user_id', Auth::user()->id)->get();
        $Shipments = Shipments::where('user_id', Auth::user()->id)->get();
        $ShipmentsTracking = ShipmentsTracking::where('user_id', Auth::user()->id)->get();
        $Data = [
            'Payments' => $Payments,
            'Shipments' => $Shipments,
            'ShipmentsTracking' => $ShipmentsTracking
        ];
        return response()->json($Data, 200);
    }
   
   
    public function trackOrder($trackingNumber)
    {
        $tracking = ShipmentsTracking::where('tracking_number', $trackingNumber)->first();
    
        if (!$tracking) {
            return response()->json(['error' => 'No se pudo encontrar el pedido. Verifique el número de guía.'], 404);
        }
    
        $shipment = Shipments::where('id', $tracking->shipment_id)->first();
    
        if (!$shipment) {
            return response()->json(['error' => 'No se pudo encontrar el envío asociado.'], 404);
        }
    
        $payment = Payments::where('cart_id', $shipment->cart_id)->first();
    
        // Estructurar la respuesta con los datos necesarios
        $orderDetails = [
            'tracking' => [
                'tracking_number' => $tracking->tracking_number,
                'status' => $tracking->status,
                'update_details' => $tracking->update_details,
                'updated_at' => $tracking->updated_at
            ],
            'shipment' => [
                'address' => $shipment->address,
                'city' => $shipment->city,
                'postal_code' => $shipment->postal_code,
                'country' => $shipment->country,
                'state' => $shipment->state,
                'created_at' => $shipment->created_at
            ],
            'payment' => $payment ? [
                'payment_method' => $payment->payment_method,
                'amount' => $payment->amount,
                'status' => $payment->status,
                'currency' => $payment->currency,
                'transaction_id' => $payment->transaction_id
            ] : null
        ];
    
        return response()->json($orderDetails, 200);
    }

    public function updateStatus(Request $request, $trackingNumber)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $tracking = ShipmentsTracking::where('tracking_number', $trackingNumber)->first();

        if (!$tracking) {
            return response()->json(['error' => 'Pedido no encontrado'], 404);
        }

        $tracking->status = $request->status;
        $tracking->update_details = 'Estado actualizado a ' . $request->status;
        $tracking->save();

        return response()->json([
            'message' => 'Estado del pedido actualizado exitosamente',
            'order' => $tracking
        ], 200);
    }
    public function cancelOrder($id)
    {
        try {
            DB::beginTransaction();

            $tracking = ShipmentsTracking::where('tracking_number', $id)->first();

            if (!$tracking) {
                return response()->json(['error' => 'Pedido no encontrado'], 404);
            }
            $tracking->delete();

            DB::commit();

            return response()->json(['message' => 'Pedido cancelado exitosamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al cancelar el pedido', 'message' => $e->getMessage()], 500);
        }
    }
}
