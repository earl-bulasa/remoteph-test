import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function TaskItem({task})
{
    return (
        <TableRow>
            <TableCell>{task.label}</TableCell>
        </TableRow>
    )
}