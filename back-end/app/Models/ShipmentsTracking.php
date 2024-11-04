<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShipmentsTracking extends Model
{
    protected $table = 'shipment_tracking';

    // Definir los campos que pueden ser asignados en masa
    protected $fillable = [
        'shipment_id',
        'tracking_number',
        'status',
        'update_details'
    ];
    public function shipment()
    {
        return $this->belongsTo(Shipments::class, 'shipment_id');
    }
}
