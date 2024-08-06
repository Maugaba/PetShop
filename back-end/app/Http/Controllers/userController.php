<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;
use App\Models\roles;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function all()
    {
        $users = User::all();
        return response()->json($users);
    }
    
    public function update($id) {
        try {
            $usuario = user::findOrFail($id);
            $usuario->nombre = $_POST['nombre'];
            $usuario->apellido = $_POST['apellido'];
            $usuario->correo_electronico = $_POST['correo_electronico'];
            $usuario->usuario = $_POST['usuario'];
            $usuario->id_rol = $_POST['id_rol'];
            $usuario->save();
    
            return response()->json(['success' => 'Datos actualizados correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar los datos ' . $e]);
        }
    }

    public function change_password($id) {
        try {
            $usuario = user::findOrFail($id);
            if (!Hash::check($_POST['contraseña_actual'], $usuario->contraseña)) {
                return response()->json(['error' => 'La contraseña actual no coincide']);
            }
            $usuario->contraseña = bcrypt($_POST['nueva_contraseña']);
            $usuario->save();
            return response()->json(['success' => 'Contraseña actualizada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la contraseña ' . $e]);
        }
    }
}
