import { openDB } from 'idb';

export const dbPromise = openDB('store', 8, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('settings')) {
            let dirs = db.createObjectStore('settings',
                {keyPath: 'id', autoIncrement: true});
            dirs.createIndex('name', 'name', {unique: false});
            dirs.createIndex('value', 'value', {unique: false});
        }
        if (!db.objectStoreNames.contains('dirs')) {
            let dirs = db.createObjectStore('dirs',
                {keyPath: 'id', autoIncrement: true});
            dirs.createIndex('title', 'title', {unique: false});
            dirs.createIndex('order', 'order', {unique: false});
        }
        if (!db.objectStoreNames.contains('todos')) {
            let todos = db.createObjectStore('todos',
                {keyPath: 'id', autoIncrement: true});
            todos.createIndex('title', 'title', {unique: false});
            todos.createIndex('describe', 'describe', {unique: false});
            todos.createIndex('data', 'data', {unique: false});
            todos.createIndex('dir_id', 'dir_id', {unique: false});
            todos.createIndex('order', 'order', {unique: false});
        }
    },
});

export const idbKeyval = {
    async get(table, key) {
        return (await dbPromise).get(table, key);
    },
    async getAll(table) {
        return (await dbPromise).getAll(table);
    },
    async add(table,val) {
        return (await dbPromise).add(table, val);
    },
    async set(table, val) {
        return (await dbPromise).put(table, val);
    },
    async delete(table,key) {
        return (await dbPromise).delete(table, key);
    },
    async clear(table) {
        return (await dbPromise).clear(table);
    },
    async keys(table) {
        return (await dbPromise).getAllKeys(table);
    },
};