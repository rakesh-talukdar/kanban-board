import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateTask = (props) => {
    const [task, setTask] = useState('');

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    useEffect(() => {
        const fetchTask = (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${props.taskId}`);
                const data = response.data;
                setTask(data.task);

            } catch (error) {
                console.error('Error ', error)
            }
        })();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                task,
            }
            if (data.task.length > 2) {
                const response = await axios({
                    method: 'patch',
                    url: `http://localhost:3000/tasks/${props.taskId}`,
                    data
                })
                setTask('');
                props.toggle();
            }
        } catch (error) {
            console.error("Oops error occurred: ", error);
        }
    };

    return (
        <div className='modal'>
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