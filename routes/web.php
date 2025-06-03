<?php

use App\Http\Controllers\AsientoController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EstadioController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\InformeController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PosicionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepresentanteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\ZonaController;
use App\Models\Club;
use App\Models\Estadio;
use App\Models\Informe;
use App\Models\Representante;
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

Route::get('/dashboard', function () {
    return redirect()->route('clubs.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('equipos', EquipoController::class);
Route::resource('clubs', ClubController::class);
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

Route::get('/club/crear', function () {
    return Inertia::render('Clubs/PagoPayPal');
})->name('clubs.start');
Route::get('/payment/create', [PaypalController::class, 'createPayment'])->name('payment.club');
Route::get('/payment/success', [PaypalController::class, 'paymentSuccess'])->name('payment.success');
Route::get('/payment/cancel', [PaypalController::class, 'paymentCancel'])->name('payment.cancel');

Route::post('/jugadores/{jugador}/fichar', [JugadorController::class, 'fichar'])->name('jugadores.fichar');

Route::resource('partidos', PartidoController::class);

Route::post('/partidos/{partido}/estadisticas', [PartidoController::class, 'guardarEstadistica'])->name('partidos.estadisticas.guardar');

Route::post('estadisticas', [EstadisticaController::class, 'store'])->name('estadisticas.store');







// Route::get('/zonas', [ZonaController::class, 'index'])->name('zonas.index');

require __DIR__ . '/auth.php';
