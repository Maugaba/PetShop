@extends('layouts.app')

@section('content')
    <h1>Crear Nuevo Producto</h1>
    <form action="{{ route('products.store') }}" method="POST">
        @csrf
        <div>
            <label for="name">Nombre del Producto:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description"></textarea>
        </div>
        <div>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" step="0.01" required>
        </div>
        <button type="submit">Guardar Producto</button>
    </form>
@endsection
