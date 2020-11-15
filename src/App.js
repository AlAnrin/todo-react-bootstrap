import './App.css';
import './custom.scss';
import React from "react";
import ChangeSettings from './Settings/ChangeSettings'
import {dbPromise, idbKeyval} from './DBActions';
import Directories from "./Directories/Directories";

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: false,
            db: dbPromise,
            dirs: []
        };

        this.changeBackground = this.changeBackground.bind(this);
        this.addNewTODO= this.addNewTODO.bind(this);
        this.clear = this.clear.bind(this);

        this.updateDirs();
    }

    updateDirs() {
        idbKeyval.getAll('dirs').then(dirs => {
            idbKeyval.getAll('todos').then(todos => {
                let res = [];
                for (let dir of dirs) {
                    res.push({
                        dir: dir,
                        todos: todos.filter(x =>
                            x.dir_id === dir.id)
                    })
                }
                this.setState({dirs: res});
            })
        });
    }

    addNewDir() {
        idbKeyval.add('dirs', {title: 'New list'}).then(() => this.updateDirs());
    }
    addNewTODO(dir) {
        idbKeyval.add('todos', {
            title: 'New todo',
            describe: 'new',
            data: Date.now().toLocaleString(),
            dir_id: dir.id
        }).then(() => this.updateDirs());
    }

    clear(type) {
        idbKeyval.clear(type).then(() => this.updateDirs())
    }

    setNewSettingsPanelPosition() {
        this.setState(state => ({
            isOpenSettings: !state.isOpenSettings
        }), () => {
            if (this.state.isOpenSettings) {
                const settingsPanel = document.getElementById('settings');
                settingsPanel.style.animation = 'open-settings-panel 2s';
            }
        })
    }

    changeSettingsOpen() {
        if (this.state.isOpenSettings) {
            const settingsPanel = document.getElementById('settings');
            settingsPanel.style.animation = 'close-settings-panel 2s';
            setTimeout(() => this.setNewSettingsPanelPosition(), 2000);
        }
        else this.setNewSettingsPanelPosition();
    }

    changeBackground(new_url) {
        const root = document.getElementById('root');
        if (new_url instanceof Object) {
            root.style.backgroundImage = 'none';
            root.style.background = new_url.code;
        }
        else {
            root.style.background = 'transparent';
            root.style.backgroundImage = `url(${new_url})`;
            this.changeSettingsOpen();
        }
    }

    render() {
        return (
            <div className="container-xl">
                <>
                    {
                        this.state.isOpenSettings ?
                            <div id="settings" className="settings-panel position-absolute">
                                <ChangeSettings
                                    changeBackground={this.changeBackground}
                                    changeSettingsOpen={() => this.changeSettingsOpen()}/>
                            </div>
                            :
                            <div>
                                <div className="row">
                                    <div className="spacer"/>
                                    <button type="button" onClick={() => this.changeSettingsOpen()}
                                            className="btn btn-outline-primary m-2">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
                                            </svg>
                                        </svg>
                                    </button>
                                </div>
                                <button type="button"
                                        className="btn btn-outline-primary m-2"
                                        onClick={() => this.addNewDir()}>Add</button>
                                <button type="button"
                                        className="btn btn-outline-primary m-2"
                                        onClick={() => this.clear('dirs')}>Clear</button>
                                <div className="row directories-scroll">
                                    <Directories
                                        addNewTODO={this.addNewTODO}
                                        clear={this.clear}
                                        dirs={this.state.dirs}/>
                                </div>
                            </div>
                    }
                </>
            </div>
        );
    }
}

export default App;
