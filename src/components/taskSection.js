import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import UpdateTask from './updateTaskComponent';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTasks, addTask, deleteTask } from '../redux/actions/taskActions';



const TaskSection = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [task, setTask] = useState('');
    const [error, setError] = useState({ hasError: false, errorMsg: '' });
    const { dispatch } = props;

    useEffect(() => {
        dispatch(fetchTasks());
    }, [props.taskAdded, props.taskDeleted, props.taskUpdated, dispatch]);


    const displayTaskCard = () => {
        if (props.taskCardList !== undefined) {
            const taskCards = props.taskCardList && props.taskCardList.filter((task) => task.status === props.taskSection.title.toLowerCase())
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
            const data = {
                task: task.trim(),
                status,
            };
            props.dispatch(addTask(data));
            setTask('');
            setError({ hasError: false, errorMsg: '', });
        } else {
            setError({ hasError: true, errorMsg: 'Task length should be minimum 2 characters!!' });
        }
    };


    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        props.dispatch(deleteTask(taskId))
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
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
                    >
                        {showUpdateTaskForm === true ? <UpdateTask taskId={taskId} toggle={toggleUpdateTaskForm} /> : null}
                        {displayTaskCard()}
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


const mapStateToProps = (state) => {
    return {
        taskCardList: state.tasks.tasks,
        taskAdded: state.tasks.hasTaskAdded,
        taskDeleted: state.tasks.hasTaskDeleted,
        taskUpdated: state.tasks.hasTaskUpdated,
    };
};

export default connect(mapStateToProps)(TaskSection)