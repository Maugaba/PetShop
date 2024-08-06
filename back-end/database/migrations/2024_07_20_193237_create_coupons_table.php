<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->decimal('discount_amount', 10, 2); // Monto del descuento
            $table->enum('discount_type', ['percentage', 'fixed']); // Tipo de descuento
            $table->dateTime('valid_from'); // Fecha de inicio de validez
            $table->dateTime('valid_to'); // Fecha de fin de validez
            $table->boolean('is_active')->default(true); // Estado del cupón
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
        Schema::dropIfExists('coupons');
    }
}
