<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\ValidationFormatService;
use App\Services\ValidationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class TaskController extends Controller
{
    public function getTodoList(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $list_count = $request->get('list_count');
            $todo_list = Task::getTodoList($list_count);
            return $this->successReturn($todo_list, 'Data Returned Successfully', ResponseAlias::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e);
            return $this->errorReturn([], 'Failed to return data', ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function createTodo(Request $request){
        $validator = ValidationService::createTodoValidator($request->all());
        if ($validator->fails()) {
            return $this->errorReturn([], ValidationFormatService::formatErrors($validator->errors()), ResponseAlias::HTTP_BAD_REQUEST);
        }
        try {
            Task::createTodo($request->all());
            return $this->successReturn([], 'New Todo added successfully', ResponseAlias::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error($e);
            return $this->errorReturn([], 'Todo create failed.', ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function completeTodo(Request $request){
        $validator = ValidationService::completeTodoValidator($request->all());
        if ($validator->fails()) {
            return $this->errorReturn([], ValidationFormatService::formatErrors($validator->errors()), ResponseAlias::HTTP_BAD_REQUEST);
        }
        try {
            Task::completeTodo($request->all());
            return $this->successReturn([], 'Todo completed successfully', ResponseAlias::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e);
            return $this->errorReturn([], 'Todo completion failed.', ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}
