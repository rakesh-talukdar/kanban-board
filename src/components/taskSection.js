import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTask, addTask, deleteTask, updateTask } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';
import Modal from './modal';

const TaskSection = (props) => {
    const [taskId, setTaskId] = useState(undefined);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [buttonName, setButtonName] = useState('');

    const { taskCardList, taskSection, dispatch, userAssignedTasks, userAssignedTasksFilterRequest, task, user } = props;

    const displayTaskCard = (taskCardList) => {
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
                                <span onClick={() => { toggleUpdateTaskModal(taskId) }} className={'task-title'}>{task}</span>
                                <button className='delete-task-btn' id={taskId} onClick={handleDelete}>X</button>
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
                            {userAssignedTasksFilterRequest ? displayTaskCard(userAssignedTasks) : displayTaskCard(taskCardList)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <button onClick={toggleModal} className='add-task-card-btn'>Add Task Card</button>
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
    };

};

export default connect(mapStateToProps)(TaskSection)