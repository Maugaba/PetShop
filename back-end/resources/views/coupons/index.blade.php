@extends('layouts.app')

@section('content')
    <h1>Cupones</h1>
    <a href="{{ route('coupons.create') }}">Crear Cupón</a>
    <ul>
        @foreach($coupons as $coupon)
            <li>
                <a href="{{ route('coupons.show', $coupon->id) }}">{{ $coupon->code }}</a>
                <a href="{{ route('coupons.edit', $coupon->id) }}">Editar</a>
                <form action="{{ route('coupons.destroy', $coupon->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Eliminar</button>
                </form>
            </li>
        @endforeach
    </ul>
@endsection
