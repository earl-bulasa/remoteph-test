import React, {useState, useEffect} from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import axios from 'axios';
import {arrayMoveImmutable} from 'array-move';


export default function TaskList()
{
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(0);

    const SortableList = SortableContainer(({tasks}) => <TaskTable tasks={tasks}></TaskTable>)

    function getTasks()
    {
        axios.get('http://localhost:8000/api/tasks').then((response) => {
            setTasks(response.data.tasks);
        });
    }

    function onSortEnd({oldIndex, newIndex})  {
        const tempTasks = arrayMoveImmutable(tasks, oldIndex, newIndex);
        console.log(tempTasks);
        setTasks(tempTasks);
        axios.post('http://localhost:8000/api/tasks/rearrange', {tasks: tempTasks}).then((response) => {
            console.log(response.data);
        });
    };

    function addTask(new_task) {
        setTasks([...tasks, new_task]);
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <TaskForm task_id={task} addTask={addTask} />
            <SortableList tasks={tasks} onSortEnd={onSortEnd} />
        </div>
        
    )
}