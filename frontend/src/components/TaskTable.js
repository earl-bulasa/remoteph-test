import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import TaskItem from './TaskItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

export default function TaskTable({tasks})
{

    const SortableItem = SortableElement(({task}) => <TaskItem task={task} />);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Task</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tasks.map((task, index) => (
                            <SortableItem key={task.id} index={index} task={task} />
                        )) 
                    }
                </TableBody>
            </Table>
        </TableContainer>
        
    )
}