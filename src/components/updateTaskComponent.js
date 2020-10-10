import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateTask = (props) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });


    const handleChange = (event) => {
        setTask(event.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${props.taskId}`);
                const data = response.data;
                setTask(data.task);
            } catch (error) {
                console.error('Error ', error)
            }
        })();
    }, [props.taskId])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                task: task.trim(),
            }
            if (data.task.length > 2) {
                await axios({
                    method: 'patch',
                    url: `http://localhost:3000/tasks/${props.taskId}`,
                    data
                })
                setTask('');
                setError({ hasError: false, errorMsg: '', });
                props.toggle();
            } else {
                setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
            }
        } catch (error) {
            console.error("Oops error occurred: ", error);
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

export default UpdateTask;