import React from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import Modal from './Modal';
import { Grid, List } from '@material-ui/core';
import Task from './Task';

class TaskList extends React.Component {
    handleOpenModal = () => {
        this.props.store.openModal();
    };

    render() {
        const { tasks } = this.props.store;
        const sortedTasks = tasks.sort((a, b) => {
            return a.title === b.title ? 0 : a.title < b.title ? 1 : -1;
        });
        return (
            <>
                <h1>TodoList</h1>
                <Button variant="outlined" onClick={this.handleOpenModal}>
                    New task
                </Button>
                <Modal />
                <Grid>
                    <Grid item xs={6} md={2}>
                        <List>
                            {sortedTasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default inject('store')(observer(TaskList));
