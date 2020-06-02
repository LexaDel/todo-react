import React from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import Modal from './Modal';
import { Grid, List } from '@material-ui/core';
import Todo from './Todo';

class TodoList extends React.Component {
    handleOpenModal = () => {
        this.props.store.openModal();
    };

    render() {
        const { todos } = this.props.store;
        const sortedTodos = todos.sort((a, b) => {
            return a.title === b.title ? 0 : a.title < b.title ? 1 : -1;
        });
        return (
            <>
                <h1>TodoList</h1>
                <Button variant="outlined" onClick={this.handleOpenModal}>
                    New Todo
                </Button>
                <Modal title="New Todo" />
                <Grid>
                    <Grid item xs={6} md={2}>
                        <List>
                            {sortedTodos.map((todo) => (
                                <Todo key={todo.id} todo={todo} />
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default inject('store')(observer(TodoList));
