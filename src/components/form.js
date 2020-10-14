import React, { useState } from 'react';

const Form = (props) => {
    const [task, setTask] = useState(props.task || '');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.length > 2) {
            props.onSubmit(task)
            setTask('');
            setError({ hasError: false, errorMsg: '', });
        } else {
            setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
        }
    };


    return (
        <>
            <p className='error-display'>{error.hasError === true && error.errorMsg}</p>
            <form className='add-task-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='add-task-input'
                    name='task'
                    autoFocus={props.focus}
                    placeholder='Add task'
                    onChange={handleChange}
                    value={task}
                />
                <button type='submit' className='add-task-btn'>{props.buttonName}</button>
            </form>
        </>
    );
};

export default Form;