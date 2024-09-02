@extends('layouts.app')

@section('content')
    <h1>Crear Nueva Categoría</h1>
    <form action="{{ route('categories.store') }}" method="POST">
        @csrf
        <div>
            <label for="name">Nombre de la Categoría:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description"></textarea>
        </div>
        <button type="submit">Guardar Categoría</button>
    </form>
@endsection
