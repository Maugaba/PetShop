<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PragmaRX\Google2FALaravel\Google2FA;

class TwoFactorController extends Controller
{
    public function authenticate(Request $request)
    {
        $request->validate([
            'two_factor_code' => 'required|numeric',
        ]);

        $user = $request->user();
        $google2fa = new Google2FA();

        if (!$google2fa->verifyKey($user->two_factor_secret, $request->input('two_factor_code'))) {
            return response()->json(['message' => 'Invalid two factor code.'], 401);
        }

        $request->session()->put('two_factor_authenticated', true);

        return response()->json(['message' => 'Two factor authentication successful.']);
    }
}
