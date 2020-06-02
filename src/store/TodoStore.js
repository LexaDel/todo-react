import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

const store = observable(
    {
        todos: JSON.parse(window.localStorage.getItem('TodoStore')) || [],
        isOpenModal: false,

        add(todo) {
            this.todos.push(todo);
            window.localStorage.setItem(
                'TodoStore',
                JSON.stringify(this.todos)
            );
        },

        openModal() {
            this.isOpenModal = true;
        },

        closeModal() {
            this.isOpenModal = false;
        },
    },
    {
        add: action,
        openModal: action,
        closeModal: action,
    }
);

export default store;
