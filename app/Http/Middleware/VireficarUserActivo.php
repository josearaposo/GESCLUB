<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VireficarUserActivo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && ! auth()->user()->activo) {
            auth()->logout();

            return redirect()->route('login')
                ->withErrors(['email' => 'Tu cuenta está desactivada, por favor contacta con el administrador.']);
        }

        return $next($request);
    }
}
