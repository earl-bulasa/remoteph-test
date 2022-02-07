import React, {useState, useEffect} from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import TaskTable from './TaskTable';
import axios from 'axios';
import {arrayMoveImmutable} from 'array-move';

export default function TaskList()
{
    const [tasks, setTasks] = useState([]);
    const SortableList = SortableContainer(({tasks}) => <TaskTable tasks={tasks}></TaskTable>)

    function getTasks()
    {
        axios.get('http://localhost:8000/api/tasks').then((response) => {
            setTasks(response.data.tasks);
        });
    }

    function onSortEnd ({oldIndex, newIndex})  {
        this.setTasks(arrayMoveImmutable(tasks, oldIndex, newIndex));
      };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <SortableList tasks={tasks} onSortEnd={onSortEnd} />
    )
}