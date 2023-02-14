<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('psychiatrists', function (Blueprint $table) {
            $table->foreignId('id')->references('id')->on('users')->cascadeOnDelete();
            $table->smallInteger('years_experience');
            $table->string('details');
            $table->string('specialization');
            $table->string('API_Key');
            $table->string('API_secret');
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('psychiatrists');
    }
};
