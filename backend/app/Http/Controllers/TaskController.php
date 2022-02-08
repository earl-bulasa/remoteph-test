<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Carbon\Carbon;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    public function store(TaskRequest $request)
    {
        $sort_order = Task::max('sort_order');
        $task = new Task;
        $task->label = $request->label;
        $task->sort_order = $sort_order+1;
        $task->completed_at = null;
        $task->save();
        return response()->json([
            'msg' => 'Task added successfully',
            'task' => $task
        ], 200);
    }

    public function update(TaskRequest $request, $id)
    {
        $task = Task::find($id);
        $task->label = $request->label;
        $task->save();
        return response()->json([
            'msg' => 'Task updated successfully',
            'task' => $task
        ], 200);
    }

    public function updateCompletion(Request $request, $id)
    {
        $task = Task::find($id);
        $task->completed_at = is_null($task->completed_at) ? Carbon::now() : null;
        $task->save();
        return response()->json([
            'msg' => 'Task completion updated',
            'task' => $task
        ], 200);
    }

    public function rearrange(Request $request)
    {
        foreach($request->tasks as $key=>$task) {
            $updated_task = Task::find($task['id']);
            $updated_task->sort_order = $key;
            $updated_task->save();
        }
        return response()->json([
            'msg' => 'Tasks sorting updated'
        ], 200);
    }

    public function listAll()
    {
        $tasks = Task::orderBy('sort_order', 'asc')->get();
        return response()->json([
            'tasks' => $tasks
        ], 200);
    }
}
