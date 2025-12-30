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
        Schema::table('alineaciones', function (Blueprint $table) {
            $table->foreignId('posicion_id')->nullable()->after('rol')->constrained('posiciones');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alineaciones', function (Blueprint $table) {

            $table->dropForeign(['posicion_id']);
            $table->dropColumn('posicion_id');
        });
    }
};
