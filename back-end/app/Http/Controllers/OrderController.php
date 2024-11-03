<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class orderController extends Controller
{
    // Store data
    public function store(Request $request)
    {
        return response()->json($request->all());

    }
    
}
