<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseCartTable extends Migration
{
    public function up()
    {
        Schema::create('purchase_cart', function (Blueprint $table) {
            $table->id('id_purchase_cart');
            $table->decimal('total', 10, 0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchase_cart');
    }
}
