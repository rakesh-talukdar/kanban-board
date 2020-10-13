import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateTask } from '../redux/actions/taskActions';


const UpdateTask = (props) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });

    useEffect(() => {
        axios.get(`http://localhost:3000/tasks/${props.taskId}`)
            .then((response) => {
                const data = response.data;
                setTask(data.task)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [props.taskId])

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
                    value={task}
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
        // taskId: state.tasks.task.id,
    };
};


export default connect(mapStateToProps)(UpdateTask);