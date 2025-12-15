<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alineaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos');
            $table->foreignId('jugador_id')->constrained('jugadores');
            $table->enum('rol', ['titular', 'suplente']);
            $table->timestamps();
            $table->unique(['partido_id', 'jugador_id']); // Un jugador no puede repetirse en el mismo partido
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alineaciones');
    }
};
