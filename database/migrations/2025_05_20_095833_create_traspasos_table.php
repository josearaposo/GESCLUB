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
        Schema::create('traspasos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('equipo_origen_id')->nullable()->constrained('equipos')->nullOnDelete();
            $table->foreignId('equipo_destino_id')->nullable()->constrained('equipos')->nullOnDelete();
            $table->string('equipo_destino_externo')->nullable();
            $table->date('fecha_traspaso');
            $table->enum('tipo', ['fichaje', 'cesion', 'libre', 'filial'])->default('fichaje');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traspasos');
    }
};
