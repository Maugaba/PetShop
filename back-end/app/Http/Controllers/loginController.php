<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuarios;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Session;

class loginController extends Controller
{
    public function login(Request $request)
    {
        try {
            // Validar las credenciales
            $this->validate($request, [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $response = [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role_id' => $user->role_id,
                ];
                if ($user->role_id == 1) {
                    $token = $user->createToken('token-name')->plainTextToken;
                    $response['token'] = $token;
                }
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


    public function logout(Request $request)
    {
        try {
            // Verificar si el usuario está autenticado
            $user = $request->user();
            
            if ($user) {
                // Revocar todos los tokens del usuario
                $user->tokens()->delete();

                // No necesitas llamar a Auth::logout() ya que estás trabajando con tokens
                return response()->json([
                    'message' => 'Sesión cerrada correctamente'
                ], 200);
            } else {
                return response()->json([
                    'error' => 'No hay usuario autenticado'
                ], 401);
            }
        } catch (\Throwable $e) {
            // Captura cualquier excepción que ocurra durante el proceso de logout
            return response()->json(['error' => 'Error al cerrar sesión: ' . $e->getMessage()], 500);
        }
    }

    public function clientlogout(Request $request)
    {
        Auth::logout();
        Session::flush();
        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ], 200);
    }
    public function client_register()
    {
        try {
            $usuario = new User();
            $usuario->name = $_POST['name'];
            $usuario->phone = $_POST['phone'];
            $usuario->address = $_POST['address'];
            $usuario->email = $_POST['email'];
            $usuario->password = bcrypt($_POST['password']);
            $usuario->role_id = 2;
            $usuario->save();
            return response()->json(['success' => 'Usuario creado correctamente'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error de base de datos al crear el usuario', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error inesperado al crear el usuario', 'error' => $e->getMessage()], 500);
        }
    }

    public function user_register(){
        try {
            $usuario = new User();
            $usuario->name = $_POST['name'];
            $usuario->phone = $_POST['phone'];
            $usuario->address = $_POST['address'];
            $usuario->email = $_POST['email'];
            $usuario->password = bcrypt($_POST['password']);
            $usuario->role_id = 1;
            $usuario->save();
            return response()->json(['success' => 'Usuario creado correctamente'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error de base de datos al crear el usuario', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error inesperado al crear el usuario', 'error' => $e->getMessage()], 500);
        }
    }
}