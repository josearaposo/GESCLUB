<?php

use App\Http\Controllers\AsientoController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EstadioController;
use App\Http\Controllers\InformeController;
use App\Http\Controllers\JugadorController;
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
Route::resource('informes', InformeController::class);
Route::resource('posiciones', PosicionController::class)->parameters(['posiciones' => 'posicion']);
Route::resource('divisiones', DivisionController::class)->parameters(['divisiones' => 'division']);
Route::resource('jugadores', JugadorController::class)->parameters(['jugadores' => 'jugador']);

Route::resource('estadios', EstadioController::class);

Route::resource('zonas', ZonaController::class);
Route::get('/zonas/{zona}/asientos', [ZonaController::class, 'asientos']);
Route::post('/reservar', [ReservaController::class, 'reservar'])->name('reservar');

// Route::get('/zonas', [ZonaController::class, 'index'])->name('zonas.index');

require __DIR__.'/auth.php';
