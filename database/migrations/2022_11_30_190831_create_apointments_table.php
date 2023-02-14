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
        Schema::create('apointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained();
            $table->foreignId('psychiatrist_id')->constrained();
            $table->dateTime('date');
            $table->tinyInteger('status');  // 0=>witting 1=>day 2=>hour 3=>now 4=>Done 5=>cancel
            $table->integer('price');
            $table->string('payment_way','20');
            $table->string('rate')->nullable();
            $table->foreignId('zoomMeetings_id')->constrained('zoom_meetings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apointments');
    }
};
