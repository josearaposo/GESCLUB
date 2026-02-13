<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {

        if (!auth()->check()) {
            return redirect()->route('socios.show', $request->user()->socio->id)
                ->with('error', 'No tienes permisos para acceder.');
        }

        if (!in_array(auth()->user()->rol, $roles)) {
            return redirect()->route('socios.show', $request->user()->socio->id)
                ->with('error', 'No tienes permisos para acceder.');
        }

        return $next($request);
    }
}
