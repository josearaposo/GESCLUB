<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Division;
use App\Models\Equipo;
use App\Models\Informe;
use App\Models\Representante;
use App\Policies\DivisionPolicy;
use App\Policies\EquipoPolicy;
use App\Policies\InformePolicy;
use App\Policies\RepresentantePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Validation\Rules\In;
use Symfony\Polyfill\Intl\Idn\Info;

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
        Representante::class => RepresentantePolicy::class,
        Division::class => DivisionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
