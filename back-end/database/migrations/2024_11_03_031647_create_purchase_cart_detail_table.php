<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseCartDetailTable extends Migration
{
    public function up()
    {
        Schema::create('purchase_cart_detail', function (Blueprint $table) {
            $table->id('idpurchase_cart_detail');
            $table->integer('id_product');
            $table->string('name', 100);
            $table->decimal('price', 10, 0);
            $table->integer('quantity');
            $table->integer('id_purchase_cart');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchase_cart_detail');
    }
}
