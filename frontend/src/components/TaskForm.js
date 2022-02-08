import React from 'react';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import axios from 'axios';

export default function TaskForm({task_id, addTask})
{
    function saveTask(e) {
        // console.log(task_id === 0);
        e.preventDefault();
        let taskData;
        taskData = {
            label: e.target.label.value
        }
        if(task_id === 0) {
            axios.post('http://localhost:8000/api/task', taskData).then((response) => {
                addTask(response.data.task);
            });
        }
    }

    return (
        <form onSubmit={saveTask}>
            <Input type="hidden" name="user_id" value={task_id} />
            <TextField hiddenLabel name="label" size="small" style={{marginRight: '20px'}} />
            <Button variant="contained" type="submit">Save Task</Button>
        </form>
    )
}