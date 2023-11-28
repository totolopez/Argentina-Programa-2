import React from 'react'

export function TodoItems({ tarea, toggleTodo}) {
    const {id,  task, completed} = tarea

    const handleTareasClick = () => {
        toggleTodo(id)
    }

    return (
        <li>
            <input type="checkbox" checked={completed} onChange={handleTareasClick} />
            {task} id: {id}
        </li>
    )
}