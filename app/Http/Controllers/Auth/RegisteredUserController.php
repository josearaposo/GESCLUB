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
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
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

    $club = $request->input('club');

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6|confirmed',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
        'rol' => 'informador', // Se asigna directamente
    ]);

    $user->clubes()->attach($club);

    return redirect()->route('usuarios.index', ['club' => $club])->with('success', 'Informador creado correctamente.');


}
}
