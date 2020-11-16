import React, {useEffect, useState} from "react";
import {idbKeyval} from '../DBActions';

export default function TitleWithInput(props) {
    const [openInput, setOpenInput] = useState(false);
    const [title, setTitle] = useState(props.obj.title);

    function handleInputKeyUp(event) {
        if (event.key === 'Enter') {
            changeTitle();
        }
    }

    function changeTitle() {
        props.obj.title = title;
        idbKeyval.set(props.table, props.obj).then(() => {
            setOpenInput(false);
            idbKeyval.get(props.table, props.obj.id).then(obj => {
                setTitle(obj.title);
            })
        });
    }

    function deleteObj() {
        props.deleteObj(props.obj.id);
    }

    useEffect(() => {
        if (document.getElementById(props.id))
            document.getElementById(props.id).focus();
    });

    function openInputAndFocus() {
        setOpenInput(true);
    }

    function blurInputAndSave() {
        setOpenInput(false);
        changeTitle();
    }

    function onDragStart(event, obj) {
        event.dataTransfer.setData('obj', obj.id);
    }

    return (
        <div className={props.table === 'todos' ? 'todo-card p-1 m-1 draggable' : 'dir-title p-1'}
             id={props.id}
             onDragStart={(event) => onDragStart(event, props.obj)}
             draggable={props.table === 'todos'}>
            {
                openInput ?
                    <input id={props.id} type="text"
                           className="form-control title-input"
                           onBlur={() => blurInputAndSave()}
                           onKeyUp={event => handleInputKeyUp(event)}
                           onChange={event => setTitle(event.target.value)}
                           value={title}/>
                    :
                    <div className="title-span" id={'title-span' + props.id}
                         onClick={() => openInputAndFocus()}>{title}</div>
            }
            <div className="spacer"/>
            <button type="button"
                    onClick={() => deleteObj()}
                    className="delete-button btn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    )
}