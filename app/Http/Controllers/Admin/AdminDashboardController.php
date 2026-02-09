<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Club;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $clubs = Club::all();
        $users = User::where('rol', '!=', 'superadmin')->get();

        return inertia(
            'Admin/Dashboard',
            [
                'clubs' => $clubs,
                'users' => $users
            ],
        );
    }

    public function cambiar(User $user)
    {
        if ($user->rol === 'superadmin') {
            return back()->with('error', 'No puedes modificar el superadmin');
        }

        $user->activo = ! $user->activo;
        $user->save();

        return back()->with('success', 'Estado del usuario actualizado');
    }
}
