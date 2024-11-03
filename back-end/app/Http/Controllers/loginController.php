<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class loginController extends Controller
{
    // Iniciar sesión
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            $credentials = $request->only('email', 'password');
    
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                $_SESSION['id_user'] = $user->id;
                $response = [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role_id' => $user->role_id,
                    'name' => $user->name,
                    'token' => $token,
                ];
    
                return response()->json($response, 200);
            }
    
            return response()->json(['error' => 'Correo o contraseña incorrectos'], 401);
    
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error de base de datos', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error inesperado', 'error' => $e->getMessage()], 500);
        }
    }
    

    // Cerrar sesión
    public function logout(Request $request)
    {
        try {
            if (Auth::check()) {
                Auth::logout();
                Session::flush();
                return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
            } else {
                return response()->json(['error' => 'No hay usuario autenticado'], 401);
            }
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Error al cerrar sesión: ' . $e->getMessage()], 500);
        }
    }

    // Cerrar sesión de cliente
    public function clientlogout(Request $request)
    {
        Auth::logout();
        Session::flush();
        return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
    }

    // Obtener todos los usuarios (clientes)
    public function getUsers()
    {
        try {
            // Filtramos solo los clientes por su role_id (2 en este caso)
            $users = Users::where('role_id', 2)->get();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener usuarios', 'error' => $e->getMessage()], 500);
        }
    }

    // Registrar un cliente
    public function client_register(Request $request)
    {
        try {
            // Validar los datos del request
            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string|max:15',
                'address' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);

            // Crear un nuevo cliente
            $usuario = new Users();
            $usuario->name = $request->name;
            $usuario->phone = $request->phone;
            $usuario->address = $request->address;
            $usuario->email = $request->email;
            $usuario->password = Hash::make($request->password); // Usar Hash para la contraseña
            $usuario->role_id = 2; // Rol de cliente
            $usuario->state = true; // Estado activo por defecto al crear el usuario
            $usuario->save();

            return response()->json(['success' => 'Cliente creado correctamente', 'usuario' => $usuario], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error de base de datos al crear el cliente', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error inesperado al crear el cliente', 'error' => $e->getMessage()], 500);
        }
    }

    // Registrar un usuario administrativo
    public function user_register(Request $request)
    {
        try {
            // Validar los datos del request
            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string|max:15',
                'address' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

            // Crear un nuevo usuario administrativo
            $usuario = new Users();
            $usuario->name = $request->name;
            $usuario->phone = $request->phone;
            $usuario->address = $request->address;
            $usuario->email = $request->email;
            $usuario->password = Hash::make($request->password); // Usar Hash para la contraseña
            $usuario->role_id = 1; // Rol de administrador
            $usuario->state = true; // Estado activo por defecto al crear el usuario
            $usuario->save();

            return response()->json(['success' => 'Usuario administrativo creado correctamente', 'usuario' => $usuario], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error de base de datos al crear el usuario administrativo', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error inesperado al crear el usuario administrativo', 'error' => $e->getMessage()], 500);
        }
    }

    // Actualizar un usuario existente
    public function update(Request $request, $id)
{
    try {
        \Log::info('Datos recibidos para la actualización:', $request->all());

        // Encuentra el usuario por ID
        $usuario = Users::find($id);

        if (!$usuario) {
            \Log::error("Usuario con ID {$id} no encontrado");
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Validación de los datos recibidos
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$usuario->id,
            'password' => 'nullable|string|min:8',  // La contraseña es opcional
        ]);

        // Actualiza los datos del usuario
        $usuario->name = $request->name;
        $usuario->phone = $request->phone;
        $usuario->address = $request->address;
        $usuario->email = $request->email;

        // Solo actualiza la contraseña si se proporciona
        if ($request->filled('password')) {
            $usuario->password = Hash::make($request->password);
            \Log::info('Contraseña actualizada para el usuario');
        }

        // Guarda los cambios en la base de datos
        if ($usuario->save()) {
            \Log::info('Usuario actualizado exitosamente:', ['usuario' => $usuario]);
            return response()->json(['success' => 'Usuario actualizado correctamente', 'usuario' => $usuario], 200);
        } else {
            \Log::error('Error al guardar el usuario');
            return response()->json(['message' => 'Error al guardar el usuario'], 500);
        }

    } catch (\Illuminate\Database\QueryException $e) {
        \Log::error('Error de base de datos al actualizar el usuario', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Error de base de datos', 'error' => $e->getMessage()], 500);
    } catch (\Exception $e) {
        \Log::error('Error inesperado al actualizar el usuario', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Error inesperado al actualizar el usuario', 'error' => $e->getMessage()], 500);
    }
}


    // Cambiar el estado activo/inactivo de un usuario
    public function changeStatus($id)
    {
        try {
            $usuario = Users::find($id);

            if (!$usuario) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            // Cambiar el estado de activo/inactivo
            $usuario->state = !$usuario->state;
            $usuario->save();

            \Log::info("Estado del usuario {$id} cambiado a: " . ($usuario->state ? 'activo' : 'inactivo')); // Agregar log para ver si se ejecuta
            
            return response()->json(['message' => 'Estado del usuario cambiado con éxito', 'usuario' => $usuario], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado del usuario', 'error' => $e->getMessage()], 500);
        }
    }

}
