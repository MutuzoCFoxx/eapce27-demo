<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('badge_id')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('organisation');
            $table->string('country');
            $table->string('phone')->nullable();
            $table->string('reg_type');
            $table->integer('price')->default(0);
            $table->string('dietary')->nullable();
            $table->string('hotel')->nullable();
            $table->boolean('accreditation_done')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('registrations');
    }
};
