import React from "react";
import ChangeBackground from "./ChangeBackground";

export default function ChangeSettings(props) {
    return (
        <>
            <button type="button" onClick={() => props.changeSettingsOpen()}
                    className="btn btn-sm m-1 position-absolute close-settings-btn">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16"
                     className="bi bi-x svg-close-settings-btn" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            <div className="mt-4">
                <h4 className="mt-1 ml-1">Сменить фон: </h4>
                <ChangeBackground
                    changeBackground={props.changeBackground}/>
            </div>
        </>
    );
}