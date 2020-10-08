import React, { useState } from 'react';
import UpdateTask from './updateTaskComponent';

const CompletedTaskList = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(false);
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });



    const displayCompletedTaskList = () => {
        if (props.tasks !== undefined) {
            const completedTasks = props.tasks.filter((task) => task.status === 'completed')
                .map((task) => {
                    return (
                        <li key={task.id} className='task-card' draggable>
                            <span onClick={() => { toggleUpdateTaskForm(task.id) }} className={'task-title'}>{task.task}</span>
                            <button className='delete-task-btn' id={task.id} onClick={handleDelete}>X</button>
                        </li>
                    );
                });
            return completedTasks;
        } else {
            return null;
        }
    };


    const handleChange = (event) => {
        setTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.length > 2) {
            const status = 'completed';
            props.onSubmit(task, status);
            setTask('');
            setError({ hasError: false, errorMsg: '', });
        } else {
            setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
        }
    };


    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        props.onDelete(taskId);
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
        props.onUpdate();
    };


    return (
        < div className='task-list-card' >
            <header className='task-list-header'>
                <h3 >Completed</h3>
            </header>
            <ul className='task-list'>
                {showUpdateTaskForm === true ? <UpdateTask taskId={taskId} toggle={toggleUpdateTaskForm} /> : null}
                {displayCompletedTaskList()}
            </ul>
            <p className='error-display'>{error.hasError === true && error.errorMsg}</p>
            <form className='add-task-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='add-task-input'
                    name='task'
                    placeholder='Add task'
                    onChange={handleChange}
                    value={task}
                />
                <button type='submit' className='add-task-btn'>Add</button>
            </form>
        </div>
    );
};

export default CompletedTaskList;