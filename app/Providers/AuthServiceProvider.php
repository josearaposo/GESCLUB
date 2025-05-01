<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Equipo;
use App\Models\Informe;
use App\Policies\EquipoPolicy;
use App\Policies\InformePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Informe::class => InformePolicy::class,
        Equipo::class => EquipoPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
