<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->integer('cart_id'); // ID del carrito al que pertenece el pago
            $table->string('payment_method'); // 'stripe', 'paypal', 'bank_transfer'
            $table->string('transaction_id')->nullable(); // ID de la transacción proporcionado por el proveedor de pagos
            $table->decimal('amount', 8, 2); // Monto del pago
            $table->string('currency')->default('QTZ'); // Moneda del pago
            $table->integer('user_id'); // ID del usuario que realizó el pago
            $table->string('status')->default('pending'); // Estado del pago: 'pending', 'completed', 'failed'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
