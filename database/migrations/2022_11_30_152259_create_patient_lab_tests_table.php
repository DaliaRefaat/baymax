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
        Schema::create('patient_lab_tests', function (Blueprint $table) {
          $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
          $table->string('test_path');
          $table->timestamps();
          $table->primary(['patient_id','test_path']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_lab_tests');
    }
};
