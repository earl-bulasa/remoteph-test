import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

export default function TaskItem({task})
{
    return (
        <tr>
            <td>{task.label}</td>
        </tr>
    )
}