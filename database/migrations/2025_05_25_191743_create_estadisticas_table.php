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
        Schema::create('estadisticas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos');
            $table->foreignId('jugador_id')->constrained('jugadores');
            $table->enum('tipo', ['gol','asistencia', 'tarjeta', 'cambio']);
            $table->string('detalle')->nullable();
            $table->unsignedTinyInteger('minuto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estadisticas');
    }
};
