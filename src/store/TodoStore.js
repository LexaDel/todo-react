import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

const store = observable(
    {
        todos: JSON.parse(window.localStorage.getItem('TodoStore')) || [],

        add(todo) {
            this.todos.push(todo);
            window.localStorage.setItem(
                'TodoStore',
                JSON.stringify(this.todos)
            );
        },
    },
    {
        add: action,
    }
);

export default store;
