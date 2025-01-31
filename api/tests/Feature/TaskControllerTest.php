<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_incomplete_tasks()
    {
        Task::factory()->count(5)->create([
            'is_active' => true,
            'is_completed' => false,
        ]);

        $response = $this->getJson('api/tasks/get_todo_list?list_count=3');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['title', 'description', 'is_completed', 'is_active', 'created_at']], 'message',]);
    }

    public function test_creates_todo()
    {
        $data = [
            'title' => 'New Task',
            'description' => 'This is a new task',
            'is_completed' => false,
            'is_active' => true,
        ];

        $response = $this->postJson('api/tasks/create_todo', $data);

        $response->assertStatus(201)
            ->assertJson(['message' => 'New Todo added successfully']);

        $this->assertDatabaseHas('task', $data);
    }

    public function test_completes_todo()
    {
        $task = Task::factory()->create(['is_completed' => false]);

        $response = $this->postJson('api/tasks/complete_todo', ['task_id' => $task->id]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Todo completed successfully']);

        $this->assertDatabaseHas('task', [
            'id' => $task->id,
            'is_completed' => true,
        ]);
    }
}
