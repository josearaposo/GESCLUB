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
        Schema::create('informes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->integer('centros');
            $table->integer('regates');
            $table->integer('definicion');
            $table->integer('primer_toque');
            $table->integer('tiro_libre');
            $table->integer('aereo');
            $table->integer('larga_distancia');
            $table->integer('pase_largo');
            $table->integer('marca');
            $table->integer('pase');
            $table->integer('penalti');
            $table->integer('tackling');
            $table->integer('tecnica');
            $table->integer('aceleracion');
            $table->integer('agilidad');
            $table->integer('balence');
            $table->integer('salto');
            $table->integer('corpulencia');
            $table->integer('cambio_ritmo');
            $table->integer('resistencia');
            $table->integer('agresion');
            $table->integer('anticipacion');
            $table->integer('compostura');
            $table->integer('concentracion');
            $table->integer('decisiones');
            $table->integer('determinacion');
            $table->integer('liderazgo');
            $table->integer('sin_balon');
            $table->integer('posicionamiento');
            $table->integer('en_equipo');
            $table->integer('vision');
            $table->text('pros');
            $table->text('contras');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informes');
    }
};
