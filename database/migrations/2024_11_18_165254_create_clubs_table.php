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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('imagen')->nullable();
            $table->string('estadio');
            $table->decimal('presupuesto', 11, 2);
            $table->string('contacto');
            $table->string('web')->nullable();
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('pais');
            $table->integer('empleados')->nullable();
            $table->date('fundacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
