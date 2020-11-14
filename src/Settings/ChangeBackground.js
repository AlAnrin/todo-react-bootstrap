import React, {useState} from "react";

export default function ChangeBackground(props) {
    const [url, setUrl] = useState('');

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                       value={url}
                       onChange={event => setUrl(event.target.value)}
                       aria-describedby="backgroundInput"/>
                <div className="input-group-append">
                    <button className="btn btn-secondary"
                            onClick={() => props.changeBackground(url)}
                            type="button" id="button-addon2">Load</button>
                </div>
            </div>
        </div>
    )
}