import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function TaskForm({task, addTask, updateTask})
{
    const [success, setSuccess] = useState(null);

    const [taskData, setTaskData] = useState({
        id: 0,
        label: ""
    });

    function updateLabel(e){
        setTaskData({
            ...taskData,
            label: e.target.value
        });
    }

    useEffect(() => {
        console.log('task', task);
        if(task !== null) {
            setTaskData(task);
        }
    }, [task]);

    function saveTask(e) {
        // console.log(task_id === 0);
        e.preventDefault();
        if(!/\S/.test(taskData.label)) {
            setSuccess(false);
            return;
        }

        if(task === null) {
            axios.post('http://localhost:8000/api/task', taskData).then((response) => {
                addTask(response.data.task);
                setTaskData({
                    id: 0,
                    label: ""
                });
                setSuccess(true);
            });
        } else {
            axios.put('http://localhost:8000/api/task/' + taskData.id, taskData).then((response) => {
                // addTask(response.data.task);
                updateTask(response.data.task);
                setTaskData({
                    id: 0,
                    label: ""
                });
                setSuccess(true);
            });
        }
    }

    let alert;
    if (success) {
        alert = <Alert severity="success" style={{marginTop: "10px"}}>Task saved successfully</Alert>
    } else if (success == false) {
        alert = <Alert severity="error" style={{marginTop: "10px"}}>Label is required.</Alert>
    }

    return (
        <form onSubmit={saveTask} style={{marginBottom: "10px"}}>
            {
                task !== null &&
                <input type="hidden" name="user_id" value={taskData.id} />
            }
            
            <TextField hiddenLabel name="label" size="small" style={{marginRight: '20px'}} value={taskData !== null ? taskData.label : ""} onChange={updateLabel}/>
            <Button variant="contained" className="Submit-button" style={{color: '#dbe9fd'}} type="submit">Save Task</Button>
            {alert}
            
            
        </form>
    )
}