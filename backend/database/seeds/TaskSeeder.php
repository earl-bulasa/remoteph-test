<?php

use Illuminate\Database\Seeder;
use App\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $task1 = new Task;
        $task1->label = "Eat breakfast";
        $task1->sort_order = 1;
        $task1->save();

        $task2 = new Task;
        $task2->label = "Take a bath";
        $task2->sort_order = 2;
        $task2->save();

        $task3 = new Task;
        $task3->label = "Get a haircut";
        $task3->sort_order = 3;
        $task3->save();
    }
}
