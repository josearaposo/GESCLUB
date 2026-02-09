<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Club;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    //Informadores
    public function indexInformadores(Request $request)
    {

        $clubId = $request->input('club');
        $club = Club::findOrFail($clubId);

        $informadores = $club->usuarios()
            ->where('rol', 'informador')
            ->get();

        return Inertia::render('Usuarios/Index', [
            'informadores' => $informadores,
            'club' => $clubId,
        ]);
    }

    public function createInformador(Club $club)
    {

        return Inertia::render('Usuarios/CreateInformador', [
            'club' => $club,
        ]);
    }

    public function storeInformador(Request $request)
    {
        $clubId = $request->input('club');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6|confirmed',
        ]);
        $user = User::where('email', $validated['email'])->first();

        if (!$user) {

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'rol' => 'informador',
            ]);
        }

        if ($user->clubes()->where('club_id', $clubId)->exists()) {
            return back()->withErrors([
                'email' => 'Este usuario ya pertenece a este club.',
            ]);
        }

        // Asociar al club
        $user->clubes()->attach($clubId);

        return redirect()
            ->route('usuarios.index', ['club' => $clubId])
            ->with('success', 'Informador asociado correctamente.');
    }


    public function destroyInformador(User $informador)
    {

        $clubId = session('club');

        if ($informador->clubes()->count() > 1) {
            // Solo desvincular de ESTE club
            $informador->clubes()->detach($clubId);

            return back()->with('success', 'Informador desvinculado de tu club correctamente');
        }

        // Si solo pertenece a un club quitar relación y borrar usuario
        $informador->clubes()->detach();
        $informador->delete();

        return back()->with('success', 'Informador eliminado correctamente');
    }

    public function destroy(User $user)
    {
        $user->activo = false;
        $user->save();

        $clubs = $user->clubes;

        foreach ($clubs as $club) {
            $club->delete(); // eliminar el club
        }

        return back()->with('success', 'Usuario eliminado');
    }
}
