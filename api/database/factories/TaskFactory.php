<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'is_completed' => false,
            'is_active' => true,
        ];
    }
}
