import React from 'react';
import Portal from './Portal';
import Button from '@material-ui/core/Button';
import { TextField, Grid } from '@material-ui/core';
import './Modal.css';
import { inject, observer } from 'mobx-react';

class Modal extends React.Component {
    todo = {
        id: 0,
        title: '',
        description: '',
        completed: false,
    };

    onSubmit = () => {
        const { todos } = this.props.store;
        this.props.store.add({
            id: todos.length + 1,
            title: this.todo.title,
            description: this.todo.description,
            completed: false,
        });
        this.props.store.closeModal();
    };

    onCancel = () => {
        this.props.store.closeModal();
    };

    onChange = (e) => {
        this.todo[e.target.name] = e.target.value;
    };

    render() {
        const { title } = this.props;
        const { isOpenModal } = this.props.store;
        return (
            <>
                {isOpenModal && (
                    <Portal>
                        <div className="modal-overlay">
                            <div className="modal-window">
                                <div className="modal-header">
                                    <div className="modal-title">{title}</div>
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
                                                onChange={this.onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="description"
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
