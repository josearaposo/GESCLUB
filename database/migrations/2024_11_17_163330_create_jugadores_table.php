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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->string('apodo');
            $table->string('nombre');
            $table->string('primer_apellido');
            $table->string('segundo_apellido')->nullable();
            $table->foreignId('equipo_id')->constrained('equipos');
            $table->string('equipo_externo')->nullable();
            $table->enum('estado', ['fichado', 'ojeado']);
            $table->integer('year');
            $table->string('ciudad');
            $table->string('provincia');
            $table->string('pais');
            $table->string('lateralidad');
            $table->integer('altura');
            $table->string('besoccer')->nullable();
            $table->boolean('internacional');
            $table->foreignId('primera_posicion')->constrained('posiciones');
            $table->foreignId('segunda_posicion')->nullable()->constrained('posiciones');
            $table->foreignId('representante_id')->nullable()->constrained('representantes');
            $table->integer('salario')->nullable();
            $table->integer('valor_mercado')->nullable();
            $table->decimal('valoracion', 4, 2)->nullable();
            $table->string('imagen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugadores');
    }
};
