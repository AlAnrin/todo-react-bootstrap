import React from "react";
import TitleWithInput from "./TitleWithInput";
import {idbKeyval} from "../DBActions";

export default class Directories extends React.Component {
    constructor(props) {
        super(props);

        this.addNewTODO= this.addNewTODO.bind(this);
        this.deleteDir = this.deleteDir.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    addNewTODO(dir) {
        idbKeyval.add('todos', {
            title: 'New todo',
            describe: 'new',
            data: new Date().toISOString(),
            dir_id: dir.dir.id,
            order: dir.todos.length
        }).then(() => this.props.updateDirs());
    }

    deleteDir(key) {
        idbKeyval.delete('dirs', key)
            .then(() => {
                this.props.dirs.splice(this.props.dirs.findIndex(x =>x.dir.id === key), 1);
                this.promiseAllNewOrderSetInDb(this.props.dirs, 'dirs');
            });
    }

    deleteToDo(key) {
        idbKeyval.get('todos', key)
            .then(todo => {
                    let dir = this.props.dirs.find(x => x.dir.id === todo.dir_id);
                    idbKeyval.delete('todos', key)
                        .then(() => {
                            dir.todos.splice(dir.todos.findIndex(x => x.id === todo.id), 1);
                            this.promiseAllNewOrderSetInDb(dir.todos, 'todos');
                        })
                }
            )
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
            .then(() => this.props.updateDirs());
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
            <>
                {
                    this.props.dirs.length !== 0 &&
                    this.props.dirs.map(dir =>
                        <div key={dir.dir.id} className="directory-card card-border p-2 m-2 droppable"
                             onDrop={event => this.onDrop(event, dir)}
                             onDragOver={event => this.onDragOver(event)}>
                            <TitleWithInput table="dirs" deleteObj={this.deleteDir}
                                            obj={dir.dir} id={'dirs' + dir.dir.id}/>
                            <div className="todos-scroll">
                                {
                                    dir.todos.map(todo =>
                                        <TitleWithInput table="todos"
                                                        deleteObj={this.deleteToDo}
                                                        key={'todo' + todo.id}
                                                        obj={todo}
                                                        id={'todos/dir' + dir.dir.id + '/todo:' + todo.id}/>
                                    )
                                }
                            </div>
                            <button type="button"
                                    className="btn btn-outline-primary text-button m-1"
                                    onClick={() => this.addNewTODO(dir)}>Добавить
                            </button>
                        </div>
                    )
                }
            </>
        )
    }
}