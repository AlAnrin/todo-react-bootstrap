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
            dirs: [],
            background_url: '',
            background_color: ''
        };

        this.changeBackground = this.changeBackground.bind(this);
        this.addNewTODO= this.addNewTODO.bind(this);
        this.deleteDir = this.deleteDir.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.clear = this.clear.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.updateDirs();
        idbKeyval.getAll('settings').then(settings => {
            for (let item of settings) {
                if (item.name === 'url') {
                    this.setState({
                        background_url: item.value,
                        background_color: ''
                    }, () => {
                        this.changeStyleRoot();
                    })
                }
                if (item.name === 'color')
                    this.setState({
                        background_url: '',
                        background_color: item.value
                    }, () => {
                        this.changeStyleRoot();
                    })
            }
        });
    }

    updateDirs() {
        idbKeyval.getAll('dirs').then(dirs => {
            idbKeyval.getAll('todos').then(todos => {
                let res = [];
                for (let dir of dirs) {
                    res.push({
                        dir: dir,
                        todos: todos.filter(x =>
                            x.dir_id === dir.id).sort((a,b) => a.order - b.order)
                    })
                }
                res.sort((a,b) => a.order - b.order);
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

    addNewTODO(dir) {
        idbKeyval.add('todos', {
            title: 'New todo',
            describe: 'new',
            data: new Date().toISOString(),
            dir_id: dir.dir.id,
            order: dir.todos.length
        }).then(() => this.updateDirs());
    }

    deleteDir(key) {
        idbKeyval.delete('dirs', key)
            .then(() => {
                this.state.dirs.splice(this.state.dirs.findIndex(x =>x.dir.id === key), 1);
                this.promiseAllNewOrderSetInDb(this.state.dirs, 'dirs');
            });
    }

    deleteToDo(key) {
        idbKeyval.get('todos', key)
            .then(todo => {
                    let dir = this.state.dirs.find(x => x.dir.id === todo.dir_id);
                    idbKeyval.delete('todos', key)
                        .then(() => {
                            dir.todos.splice(dir.todos.findIndex(x => x.id === todo.id), 1);
                            this.promiseAllNewOrderSetInDb(dir.todos, 'todos');
                        })
                }
            )
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
        }
        else this.setNewSettingsPanelPosition();
    }

    changeStyleRoot() {
        const root = document.getElementById('root');
        root.style.backgroundImage = 'none';
        root.style.background = 'transparent';
        if (this.state.background_color) {
            root.style.background = this.state.background_color;
        }
        if (this.state.background_url) {
            root.style.backgroundImage = `url(${this.state.background_url})`;
        }
    }

    changeBackground(new_url) {
        idbKeyval.delete('settings', 'url');
        idbKeyval.delete('settings', 'color');
        if (new_url instanceof Object) {
            this.setState({
                background_url: '',
                background_color: new_url.code
            })
            idbKeyval.add('settings', {
                name: 'color',
                value: new_url.code
            }).then(() => this.changeStyleRoot());
        }
        else {
            this.setState({background_url: new_url});
            idbKeyval.add('settings', {
                name: 'url',
                value: new_url
            }).then(() => this.changeStyleRoot());
            this.changeSettingsOpenState();
        }
    }

    onDragOver(event) {
        event.preventDefault();
    }

    promiseAllNewOrderSetInDb(list, table) {
        let order = 0;
        let promises = [];
        for (let val of list) {
            if (table === 'todos') {
                val.order = order;
                promises.push(idbKeyval.set(table, val));
            }
            else {
                val.dir.order = order;
                promises.push(idbKeyval.set(table, val.dir));
            }
            order++;
        }
        Promise.all(
            promises
        )
            .then(() => this.updateDirs());
    }

    setNewOrderInListOfToDos(todo, dir) {
        dir.todos = dir.todos.sort((a,b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            if (a.order === b.order) {
                if (a.id === todo.id)
                    return -1;
                else return 1;
            }

            return 0;
        });
        this.promiseAllNewOrderSetInDb(dir.todos, 'todos');
    }

    onDrop(event, dir) {
        const id = +event.dataTransfer.getData('obj');
        idbKeyval.get('todos', id).then(todo => {
            if (todo.dir_id !== dir.dir.id) {
                todo.dir_id = dir.dir.id;
                todo.order = dir.todos.length;
                idbKeyval.set('todos', todo)
                    .then(() => this.updateDirs());
            }
            else {
                const target_id = event.target.id;
                if (target_id) {
                    let new_id = +target_id.split(':')[1];
                    if (new_id !== id) {
                        idbKeyval.get('todos', new_id)
                            .then(new_todo => {
                                todo.order = new_todo.order + 1;
                                dir.todos.find(x => x.id === todo.id).order = new_todo.order + 1;
                                this.setNewOrderInListOfToDos(todo, dir);
                            })
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className="container-xl">
                <>
                    {
                        this.state.isOpenSettings &&
                        <div id="settings" className="settings-panel position-absolute">
                            <ChangeSettings
                                changeBackground={this.changeBackground}
                                changeSettingsOpen={() => this.changeSettingsOpenState()}/>
                        </div>
                    }
                    <div>
                        <div className="row">
                            <button type="button"
                                    className="btn btn-outline-primary m-2"
                                    onClick={() => this.addNewDir()}>Новый список</button>
                            <button type="button"
                                    className="btn btn-outline-primary m-2"
                                    onClick={() => this.clear()}>Очистить все</button>
                            <div className="spacer"/>
                            <button type="button" onClick={() => this.changeSettingsOpenState()}
                                    className="btn btn-outline-primary m-2">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
                                    </svg>
                                </svg>
                            </button>
                        </div>
                        <div className="row directories-scroll">
                            <Directories
                                onDrop={this.onDrop}
                                onDragOver={this.onDragOver}
                                deleteDir={this.deleteDir}
                                deleteTodo={this.deleteToDo}
                                addNewTODO={this.addNewTODO}
                                clear={this.clear}
                                dirs={this.state.dirs}/>
                        </div>
                    </div>
                </>
            </div>
        );
    }
}

export default App;
