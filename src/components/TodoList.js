import React from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import Modal from './Modal';

class TodoList extends React.Component {
    handleOpenModal = () => {
        this.props.store.openModal();
    };
    render() {
        const { todos } = this.props.store;
        return (
            <>
                <div>TodoList</div>
                <Button variant="outlined" onClick={this.handleOpenModal}>
                    New Todo
                </Button>
                <Modal title="New Todo" />
                <div>
                    {todos.map((todo) => (
                        <span key={todo.id}>{todo.title}</span>
                    ))}
                </div>
            </>
        );
    }
}

export default inject('store')(observer(TodoList));
