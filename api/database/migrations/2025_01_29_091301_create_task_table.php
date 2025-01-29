<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task', function (Blueprint $table) {
            $table->increments('id');
            $table->string('task_ref',36)->unique()->default(DB::raw('(UUID())'))->index();
            $table->string('title',50);
            $table->text('description');
            $table->boolean('is_completed')->default(true)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('created_user_id')->nullable();
            $table->unsignedInteger('updated_user_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};
