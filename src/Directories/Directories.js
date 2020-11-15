import React from "react";
import Todos from "./Todos";

export default function Directories(props) {
    return (
        <>
            {
                props.dirs.length !== 0 &&
                props.dirs.map(dir =>
                    <div key={dir.dir.id} className="directory-card p-2 m-2">
                        <h3>{dir.dir.title}</h3>
                        <div className="todos-scroll">
                            <Todos dir={dir}/>
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