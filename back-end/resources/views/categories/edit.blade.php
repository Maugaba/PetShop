@extends('layouts.app')

@section('content')
    <h1>Editar Categoría</h1>
    <form action="{{ route('categories.update', $category->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div>
            <label for="name">Nombre de la Categoría:</label>
            <input type="text" id="name" name="name" value="{{ $category->name }}" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description">{{ $category->description }}</textarea>
        </div>
        <button type="submit">Actualizar Categoría</button>
    </form>
@endsection
