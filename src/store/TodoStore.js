import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed', computedRequiresReaction: true });

const store = observable(
    {
        todos: JSON.parse(window.localStorage.getItem('TodoStore')) || [],
        isOpenModal: false,
        editTask: {},

        saveToLocalStorage() {
            window.localStorage.setItem(
                'TodoStore',
                JSON.stringify(this.todos)
            );
        },

        addTask(task) {
            this.todos.push(task);
            this.saveToLocalStorage();
        },

        openModal() {
            this.isOpenModal = true;
        },

        closeModal() {
            this.isOpenModal = false;
        },

        setEditTask(task) {
            this.editTask = task;
        },

        getEditTask() {
            return this.editTask;
        },

        updateTask(newTask) {
            this.editTask.title = newTask.title;
            this.editTask.description = newTask.description;
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
    }
);

export default store;
