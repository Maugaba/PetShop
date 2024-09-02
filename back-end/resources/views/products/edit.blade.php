@extends('layouts.app')

@section('content')
    <h1>Editar Producto</h1>
    <form action="{{ route('products.update', $product->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div>
            <label for="name">Nombre del Producto:</label>
            <input type="text" id="name" name="name" value="{{ $product->name }}" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description">{{ $product->description }}</textarea>
        </div>
        <div>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" value="{{ $product->price }}" step="0.01" required>
        </div>
        <button type="submit">Actualizar Producto</button>
    </form>
@endsection
