import React from "react";

export default function Todos(props) {
    return (
        props.dir.todos.map(todo =>
            <div className="todo-card p-2 m-1"
                key={todo.id}>{todo.title}</div>
        )
    )
}