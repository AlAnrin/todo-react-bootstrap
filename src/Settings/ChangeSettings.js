import React from "react";
import ChangeBackground from "./ChangeBackground";
import ChangeColor from "./ChangeColor";
import {idbKeyval} from "../DBActions";

export default class ChangeSettings extends React.Component {
    table = 'settings';

    back_colors = [
        {color: 'Purple', code: 'rgba(162,86,165,0.82)'},
        {color: 'Soft pink', code: '#ce87a4'},
        {color: 'Blue', code: '#808dbf'},
        {color: 'Cyan', code: '#84b8ad'},
        {color: 'Green', code: '#9fc197'},
        {color: 'Orange', code: '#d7c090'},
        {color: 'Peach', code: '#d7ae99'},
        {color: 'Black', code: '#000000'},
    ];

    primary_colors = [
        {color: 'Red', code: '#a51212'},
        {color: 'Dark purple', code: '#5c0836'},
        {color: 'Blue', code: '#052286'},
        {color: 'Cyan', code: '#085e4e'},
        {color: 'Green', code: '#1a6a09'},
        {color: 'Orange', code: '#db9808'},
        {color: 'Peach', code: '#ac3807'},
        {color: 'Dark', code: '#3b3939'},
    ]

    constructor(props) {
        super(props);
        this.state = {
            primaryColor: props.primaryColor,
            backgroundUrl: props.backgroundUrl,
            backgroundColor: props.backgroundUrl
        }

        this.clearSettings = this.clearSettings.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changeBackgroundToUrl = this.changeBackgroundToUrl.bind(this);
        this.changeBackgroundToColor = this.changeBackgroundToColor.bind(this);
    }

    clearSettings() {
        idbKeyval.clear(this.table).then(() => {
            let style = getComputedStyle(document.body);
            let primary = style.getPropertyValue('--primary');
            const nullObjSetting = {id: -1, value: ''};
            this.props.setAndChangeSettings('backgroundUrl', {...nullObjSetting});
            this.props.setAndChangeSettings('backgroundColor', {...nullObjSetting});
            idbKeyval.add(this.table, {
                name: 'color_primary',
                value: primary
            }).then(item => {
                this.props.changePrimaryColor(item);
            });
        });
    }

    changePrimaryColor(code) {
        const newColor = {
            id: this.props.primaryColor.id,
            name: 'color_primary',
            value: code
        }
        idbKeyval.set(this.table, newColor).then(id => {
            if (this.props.primaryColor.id !== id) {
                newColor.id = id;
                idbKeyval.delete(this.table, this.props.primaryColor.id)
            }
            this.setState({primaryColor: newColor});
            this.props.changePrimaryColor(newColor);
        });
    }

    changeBackgroundToUrl(url) {
        const newItem = {
            name: 'url',
            value: url
        };
        idbKeyval.add(this.table, newItem).then(id => {
            newItem.id = id;
            if (this.props.backgroundUrl.id !== -1)
                idbKeyval.delete(this.table, this.props.backgroundUrl.id)
            this.setState({backgroundUrl: newItem});
            if (this.props.backgroundColor.id !== -1) {
                idbKeyval.delete(this.table, this.props.backgroundColor.id);
                this.setState({backgroundColor: {id: -1, value: ''}});
                this.props.setAndChangeSettings('backgroundColor', {id: -1, value: ''});
            }
            this.props.setAndChangeSettings('backgroundUrl', newItem);
        });
    }

    changeBackgroundToColor(code) {
        const newItem = {
            name: 'color',
            value: code
        };
        idbKeyval.add(this.table, newItem).then(id => {
            newItem.id = id;
            if (this.props.backgroundColor.id !== -1)
                idbKeyval.delete(this.table, this.props.backgroundColor.id)
            this.setState({backgroundColor: newItem});
            if (this.props.backgroundUrl.id !== -1) {
                idbKeyval.delete(this.table, this.props.backgroundUrl.id);
                this.setState({backgroundUrl: {id: -1, value: ''}});
                this.props.setAndChangeSettings('backgroundUrl', {id: -1, value: ''});
            }
            this.props.setAndChangeSettings('backgroundColor', newItem);
        });
    }

    render() {
        return (
            <>
                <button type="button" onClick={() => this.props.changeSettingsOpen()}
                        className="btn btn-sm m-1 position-absolute close-settings-btn">
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16"
                         className="bi bi-x svg-close-settings-btn" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                <div className="mt-4">
                    <ChangeBackground
                        colors={this.colors}
                        changeBackgroundToUrl={this.changeBackgroundToUrl}/>
                    <h4 className="mt-1 ml-1">или выберите цвет: </h4>
                    <ChangeColor
                        currentColor={this.props.backgroundColor}
                        changeColorFunc={this.changeBackgroundToColor}
                        colors={this.back_colors}/>
                </div>
                <h4 className="mt-1 ml-1">Сменить цвет кнопок: </h4>
                <ChangeColor
                    currentColor={this.props.primaryColor}
                    changeColorFunc={this.changePrimaryColor}
                    colors={this.primary_colors}/>
                <button type="button"
                        className="btn btn-outline-primary text-button m-2"
                        onClick={this.clearSettings}>Очистить стили
                </button>
            </>
        )
    }
}