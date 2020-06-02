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

class Task extends React.Component {
    handleOpenEditModal = () => {
        this.props.store.setEditTask(this.props.task);
        this.props.store.openModal();
    };

    handleRemoveTask = () => {
        this.props.store.removeTask(this.props.task);
    };

    handleToggleCompletedTask = () => {
        this.props.store.toggleCompletedTask(this.props.task);
    };

    render() {
        const { task } = this.props;
        return (
            <ListItem>
                <ListItemText primary={task.title} />
                <ListItemSecondaryAction>
                    <Checkbox
                        color="primary"
                        checked={task.completed}
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

export default inject('store')(observer(Task));
