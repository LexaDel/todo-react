import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

const store = observable(
    {
        todos: JSON.parse(window.localStorage.getItem('TodoStore')) || [],
        isOpenModal: false,
        _editTask: null,

        saveToLocalStorage() {
            window.localStorage.setItem(
                'TodoStore',
                JSON.stringify(this.todos)
            );
        },

        addTask(task) {
            this.todos.push(task);
        },

        openModal() {
            this.isOpenModal = true;
        },

        closeModal() {
            this.isOpenModal = false;
        },

        setEditTask(task) {
            this._editTask = task;
        },

        getEditTask() {
            return this._editTask;
        },

        editTask(property, value) {
            if (!this._editTask) {
                this._editTask = {
                    id: 0,
                    title: '',
                    description: '',
                    completed: false,
                };
            }
            this._editTask[property] = value;
        },

        resetTask({ title, description }) {
            console.log(this._editTask);
            this._editTask.title = title;
            this._editTask.description = description;
            this.saveToLocalStorage();
            this._editTask = null;
        },

        updateTask() {
            this._editTask = null;
            this.saveToLocalStorage();
        },

        removeTask(task) {
            task.isDelete = true;
            this.todos = this.todos.filter((todo) => !todo.isDelete);
            this.saveToLocalStorage();
        },

        toggleCompletedTask(task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
        },
    },
    {
        addTask: action,
        openModal: action,
        closeModal: action,
        setEditTask: action,
        getEditTask: action,
        updateTask: action,
        removeTask: action,
        toggleCompletedTask: action,
        editTask: action,
        resetTask: action,
    }
);

export default store;
