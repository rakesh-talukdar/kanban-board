import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTask, addTask, deleteTask, updateTask } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';
import Modal from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const TaskSection = (props) => {
    const [taskId, setTaskId] = useState(undefined);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [buttonName, setButtonName] = useState('');

    const { taskCardList, taskSection, dispatch, userAssignedTasks, userAssignedTasksFilterRequest, task, user, hasSearchResultFetched, searchResults } = props;

    const displayTaskCard = (taskCardList) => {
        const taskCards = taskCardList && taskCardList
            .filter((taskCard) => taskCard.status === taskSection.title.toLowerCase())
            .map((taskCard, index) => {
                const { task } = taskCard;
                const taskId = taskCard.id;
                const username = taskCard.user;
                const userFirstName = username ? username.split(' ')[0] : '';
                return (
                    <Draggable key={taskId} draggableId={taskId} index={index}>
                        {(provided) => (
                            <li key={taskId} className='task-card'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <p onClick={() => { toggleUpdateTaskModal(taskId) }} className={'task-title'}>{task}</p>
                                <p className='task-card-username-and-drop-btn'>
                                    <button className='delete-task-btn' id={taskId} onClick={handleDelete} ><FontAwesomeIcon icon={faTrash} className='dropIcon' /></button>
                                    <span className='task-card-username' title={username}>{userFirstName}</span>
                                </p>

                            </li>

                        )}
                    </Draggable>
                );
            });
        return taskCards;
    };


    const handleSubmit = (task, user) => {
        const status = taskSection.title.toLowerCase();
        const data = {
            task: task.trim(),
            user: user.trim(),
            status,
        };
        if (taskId === undefined) {
            return dispatch(addTask(data));
        } else {
            dispatch(updateTask(taskId, data));
            return toggleModal();
        }
    };


    const handleDelete = (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        dispatch(deleteTask(taskId))
    };


    const toggleUpdateTaskModal = (taskId) => {
        setModalVisibility(!modalVisibility);
        setButtonName('Update Task');
        setTaskId(taskId);
        taskId && dispatch(fetchTask(taskId));
    };


    const toggleModal = () => {
        setModalVisibility(!modalVisibility);
        setButtonName('Add Task');
        setTaskId(undefined);
    };


    return (
        <>
            <div className='task-list-card' >
                <header className='task-list-header'>
                    <h3>{taskSection.title}</h3>
                </header>

                <Droppable key={taskSection.id} droppableId={taskSection.id}>
                    {(provided) => (
                        <ul className='task-list'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {userAssignedTasksFilterRequest ? displayTaskCard(userAssignedTasks) :
                                hasSearchResultFetched ? displayTaskCard(searchResults) :
                                    displayTaskCard(taskCardList)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <button onClick={toggleModal} className='add-task-card-btn'>Add Task Card<FontAwesomeIcon icon={faPlus} className='searchIcon' /></button>
            </div >

            {modalVisibility ?
                <Modal
                    task={taskId === undefined ? '' : task}
                    defaultUserValue={taskId === undefined ? '' : user}
                    closeModal={toggleModal}
                    buttonName={buttonName}
                    onSubmit={handleSubmit} /> :
                null
            }
        </>
    );
};


TaskSection.defaultProps = {
    taskCardList: [],
};

TaskSection.propTypes = {
    taskCardList: PropTypes.array,
    taskSection: PropTypes.object,
    userAssignedTasks: PropTypes.array,
    userAssignedTasksFilterRequest: PropTypes.bool,
    task: PropTypes.string,
    user: PropTypes.string
};



const mapStateToProps = (state) => {
    return {
        taskCardList: state.tasks.tasks,
        userAssignedTasks: state.tasks.userAssignedTasks,
        userAssignedTasksFilterRequest: state.tasks.userAssignedTasksFilterRequest,
        task: state.tasks.task.task,
        user: state.tasks.task.user,
        searchResults: state.tasks.searchResults,
        hasSearchResultFetched: state.tasks.hasSearchResultFetched,
    };

};

export default connect(mapStateToProps)(TaskSection)