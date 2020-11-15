import React, {useState} from "react";
import {idbKeyval} from '../DBActions';

export default function Todo(props) {
    const [openInput, setOpenInput] = useState(false);
    const [todoTitle, setTodoTitle] = useState(props.todo.title);

    function changeTitle(event, todo) {
        if (event.key === 'Enter') {
            props.todo.title = todoTitle;
            idbKeyval.set('todos', props.todo).then(() => {
                setOpenInput(false);
                idbKeyval.get('todos', todo.id).then(todo => {
                    setTodoTitle(todo.title);
                })
            });
        }
    }

    return (
        <div className="todo-card p-2 m-1"
             onClick={() => setOpenInput(true)}
             key={props.todo.id}>
            {
                openInput ?
                    <input type="text" className="form-control"
                           onKeyUp={event => changeTitle(event, props.todo)}
                           onChange={event => setTodoTitle(event.target.value)}
                           value={todoTitle}/>
                    :
                    <p>{todoTitle}</p>
            }
        </div>
    )
}