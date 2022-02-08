import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import eventBus from '../EventBus';

export default function TaskItem({task, index})
{
    function setTask()
    {
        // console.log('asd');
        eventBus.dispatch('editTask', {task});
    }
    return (
        <TableRow>
            <TableCell>{task.label}</TableCell>
            <TableCell><Button variant="contained" onClick={setTask}>Edit</Button></TableCell>
        </TableRow>
    )
}