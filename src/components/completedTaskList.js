import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateTask from './updateTaskComponent';


const CompletedTaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(false);


    useEffect(() => {
        const getCompletedTaskList = (async () => {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                const data = response.data;
                setTasks(data);
                setTask('');
                setTaskDeleted(false);
                setTaskAdded(false);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [taskAdded, taskDeleted, showUpdateTaskForm]);


    const displayCompletedTaskList = () => {
        if (tasks !== undefined) {
            const completedTasks = tasks.map((task) => {
                if (task.status === 'completed') {
                    return (
                        <li key={task.id} className='task-card'>
                            <span onClick={() => { toggleUpdateTaskForm(task.id) }} className={'task-title'}>{task.task}</span>
                            <button className='delete-task-btn' id={task.id} onClick={handleTaskDelete}>X</button>
                        </li>
                    );
                }
            });
            return completedTasks;
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
            status: 'completed',
        };

        if (task.length > 2) {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/tasks',
                    data,
                });
                setTaskAdded(true);
                setError({ hasError: false });
            } catch (error) {
                setError({ hasError: true, errorMsg: 'Oops!! Couldn\'t able to add' });
            }
        } else {
            setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
        }
    };

    const handleTaskDelete = async (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            setTaskDeleted(true);
        } catch (error) {
            console.error('Oops!! Couldn\'t able to delete');
        }
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
        setError({ hasError: false });
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

export default CompletedTaskList;