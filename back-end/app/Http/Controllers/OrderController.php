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

class orderController extends Controller
{
    // Store data
    public function store(Request $request)
    {
        try{
            DB::beginTransaction();
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
                    throw new \Exception('No hay suficiente stock para el producto: ' . $product->name);
                }
                //Actualizar stock
                $product->stock = $product->stock - $cart['quantity'];
                $product->save();

            }


            $Payments = new Payments();
            $Payments->cart_id = $Purchase_Cart->id;
            $Payments->payment_method = $request->paymentMethod;
            $Payments->transaction_id = $request->transactionNumber;
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
    
}
