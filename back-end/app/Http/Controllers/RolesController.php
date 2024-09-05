<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\roles;  // Usa el modelo correcto, 'roles' en este caso.

class RolesController extends Controller
{
    // Obtener todos los roles
    public function index()
    {
        $roles = roles::all();
        return response()->json($roles);
    }

    // Crear un nuevo rol
    public function store(Request $request)
    {
        // Validación de datos
        $validatedData = $request->validate([
            'role_name' => 'required|string|max:255',
        ]);

        // Crear el rol con los datos validados
        $role = roles::create($validatedData);

        return response()->json($role, 201);
    }
}
