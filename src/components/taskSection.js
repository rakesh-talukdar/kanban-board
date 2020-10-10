import React, { useState } from 'react';
import UpdateTask from './updateTaskComponent';
import { Droppable, Draggable } from 'react-beautiful-dnd';


const TaskSection = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(false);
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });


    const displayTaskList = () => {
        if (props.tasks !== undefined) {
            const taskCards = props.tasks.filter((task) => task.status === props.taskSection.title.toLowerCase())
                .map((task, index) => {
                    return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                                <li key={task.id} className='task-card'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                >
                                    <span onClick={() => { toggleUpdateTaskForm(task.id) }} className={'task-title'}>{task.task}</span>
                                    <button className='delete-task-btn' id={task.id} onClick={handleDelete}>X</button>
                                </li>
                            )}

                        </Draggable>
                    );
                });
            return taskCards;
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
            const status = props.taskSection.title.toLowerCase();
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
                <h3>{props.taskSection.title}</h3>
            </header>

            <Droppable key={props.taskSection.id} droppableId={props.taskSection.id}>
                {(provided) => (
                    <ul className='task-list'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        {...provided.dragHandleProps}
                    >
                        {showUpdateTaskForm === true ? <UpdateTask taskId={taskId} toggle={toggleUpdateTaskForm} /> : null}
                        {displayTaskList()}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

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

export default TaskSection;