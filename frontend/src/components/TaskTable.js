import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import TaskItem from './TaskItem';

export default function TaskTable({tasks})
{
    const SortableItem = SortableElement(({task}) => <TaskItem task={task} />);

    return (
        <table>
            <thead>
                <th>
                    <td>
                        Label
                    </td>
                </th>
            </thead>
            <tbody>
                {
                    tasks.map((task) => (
                        <SortableItem key={task.id} index={task.sort_order} task={task} />
                    )) 
                }
            </tbody>
        </table>
    )
}