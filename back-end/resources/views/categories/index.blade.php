@extends('layouts.app')

@section('content')
    <h1>Categorías de Productos</h1>
    <a href="{{ route('categories.create') }}">Crear Categoría</a>
    <ul>
        @foreach($categories as $category)
            <li>
                <a href="{{ route('categories.show', $category->id) }}">{{ $category->name }}</a>
                <a href="{{ route('categories.edit', $category->id) }}">Editar</a>
                <form action="{{ route('categories.destroy', $category->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Eliminar</button>
                </form>
            </li>
        @endforeach
    </ul>
@endsection
