import React from "react";
import ChangeSettings from './Settings/ChangeSettings';
import {dbPromise, idbKeyval} from './DBActions';
import Directories from "./Directories/Directories";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: false,
            db: dbPromise,
            dirs: [],
            primaryColor: {id: -1, value: ''},
            backgroundUrl: {id: -1, value: ''},
            backgroundColor: {id: -1, value: ''}
        };

        this.updateDirs = this.updateDirs.bind(this);
        this.clear = this.clear.bind(this);
        this.setAndChangeSettings = this.setAndChangeSettings.bind(this);
        this.changeRootBySettings = this.changeRootBySettings.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
    }

    componentDidMount() {
        this.updateDirs();
        idbKeyval.getAll('settings').then(settings => {
            for (let item of settings) {
                if (item.name === 'url') {
                    this.setAndChangeSettings('backgroundUrl', item);
                }
                if (item.name === 'color') {
                    this.setAndChangeSettings('backgroundColor', item);
                }
                if (item.name === 'color_primary') {
                    this.changePrimaryColor(item);
                }
            }
            this.changeRootBySettings();
        });
    }

    setAndChangeSettings(name, value) {
        this.setState({[name]: value}, () => {
            this.changeRootBySettings();
        })
    }

    changeRootBySettings() {
        const root = document.getElementById('root');
        root.style.backgroundImage = 'none';
        root.style.background = 'none';
        if (this.state.backgroundColor.id !== -1) {
            root.style.background = this.state.backgroundColor.value;
        }
        if (this.state.backgroundUrl.id !== -1) {
            root.style.backgroundImage = `url(${this.state.backgroundUrl.value})`;
        }
    }

    changePrimaryColor(item) {
        this.setState({primaryColor: item}, () =>
            document.documentElement.style.setProperty('--primary-color',
                this.state.primaryColor.value)
        );
    }

    updateDirs() {
        idbKeyval.getAll('dirs').then(dirs => {
            idbKeyval.getAll('todos').then(todos => {
                let res = [];
                for (let dir of dirs) {
                    res.push({
                        dir: dir,
                        todos: todos.filter(x =>
                            x.dir_id === dir.id).sort((a, b) => a.order - b.order)
                    })
                }
                res.sort((a, b) => a.order - b.order);
                this.setState({dirs: res});
            })
        });
    }

    addNewDir() {
        idbKeyval.add('dirs', {
            title: 'New list',
            order: this.state.dirs.length
        })
            .then(() => this.updateDirs());
    }

    clear() {
        idbKeyval.clear('todos').then(() =>
            idbKeyval.clear('dirs').then(() => this.updateDirs()));
    }

    setNewSettingsPanelPosition() {
        this.setState(state => ({
            isOpenSettings: !state.isOpenSettings
        }), () => {
            if (this.state.isOpenSettings) {
                const settingsPanel = document.getElementById('settings');
                settingsPanel.style.animation = 'open-settings-panel 1s';
            }
        })
    }

    changeSettingsOpenState() {
        if (this.state.isOpenSettings) {
            const settingsPanel = document.getElementById('settings');
            settingsPanel.style.animation = 'close-settings-panel 1s';
            setTimeout(() => this.setNewSettingsPanelPosition(), 1000);
        } else this.setNewSettingsPanelPosition();
    }

    render() {
        return (
            <div className="container-xl">
                {
                    this.state.isOpenSettings &&
                    <div id="settings" className="settings-panel position-absolute">
                        <ChangeSettings
                            primaryColor={this.state.primaryColor}
                            backgroundColor={this.state.backgroundColor}
                            backgroundUrl={this.state.backgroundUrl}
                            changePrimaryColor={this.changePrimaryColor}
                            setAndChangeSettings={this.setAndChangeSettings}
                            changeSettingsOpen={() => this.changeSettingsOpenState()}/>
                    </div>
                }
                <div>
                    <div className="row">
                        <button type="button"
                                className="btn btn-outline-primary text-button m-2"
                                onClick={() => this.addNewDir()}>Новый список
                        </button>
                        <button type="button"
                                className="btn btn-outline-primary text-button m-2"
                                onClick={() => this.clear()}>Очистить все
                        </button>
                        <div className="spacer"/>
                        <button type="button" onClick={() => this.changeSettingsOpenState()}
                                className="btn btn-outline-primary text-button m-2">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
                                </svg>
                            </svg>
                        </button>
                    </div>
                    <div className="row directories-scroll">
                        <Directories
                            updateDirs={this.updateDirs}
                            dirs={this.state.dirs}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
