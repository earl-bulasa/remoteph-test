<?php

namespace Tests\Unit;

use App\Task;
use PHPUnit\Framework\TestCase;

class TaskTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testStore()
    {
        $task = new Task;
        $task->label = "New Test Task";
        $task->sort_order = 1;
        $task->completed_at = null;
        $this->assertTrue($task->label == "New Test Task");
    }
}
