import React from "react";
import { TodoItems } from './TodoItems'

export function TodoList ({ tareas, toggleTodo }) {
    return (
        <ul>
            {
                tareas.map((tarea) => (
                    <TodoItems key={tarea.id} tarea={tarea} toggleTodo={toggleTodo}/>
                ))}
        </ul>
    )
}