import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './todo';
import DoingTaskList from './doingTaskList';
import CompletedTaskList from './completedTaskList';

const TaskListContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [taskUpdated, setTaskUpdate] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                const data = response.data;
                setTasks(data);
                setTaskDeleted(false);
                setTaskAdded(false);
                setTaskUpdate(false);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [taskAdded, taskDeleted, taskUpdated]);


    const handleTaskSubmit = async (task, status) => {
        const data = {
            task,
            status,
        };
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3000/tasks',
                data,
            });
            setTaskAdded(true);
        } catch (error) {
            console.error('Oops!! Couldn\'t able to add');
        }
    };


    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
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
            <Todo
                tasks={tasks}
                onSubmit={handleTaskSubmit}
                onDelete={handleDelete}
                onUpdate={setTaskUpdateResult}
            />
            <DoingTaskList
                tasks={tasks}
                onSubmit={handleTaskSubmit}
                onDelete={handleDelete}
                onUpdate={setTaskUpdateResult}
            />
            <CompletedTaskList
                tasks={tasks}
                onSubmit={handleTaskSubmit}
                onDelete={handleDelete}
                onUpdate={setTaskUpdateResult}
            />
        </div>
    );
};


export default TaskListContainer;