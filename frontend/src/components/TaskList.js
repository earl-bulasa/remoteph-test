import React, {useState, useEffect} from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import axios from 'axios';
import {arrayMoveImmutable} from 'array-move';
import eventBus from '../EventBus';
import Alert from '@mui/material/Alert';


export default function TaskList()
{
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);

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
            console.log(response.status);
        }).catch((error) => {
            console.log('error', error.response.data);
        });
    };

    function addTask(new_task) {
        setTasks([...tasks, new_task]);
        setTask(null);
    }

    function updateTask(updated_task) {
        let temp_tasks = [...tasks];
        temp_tasks.find((obj, index) => {
            if(obj.id === updated_task.id) {
                temp_tasks[index] = updated_task;
                return true;
            }
        });
        setTasks(temp_tasks);
        setTask(null);

    }

    useEffect(() => {
        getTasks();
    }, []);
    useEffect(() => {
        eventBus.on('editTask', (value) => {
            // console.log(value.task);
            setTask(value.task);
        })
        eventBus.on('updateCompletion', (value) => {
            // console.log(value);
            
            updateTask(value.temp_task);
        })
    });
    return (
        <div>
            <TaskForm task={task} addTask={addTask} updateTask={updateTask} />

            {
                tasks.length >= 1 ?
                <SortableList tasks={tasks} onSortEnd={onSortEnd}  /> :
                <Alert severity="info">There are no available tasks.</Alert>
            }
            
        </div>
        
    )
}