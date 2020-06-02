import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

const store = observable(
    {
        tasks: JSON.parse(window.localStorage.getItem('TaskStore')) || [],
        isOpenModal: false,
        _editTask: null,
        defaultTitle: '',
        defaultDescription: '',
        isError: false,

        saveToLocalStorage() {
            window.localStorage.setItem(
                'TaskStore',
                JSON.stringify(this.tasks)
            );
        },

        addTask(task) {
            task.id = Math.max(...this.tasks.map((task) => task.id)) + 1;
            this.tasks.push(task);
            this._editTask = null;
            this.saveToLocalStorage();
        },

        openModal() {
            this.isOpenModal = true;
        },

        closeModal() {
            this.isOpenModal = false;
        },

        setEditTask(task) {
            this._editTask = task;
            this.defaultTitle = task.title;
            this.defaultDescription = task.description;
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

        resetTask() {
            this._editTask.title = this.defaultTitle;
            this._editTask.description = this.defaultDescription;
            this._editTask = null;
            this.saveToLocalStorage();
        },

        updateTask() {
            this._editTask = null;
            this.saveToLocalStorage();
        },

        removeTask(task) {
            task.isDelete = true;
            this.tasks = this.tasks.filter((task) => !task.isDelete);
            this.saveToLocalStorage();
        },

        toggleCompletedTask(task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
        },

        error(state) {
            this.isError = state;
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
        error: action,
    }
);

export default store;
