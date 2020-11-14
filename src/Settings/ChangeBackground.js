import React, {useState} from "react";

export default function ChangeBackground(props) {
    const [url, setUrl] = useState('');
    const [currentColor, setColor] = useState({
        color: '', code: ''
    });

    const colors = [
        {color: 'Soft pink', code: '#ce6991'},
        {color: 'Blue', code: '#5e76c4'},
        {color: 'Orange', code: '#ffb432'},
        {color: 'Green', code: '#69d452'},
        {color: 'Purple', code: '#b721d0'},
    ];

    function changeColorBackground(color) {
        setColor(color)
    }

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
                            onClick={() => props.changeBackground(url)}
                            type="button" id="button-addon2">Load</button>
                </div>
            </div>
            <h4 className="mt-1 ml-1">или выберите цвет: </h4>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    colors.map(color =>
                        <div key={color.code}
                             onClick={() => {
                                 setColor(color);
                                 props.changeBackground(color)}}
                             className={currentColor.code === color.code ?
                                 'active-color-card color-card' : 'color-card'}
                             style={{background: color.code}}/>)
                }
            </div>
        </div>
    )
}