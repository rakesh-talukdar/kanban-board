import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';
import Form from './form';
import PropTypes from 'prop-types';

const UpdateTask = (props) => {
    const { task, dispatch, taskId, toggleUpdateModal } = props;
    const handleSubmit = (task) => {
        const data = {
            task: task.trim(),
        };

        dispatch(updateTask(taskId, data));
        toggleUpdateModal();
    };

    return (
        <div className='modal'>
            <Form task={task} focus={true} onSubmit={handleSubmit} buttonName='Update' />
        </div>
    );
};


UpdateTask.propTypes = {
    task: PropTypes.string,
    toggleUpdateModal: PropTypes.func.isRequired,
    taskId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        task: state.tasks.task.task,
    };
};


export default connect(mapStateToProps)(UpdateTask);