import React from "react";
import TitleWithInput from "./TitleWithInput";

export default function Directories(props) {
    return (
        <>
            {
                props.dirs.length !== 0 &&
                props.dirs.map(dir =>
                    <div key={dir.dir.id} className="directory-card p-2 m-2">
                        <TitleWithInput table="dirs" deleteObj={props.deleteDir}
                                        obj={dir.dir} id={'dirs' + dir.dir.id}/>
                        <div className="todos-scroll">
                            {
                                dir.todos.map(todo =>
                                    <TitleWithInput table="todos"
                                                    deleteObj={props.deleteTodo}
                                                    key={'todo' + todo.id}
                                                    obj={todo}
                                                    id={'todos/dir' + dir.dir.id + '/todo' + todo.id}/>
                                )
                            }
                        </div>
                        <button type="button"
                                className="btn btn-outline-primary m-1"
                                onClick={() => props.addNewTODO(dir.dir)}>Добавить
                        </button>
                    </div>
                )
            }
        </>
    )
}