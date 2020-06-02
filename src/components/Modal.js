import React from 'react';
import Portal from './Portal';
import Button from '@material-ui/core/Button';
import { TextField, Grid } from '@material-ui/core';
import './Modal.css';
import { inject, observer } from 'mobx-react';

class Modal extends React.Component {
    onSubmit = () => {
        const { _editTask } = this.props.store;
        if (_editTask.id === 0) {
            this.props.store.addTask({
                title: _editTask.title,
                description: _editTask.description,
                completed: false,
            });
        } else {
            this.props.store.updateTask();
        }
        this.props.store.closeModal();
    };

    onCancel = () => {
        this.props.store._editTask && this.props.store.resetTask();
        this.props.store.closeModal();
    };

    onChange = (e) => {
        this.props.store.editTask(e.target.name, e.target.value);
    };

    render() {
        const { isOpenModal, _editTask } = this.props.store;
        return (
            <>
                {isOpenModal && (
                    <Portal>
                        <div className="modal-overlay">
                            <div className="modal-window">
                                <div className="modal-header">
                                    <div className="modal-title">Task</div>
                                </div>
                                <div className="modal-body">
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="stretch">
                                        <Grid item xs={12}>
                                            <TextField
                                                name="title"
                                                label="Title"
                                                variant="outlined"
                                                fullWidth
                                                value={
                                                    _editTask
                                                        ? _editTask.title
                                                        : ''
                                                }
                                                onChange={this.onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="description"
                                                value={
                                                    _editTask
                                                        ? _editTask.description
                                                        : ''
                                                }
                                                onChange={this.onChange}
                                                label="Description"
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="modal-footer">
                                    <Button
                                        variant="outlined"
                                        onClick={this.onSubmit}>
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={this.onCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Portal>
                )}
            </>
        );
    }
}

export default inject('store')(observer(Modal));
