<?php

use App\Http\Controllers\AbonoController;
use App\Http\Controllers\AsientoController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EstadioController;
use App\Http\Controllers\InformeController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PosicionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepresentanteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\SocioController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Models\Socio;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', 'activo'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->rol === 'superadmin') {
            return redirect()->route('admin.dashboard');
        }
        if ($user->rol === 'socio') {
            return redirect()->route('socios.show', $user->socio->id);
        }


        return redirect()->route('clubs.index');
    })->middleware(['auth', 'verified'])->name('dashboard');


    Route::middleware(['auth', 'verified'])
        ->prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::get('/dashboard', [AdminDashboardController::class, 'index'])
                ->name('dashboard');
        });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::resource('equipos', EquipoController::class);
    Route::get('/clubs/{club}/acceder', [ClubController::class, 'acceder'])->name('clubs.acceder');
    Route::get('/clubs/salir', [ClubController::class, 'salir'])->name('clubs.salir');
    Route::resource('clubs', ClubController::class);
    Route::post('clubs/{id}/restore', [ClubController::class, 'restore'])->name('clubs.restore');

    Route::resource('representantes', RepresentanteController::class);

    Route::get('/informes/comparacion', [InformeController::class, 'comparacion'])->name('informes.comparacion');
    Route::get('/informes/comparar', [InformeController::class, 'comparar'])->name('informes.comparar');
    Route::resource('informes', InformeController::class);


    Route::resource('posiciones', PosicionController::class)->parameters(['posiciones' => 'posicion']);
    Route::resource('divisiones', DivisionController::class)->parameters(['divisiones' => 'division']);
    Route::resource('jugadores', JugadorController::class)->parameters(['jugadores' => 'jugador']);

    Route::resource('estadios', EstadioController::class);

    Route::resource('zonas', ZonaController::class);
    Route::get('/zonas/{zona}/asientos', [ZonaController::class, 'asientos']);
    Route::post('/reservar', [ReservaController::class, 'reservar'])->name('reservar');

    Route::get('/informadores', [RegisteredUserController::class, 'indexInformadores'])->name('usuarios.index');
    Route::get('/usuarios/informador/{club}/crear', [RegisteredUserController::class, 'createInformador'])->name('usuarios.informador.create');
    Route::post('/usuarios/informador', [RegisteredUserController::class, 'storeInformador'])->name('usuarios.informador.store');
    Route::delete('/usuarios/informador/{informador}', [RegisteredUserController::class, 'destroyInformador'])->name('usuarios.informador.destroy');
    Route::delete('/usuarios/{user}', [RegisteredUserController::class, 'destroy'])
        ->name('usuarios.destroy');


    Route::get('/club/crear', function () {
        return Inertia::render('Clubs/PagoPayPal');
    })->name('clubs.start');
    Route::get('/payment/create', [PaypalController::class, 'createPayment'])->name('pago.club');
    Route::get('/payment/success', [PaypalController::class, 'paymentSuccess'])->name('payment.success');
    Route::get('/payment/cancel', [PaypalController::class, 'paymentCancel'])->name('payment.cancel');
    Route::get('/abonos/{abono}/paypal', [PaypalController::class, 'pagarAbono'])
        ->name('abonos.paypal');

    Route::get('/abonos/{abono}/paypal/success', [PaypalController::class, 'pagoAbonoSuccess'])
        ->name('abonos.paypal.success');

    Route::get('/abonos/{abono}/paypal/cancel', [PaypalController::class, 'pagoAbonoCancel'])
        ->name('abonos.paypal.cancel');

    Route::post('/jugadores/{jugador}/fichar', [JugadorController::class, 'fichar'])->name('jugadores.fichar');

    Route::get('/jugadores/{jugador}/historial', [JugadorController::class, 'historial'])
        ->name('jugadores.historial');

    //Ruta para gestion de estadisticas de partidos
    Route::resource('partidos', PartidoController::class);
    Route::post('/estadisticas', [EstadisticaController::class, 'store'])->name('estadisticas.store');
    Route::post(
        '/partidos/{partido}/estadisticas',
        [EstadisticaController::class, 'store']
    )->name('partidos.estadisticas.store');
    Route::delete(
        '/estadisticas/{estadistica}',
        [EstadisticaController::class, 'destroy']
    )->name('estadisticas.destroy');
    Route::get('/estadisticas/{estadistica}', [EstadisticaController::class, 'show'])
        ->name('estadisticas.show');
    Route::put('/estadisticas/{estadistica}', [EstadisticaController::class, 'update'])->name('estadisticas.update');

    Route::post('/posiciones/{posicion}/toggle-activo', [PosicionController::class, 'toggleActivo'])
        ->name('posiciones.toggleActivo');

    Route::resource('socios', SocioController::class);
    // Route::get('/zonas', [ZonaController::class, 'index'])->name('zonas.index');

    Route::put('/admin/dashboard/users/{user}', [AdminDashboardController::class, 'cambiar'])
        ->name('admin.dashboard.cambiar');

    // Rutas para gestión de abonos
    Route::post('/abonos/{abono}/pagar', [AbonoController::class, 'pagar'])
        ->name('abonos.pagar');

    // Ruta para generar PDF del abono
    Route::get('/abonos/{abono}/pdf', [AbonoController::class, 'pdf'])
        ->name('abonos.pdf');
});

require __DIR__ . '/auth.php';
