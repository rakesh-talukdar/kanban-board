import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';
import Form from './form';

const UpdateTask = (props) => {
    const handleSubmit = (task) => {
        const data = {
            task: task.trim(),
        };

        props.dispatch(updateTask(props.taskId, data))
        props.toggle();
    };

    return (
        <div className='modal'>
            <Form task={props.task} focus={true} onSubmit={handleSubmit} buttonName='Update' />
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        task: state.tasks.task.task,
    };
};


export default connect(mapStateToProps)(UpdateTask);