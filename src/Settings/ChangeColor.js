import React from "react";

export default function ChangeColor(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
                props.colors.map(color =>
                    <div key={color.code}
                         onClick={() => props.changeColorFunc(color.code)}
                         className={props.currentColor.value === color.code ?
                             'active-color-card color-card' : 'color-card'}
                         style={{background: color.code}}/>)
            }
        </div>
    )
}