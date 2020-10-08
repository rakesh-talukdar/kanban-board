import React, { useState, useEffect } from 'react';
import UpdateTask from './updateTaskComponent';

const Todo = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(false);


    const displayTodoList = () => {
        if (props.tasks !== undefined) {
            const todoTasks = props.tasks.filter((task) => task.status === 'todo')
                .map((task) => {
                    return (
                        <li key={task.id} className='task-card' draggable>
                            <span onClick={() => { toggleUpdateTaskForm(task.id) }} className={'task-title'}>{task.task}</span>
                            <button className='delete-task-btn' id={task.id} onClick={handleDelete}>X</button>
                        </li>
                    );
                });
            return todoTasks;
        } else {
            return null;
        }
    };


    const handleChange = (event) => {
        props.onChange(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const status = 'todo'
        props.onSubmit(status)
    }


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
                <h3 >Todo</h3>
            </header>
            <ul className='task-list'>
                {showUpdateTaskForm === true ? <UpdateTask taskId={taskId} toggle={toggleUpdateTaskForm} /> : null}
                {displayTodoList()}
            </ul>
            <p className='error-display'>{props.error.hasError === true && props.error.errorMsg}</p>
            <form className='add-task-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='add-task-input'
                    name='task'
                    placeholder='Add task'
                    onChange={handleChange}
                    value={props.task}
                />
                <button type='submit' className='add-task-btn'>Add</button>
            </form>
        </div >
    );
};

export default Todo;
