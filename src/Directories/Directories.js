import React from "react";
import TitleWithInput from "./TitleWithInput";

export default function Directories(props) {
    return (
        <>
            {
                props.dirs.length !== 0 &&
                props.dirs.map(dir =>
                    <div key={dir.dir.id} className="directory-card p-2 m-2">
                        <TitleWithInput table="dirs" obj={dir.dir} id={'dirs' + dir.dir.id}/>
                        <div className="todos-scroll">
                            {
                                dir.todos.map(todo =>
                                    <TitleWithInput table="todos"
                                                    key={'todo' + todo.id}
                                                    obj={todo}
                                                    id={'todos/dir' + dir.dir.id + '/todo' + todo.id}/>
                                )
                            }
                        </div>
                        <button type="button"
                                className="btn btn-outline-primary m-2"
                                onClick={() => props.addNewTODO(dir.dir)}>Add
                        </button>
                        <button type="button"
                                className="btn btn-outline-primary m-2"
                                onClick={() => props.clear('todos')}>Clear
                        </button>
                    </div>
                )
            }
        </>
    )
}