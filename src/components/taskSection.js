import React, { useState } from 'react';
import { connect } from 'react-redux';
import UpdateTask from './updateTaskComponent';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTask, addTask, deleteTask } from '../redux/actions/taskActions';
import Form from './form';


const TaskSection = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);

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



    const handleSubmit = (task) => {
        const status = props.taskSection.title.toLowerCase();
        const data = {
            task: task.trim(),
            status,
        };
        props.dispatch(addTask(data));
    };


    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        props.dispatch(deleteTask(taskId))
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
        if (taskId !== undefined) {
            props.dispatch(fetchTask(taskId));
        }
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

            <Form onSubmit={handleSubmit} task='' buttonName='Add' />
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        taskCardList: state.tasks.tasks,
    };
};

export default connect(mapStateToProps)(TaskSection)