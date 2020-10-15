import React, { useState } from 'react';
import { connect } from 'react-redux';
import UpdateTask from './updateTaskComponent';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTask, addTask, deleteTask } from '../redux/actions/taskActions';
import Form from './form';
import PropTypes from 'prop-types';


const TaskSection = (props) => {
    const [showUpdateTaskForm, setUpdateFormVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const { taskCardList, taskSection, dispatch } = props;

    const displayTaskCard = () => {
        const taskCards = taskCardList && taskCardList
            .filter((taskCard) => taskCard.status === taskSection.title.toLowerCase())
            .map((taskCard, index) => {
                const { task } = taskCard;
                const taskId = taskCard.id;
                return (
                    <Draggable key={taskId} draggableId={taskId} index={index}>
                        {(provided) => (
                            <li key={taskId} className='task-card'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <span onClick={() => { toggleUpdateTaskForm(taskId) }} className={'task-title'}>{task}</span>
                                <button className='delete-task-btn' id={taskId} onClick={handleDelete}>X</button>
                            </li>
                        )}
                    </Draggable>
                );
            });
        return taskCards;
    };



    const handleSubmit = (task) => {
        const status = taskSection.title.toLowerCase();
        const data = {
            task: task.trim(),
            status,
        };
        dispatch(addTask(data));
    };


    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        dispatch(deleteTask(taskId))
    };


    const toggleUpdateTaskForm = (taskId) => {
        setUpdateFormVisibility(!showUpdateTaskForm);
        setTaskId(taskId);
        taskId && dispatch(fetchTask(taskId));
    };


    return (
        < div className='task-list-card' >
            <header className='task-list-header'>
                <h3>{taskSection.title}</h3>
            </header>

            <Droppable key={taskSection.id} droppableId={taskSection.id}>
                {(provided) => (
                    <ul className='task-list'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {showUpdateTaskForm === true ? <UpdateTask taskId={taskId} toggleUpdateModal={toggleUpdateTaskForm} /> : null}
                        {displayTaskCard()}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <Form onSubmit={handleSubmit} task='' buttonName='Add' />
        </div>
    );
};


TaskSection.defaultProps = {
    taskCardList: [],
};

TaskSection.propTypes = {
    taskCardList: PropTypes.array,
    taskSection: PropTypes.object,
};



const mapStateToProps = (state) => {
    return {
        taskCardList: state.tasks.tasks,
    };
};

export default connect(mapStateToProps)(TaskSection)