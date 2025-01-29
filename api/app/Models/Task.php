<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task';

    protected $casts = [
        'is_active' => 'bool',
        'created_user_id' => 'int',
        'updated_user_id' => 'int',
        'is_completed' => 'bool'
    ];

    protected $fillable = [
        'title',
        'description',
        'is_active',
        'is_completed',
        'created_user_id',
        'updated_user_id'
    ];

    public static function getTodoList($count)
    {
        $query = Task::query()
            ->select('task.title','task.task_ref', 'task.description', 'task.is_completed', 'task.is_active', 'task.created_at')
            ->where('task.is_active', 1)
            ->where('task.is_completed', 0)
            ->orderBy('task.created_at', 'desc')
            ->limit($count)
            ->get();

        return $query;
    }

    public static function createTodo(array $all)
    {
        Task::create([
            'title' => $all['title'],
            'description' => $all['description'],
            'is_completed' => $all['is_completed'],
            'is_active' => $all['is_active'],
        ]);
    }

    public static function completeTodo($request)
    {
        Task::where('task_ref',$request['task_ref'])
            ->update([
                'is_completed' => 1,
                'updated_at' => now()
            ]);
    }
}
