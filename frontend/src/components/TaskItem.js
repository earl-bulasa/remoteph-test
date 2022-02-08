import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import eventBus from '../EventBus';
import axios from 'axios';

export default function TaskItem({task})
{
    function setTask()
    {
        // console.log('asd');
        eventBus.dispatch('editTask', {task});
    }

    function updateCompletion()
    {
        axios.put('http://localhost:8000/api/task/complete/' + task.id).then((response) => {
            // console.log(response.data.task);
            let temp_task = response.data.task;
            // console.log(temp_task);
            eventBus.dispatch('updateCompletion', {temp_task});
        });
    }

    return (
        <TableRow>
            <TableCell>{task.label}</TableCell>
            <TableCell><Button variant="contained" onClick={setTask} style={{marginRight: "20px"}}>Edit</Button><Button variant="contained" onClick={updateCompletion}>{task.completed_at === null ? 'Set to Complete' : 'Set to Incomplete'}</Button></TableCell>
        </TableRow>
    )
}