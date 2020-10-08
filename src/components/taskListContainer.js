import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './todo';
import DoingTaskList from './doingTaskList';
import CompletedTaskList from './completedTaskList';

const TaskListContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [taskUpdated, setTaskUpdate] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                const data = response.data;
                setTasks(data);
                setTask('');
                setTaskDeleted(false);
                setTaskAdded(false);
                setTaskUpdate(false);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [taskAdded, taskDeleted, taskUpdated]);



    const handleChange = (task) => {
        setTask(task);
    };


    const handleTaskSubmit = async (status) => {
        const data = {
            task,
            status,
        };
        if (data.task.length > 2) {
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


    const handleDelete = async (taskId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            setTaskDeleted(true);
        } catch (error) {
            console.error('Oops!! Couldn\'t able to delete');
        }
    };


    const setTaskUpdateResult = () => {
        setTaskUpdate(true);
    };


    return (
        <div className='task-list-container'>
            <Todo tasks={tasks}
                task={task}
                onChange={handleChange}
                onSubmit={handleTaskSubmit}
                onDelete={handleDelete}
                onUpdate={setTaskUpdateResult}
                error={error}
            />
            <DoingTaskList />
            <CompletedTaskList />
        </div>
    );
};


export default TaskListContainer;