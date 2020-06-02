import React from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';

class TodoList extends React.Component {
    handleAdd = () => {
        const { todos } = this.props.store;
        this.props.store.add({
            id: todos.length + 1,
            title: `todo_${todos.length + 1}`,
        });
    };
    render() {
        console.log(this.props.store.todos);
        return (
            <>
                <div>TodoList</div>
                <Button onClick={this.handleAdd}>+</Button>
                <div>
                    {this.props.store.todos.map((todo) => (
                        <span key={todo.id}>{todo.title}</span>
                    ))}
                </div>
            </>
        );
    }
}

export default inject('store')(observer(TodoList));
