@extends('layouts.app')

@section('content')
    <h1>Detalles del Producto</h1>
    <p><strong>Nombre:</strong> {{ $product->name }}</p>
    <p><strong>Descripción:</strong> {{ $product->description }}</p>
    <p><strong>Precio:</strong> ${{ $product->price }}</p>
    <a href="{{ route('products.edit', $product->id) }}">Editar Producto</a>
    <form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit">Eliminar Producto</button>
    </form>
    <a href="{{ route('products.index') }}">Volver a la lista de productos</a>
@endsection
