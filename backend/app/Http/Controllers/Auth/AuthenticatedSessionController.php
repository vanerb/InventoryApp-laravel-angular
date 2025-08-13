<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
   public function store(LoginRequest $request)
            {
                $request->authenticate();

                  $user = $request->user();

                  // Crear token de Sanctum
                  $token = $user->createToken($request->device_name ?? 'api-token')->plainTextToken;

                  // Guardar el token también en users.api_token (opcional)
                  $user->api_token = $token;
                  $user->save();

                  return response()->json([
                      'token' => $token,
                      'user' => $user,
                  ]);
            }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
