import React, {useEffect, useState} from "react";
import {idbKeyval} from '../DBActions';

export default function TitleWithInput(props) {
    const [openInput, setOpenInput] = useState(false);
    const [title, setTitle] = useState(props.obj.title);

    function changeTitle(event, obj) {
        if (event.key === 'Enter') {
            props.obj.title = title;
            idbKeyval.set(props.table, props.obj).then(() => {
                setOpenInput(false);
                idbKeyval.get(props.table, obj.id).then(obj => {
                    setTitle(obj.title);
                })
            });
        }
    }

    useEffect(() => {
        if (document.getElementById(props.id))
            document.getElementById(props.id).focus();
    });

    function openInputAndFocus() {
        setOpenInput(true);
    }

    return (
        <div className={props.table === 'todos' ? 'todo-card p-1 m-1' : 'dir-title p-1'}
             onClick={() => openInputAndFocus()}>
            {
                openInput ?
                    <input id={props.id} type="text"
                           className="form-control title-input"
                           onBlur={() => setOpenInput(false)}
                           onKeyUp={event => changeTitle(event, props.obj)}
                           onChange={event => setTitle(event.target.value)}
                           value={title}/>
                    :
                    <div className="title-span">{title}</div>
            }
        </div>
    )
}