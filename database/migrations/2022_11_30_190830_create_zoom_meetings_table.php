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
        Schema::create('zoom_meetings', function (Blueprint $table) {
            $table->id();
            $table->String('meeting_id');
            $table->longText('start_url');
            $table->string('join_url');
        });
    }

    public function down()
    {
        Schema::dropIfExists('zoom_meetings');
    }
};
