import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';


const UpdateTask = (props) => {
    const [task, setTask] = useState(props.task || '');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });

    const handleChange = (event) => {
        setTask(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            task: task.trim(),
        }
        if (data.task.length > 2) {
            props.dispatch(updateTask(props.taskId, data))
            setTask('');
            setError({ hasError: false, errorMsg: '', });
            props.toggle();
        } else {
            setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
        }
    };


    return (
        <div className='modal'>
            <p className='error-display'>{error.hasError === true && error.errorMsg}</p>
            <form className='add-task-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='add-task-input'
                    name='task'
                    onChange={handleChange}
                    defaultValue={task}
                    autoFocus
                />
                <button type='submit' className='add-task-btn'>Update</button>
            </form>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        task: state.tasks.task.task,
    };
};


export default connect(mapStateToProps)(UpdateTask);