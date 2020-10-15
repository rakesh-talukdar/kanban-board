import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskSection from './taskSection';
import taskSections from '../dataStorage/taskSectionData';
import { dragAndDropTaskCard, fetchTasks } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';


const TaskListContainer = (props) => {
    const { tasks, hasTaskAdded, hasTaskDeleted, hasTaskUpdated, dispatch } = props;

    useEffect(() => {
        dispatch(fetchTasks());
    }, [hasTaskAdded, hasTaskDeleted, hasTaskUpdated, dispatch]);


    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (destination) {
            // Copies the tasks getting from the redux state so that mutation can be performed directly.
            const taskList = [...tasks];
            const destinationColumn = destination.droppableId;
            const destinationIndex = destination.index;
            const sourceColumn = source.droppableId;

            // Finds the index of the dragged task card from the taskList array. 
            const sourceTaskIndex = taskList.findIndex((task) => task.id === draggableId);
            const destinationTaskList = taskList.filter((data) => data.status === destinationColumn);

            // This condition executes if dragged task card source and drop destination are same otherwise else condition executes.
            if (sourceColumn === destinationColumn) {
                const destinationTaskId = destinationTaskList[destinationIndex].id;
                const destinationTaskIndex = taskList.findIndex((task) => task.id === destinationTaskId);

                //Extracts the dragged task card from the taskList array.  
                const [draggedTaskCard] = taskList.splice(sourceTaskIndex, 1);

                //Inserts the dragged task card in the taskList array at the index of the destination task card.  
                taskList.splice(destinationTaskIndex, 0, draggedTaskCard);

            } else {
                let destinationTaskId = null;
                let destinationTaskIndex = null;

                // This condition executes when the dragged task card needs to be dropped in between existing cards.
                if (destinationIndex !== 0 && destinationIndex !== destinationTaskList.length) {
                    destinationTaskId = destinationTaskList[destinationIndex].id
                    destinationTaskIndex = taskList.findIndex((task) => task.id === destinationTaskId);

                    // This condition executes when the dragged task card needs to be dropped at the end of the existing cards or there's no card available.
                } else if (destinationIndex === destinationTaskList.length) {
                    destinationTaskIndex = taskList.length + 1;
                } else {
                    destinationTaskIndex = 0;
                }

                //Extracts the dragged task card from the taskList array.  
                const [draggedTaskCard] = taskList.splice(sourceTaskIndex, 1);

                // Changes the status of to be dropped task card according the destinationColumn.
                draggedTaskCard.status = destinationColumn;

                //Inserts the dragged task card in the taskList array at the index of the destination task card depending on the source task index.  
                sourceTaskIndex < destinationTaskIndex ?
                    taskList.splice(destinationTaskIndex - 1, 0, draggedTaskCard) :
                    taskList.splice(destinationTaskIndex, 0, draggedTaskCard);
            }
            dispatch(dragAndDropTaskCard(taskList));
        }
    };

    return (
        < DragDropContext onDragEnd={handleOnDragEnd} >
            <div className='task-list-container'>
                {taskSections && taskSections.map((taskSection) => {
                    const taskSectionId = taskSection.id;
                    return (
                        <TaskSection key={taskSectionId}
                            taskSection={taskSection}
                        />
                    );
                })}
            </div>
        </DragDropContext >
    );
}


TaskSection.defaultProps = {
    taskSections: [],
};

TaskListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tasks: PropTypes.array,
    hasTaskAdded: PropTypes.bool,
    hasTaskDeleted: PropTypes.bool,
    hasTaskUpdated: PropTypes.bool,
};



const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
        hasTaskAdded: state.tasks.hasTaskAdded,
        hasTaskDeleted: state.tasks.hasTaskDeleted,
        hasTaskUpdated: state.tasks.hasTaskUpdated,
    };
};

export default connect(mapStateToProps)(TaskListContainer);




