@extends('layouts.app')

@section('content')
    <h1>Crear Nuevo Cupón</h1>
    <form action="{{ route('coupons.store') }}" method="POST">
        @csrf
        <div>
            <label for="code">Código del Cupón:</label>
            <input type="text" id="code" name="code" required>
        </div>
        <div>
            <label for="discount_amount">Monto de Descuento:</label>
            <input type="number" id="discount_amount" name="discount_amount" step="0.01" required>
        </div>
        <div>
            <label for="discount_type">Tipo de Descuento:</label>
            <select id="discount_type" name="discount_type" required>
                <option value="percentage">Porcentaje</option>
                <option value="fixed">Fijo</option>
            </select>
        </div>
        <div>
            <label for="valid_from">Válido Desde:</label>
            <input type="date" id="valid_from" name="valid_from" required>
        </div>
        <div>
            <label for="valid_to">Válido Hasta:</label>
            <input type="date" id="valid_to" name="valid_to" required>
        </div>
        <div>
            <label for="is_active">¿Está Activo?</label>
            <input type="checkbox" id="is_active" name="is_active">
        </div>
        <button type="submit">Guardar Cupón</button>
    </form>
@endsection
