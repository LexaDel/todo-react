import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

class Todo extends React.Component {
    handleOpenEditModal = () => {
        this.props.store.setEditTask(this.props.todo);
        this.props.store.openModal();
    };

    handleRemoveTask = () => {
        this.props.store.removeTask(this.props.todo);
    };

    handleToggleCompletedTask = () => {
        this.props.store.toggleCompletedTask(this.props.todo);
    };

    render() {
        const { todo } = this.props;
        return (
            <ListItem>
                <ListItemText primary={todo.title} />
                <ListItemSecondaryAction>
                    <Checkbox
                        color="primary"
                        checked={todo.completed}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        onChange={this.handleToggleCompletedTask}
                    />
                    <IconButton
                        onClick={this.handleOpenEditModal}
                        edge="end"
                        aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={this.handleRemoveTask}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default inject('store')(observer(Todo));
