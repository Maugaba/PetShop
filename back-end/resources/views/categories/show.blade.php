@extends('layouts.app')

@section('content')
    <h1>Detalles de la Categoría</h1>
    <p><strong>Nombre:</strong> {{ $category->name }}</p>
    <p><strong>Descripción:</strong> {{ $category->description }}</p>
    <a href="{{ route('categories.edit', $category->id) }}">Editar Categoría</a>
    <form action="{{ route('categories.destroy', $category->id) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit">Eliminar Categoría</button>
    </form>
    <a href="{{ route('categories.index') }}">Volver a la lista de categorías</a>
@endsection
