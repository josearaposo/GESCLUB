<?php

namespace App\Policies;

use App\Models\Informe;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class InformePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Informe $informe): bool
    {
        if ($user->rol === 'gestor') {
            return true;
        }

        return $user->id === $informe->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->rol === 'informador' || $user->rol === 'gestor';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Informe $informe): bool
    {
        return $user->id === $informe->user_id || $user->rol === 'gestor';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user,  Informe $informe): bool
    {

        return $user->id === $informe->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Informe $informe): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Informe $informe): bool
    {
        //
    }
}
