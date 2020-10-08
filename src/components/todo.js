import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateTask from './updateTaskComponent';

const Todo = (props) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(false);


    useEffect(() => {
        const getTodoList = (async () => {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                const data = response.data;
                setTasks(data);
                setTask('');
                setTaskDeleted(false);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [taskAdded, taskDeleted, showUpdateTaskForm]);




    const displayTodoList = () => {
        if (tasks !== undefined) {
            const todoTasks = tasks.map((task) => {
                if (task.status === 'todo') {
                    return (
                        <li key={task.id} className='task-card'>
                            <span onClick={() => { toggleUpdateTaskForm(task.id) }} className={'task-title'}>{task.task}</span>
                            <button className='delete-task-btn' id={task.id} onClick={handleTaskDelete}>X</button>
                        </li>
                    );
                }
            });
            return todoTasks;
        } else {
            return null;
        }
    };


    const handleTaskNameChange = (event) => {
        setTask(event.target.value);
    };



    const handleTaskSubmit = async (event) => {
        event.preventDefault();
        const data = {
            task,
            status: 'todo',
        };

        if (task.length > 2) {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/tasks',
                    data,
                });
                if (response.status === 201 || response.status === 200) {
                    setTaskAdded(true);
                }
            } catch (error) {
                setErrorMsg('Oops!! Couldn\'t able to add');
            }
        } else {
            setErrorMsg('Task length should be minimum 2 characters!!');
        }
    };

    const handleTaskDelete = async (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            if (response.status === 200) {
                setTaskDeleted(true);
            }
        } catch (error) {
            console.error('Oops!! Couldn\'t able to delete');
        }
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
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
            <p className='error-display'>{errorMsg}</p>
            <form className='add-task-form' onSubmit={handleTaskSubmit}>
                <input
                    type='text'
                    className='add-task-input'
                    name='task'
                    placeholder='Add task'
                    onChange={handleTaskNameChange}
                    value={task}
                />
                <button type='submit' className='add-task-btn'>Add</button>
            </form>
        </div >
    );
};

export default Todo;
