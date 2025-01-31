<?php

namespace Tests\Unit;

use App\Models\Task;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    public function test_creates_todo(): void
    {
        $data = [
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'is_completed' => false,
            'is_active' => true,
        ];

        Task::createTodo($data);

        $this->assertDatabaseHas('task', $data);
    }

    public function test_active_incomplete_tasks()
    {
        Task::factory()->count(5)->create([
            'is_active' => true,
            'is_completed' => false,
        ]);

        Task::factory()->count(3)->create([
            'is_active' => false,
            'is_completed' => false,
        ]);
        Task::factory()->count(2)->create([
            'is_active' => true,
            'is_completed' => true,
        ]);

        $result = Task::getTodoList(5);

        $this->assertCount(5, $result); // Ensure only active and incomplete tasks are returned
        $this->assertTrue($result->every(function ($task) {
            return $task->is_active && !$task->is_completed;
        }));
    }

    public function test_complete_a_todo()
    {
        $task = Task::factory()->create(['is_completed' => false]);

        Task::completeTodo(['task_id' => $task->id]);

        $this->assertDatabaseHas('task', [
            'id' => $task->id,
            'is_completed' => true,
        ]);
    }

}
