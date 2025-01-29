<?php


use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;



Route::group([
    'prefix' => 'tasks'
], function (){
    Route::get('/get_todo_list', [TaskController::class, 'getTodoList']);
    Route::Post('/create_todo', [TaskController::class, 'createTodo']);
    Route::get('/complete_todo', [TaskController::class, 'completeTodo']);
});
