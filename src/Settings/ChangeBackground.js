import React, {useState} from "react";

export default function ChangeBackground(props) {
    const [url, setUrl] = useState('');

    return (
        <div className="p-1">
            <h4 className="mt-1 ml-1">Сменить фон: </h4>
            <div className="input-group">
                <input type="text" className="form-control"
                       value={url}
                       onChange={event => setUrl(event.target.value)}
                       aria-describedby="backgroundInput"/>
                <div className="input-group-append">
                    <button className="btn btn-secondary"
                            onClick={() => props.changeBackgroundToUrl(url)}
                            type="button" id="button-addon2">Загрузить</button>
                </div>
            </div>
        </div>
    )
}