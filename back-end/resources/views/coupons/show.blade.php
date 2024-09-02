@extends('layouts.app')

@section('content')
    <h1>Detalles del Cupón</h1>
    <p><strong>Código:</strong> {{ $coupon->code }}</p>
    <p><strong>Monto de Descuento:</strong> ${{ $coupon->discount_amount }}</p>
    <p><strong>Tipo de Descuento:</strong> {{ $coupon->discount_type == 'percentage' ? 'Porcentaje' : 'Fijo' }}</p>
    <p><strong>Válido Desde:</strong> {{ $coupon->valid_from }}</p>
    <p><strong>Válido Hasta:</strong> {{ $coupon->valid_to }}</p>
    <p><strong>Estado:</strong> {{ $coupon->is_active ? 'Activo' : 'Inactivo' }}</p>
    <a href="{{ route('coupons.edit', $coupon->id) }}">Editar Cupón</a>
    <form action="{{ route('coupons.destroy', $coupon->id) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit">Eliminar Cupón</button>
    </form>
    <a href="{{ route('coupons.index') }}">Volver a la lista de cupones</a>
@endsection
