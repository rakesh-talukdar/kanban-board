import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskSection from './taskSection';
import taskSections from '../dataStorage/taskSectionData';
import { dragAndDropTaskCard } from '../redux/actions/taskActions';

const TaskListContainer = (props) => {

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (destination !== null) {
            const taskData = [...props.tasks];
            const destinationTaskSection = taskData.filter((data) => data.status === destination.droppableId);

            if (source.droppableId === destination.droppableId) {
                const destinationTaskId = destinationTaskSection[destination.index].id;
                const destinationIndex = taskData.findIndex((task) => task.id === destinationTaskId);
                taskData.filter((data, index) => {
                    if (data.id === draggableId && destinationIndex >= 0) {
                        let item = taskData.splice(index, 1);
                        taskData.splice(destinationIndex, 0, item[0]);
                    }
                    return taskData;
                });
            } else {
                let destinationTaskId = null;
                let destinationIndex = null;

                if (destination.index !== 0 && destination.index !== destinationTaskSection.length) {
                    destinationTaskId = destinationTaskSection[destination.index].id
                    destinationIndex = taskData.findIndex((task) => task.id === destinationTaskId);
                } else if (destination.index === destinationTaskSection.length) {
                    destinationIndex = taskData.length + 1;
                } else {
                    destinationIndex = 0;
                }

                taskData.filter((data, index) => {
                    if (data.id === draggableId && destinationIndex !== null) {
                        data.status = destination.droppableId;
                        let item = taskData.splice(index, 1);
                        index < destinationIndex ? taskData.splice(destinationIndex - 1, 0, item[0]) : taskData.splice(destinationIndex, 0, item[0]);
                    }
                    return taskData;
                });
            }
            props.dispatch(dragAndDropTaskCard(taskData));
        }
    };

    return (
        < DragDropContext onDragEnd={handleOnDragEnd} >
            <div className='task-list-container'>
                {taskSections.length > 0 && taskSections.map((taskSection) => {
                    return (
                        <TaskSection key={taskSection.id}
                            taskSection={taskSection}
                        />
                    );
                })}
            </div>
        </DragDropContext >
    );
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
    };
};

export default connect(mapStateToProps)(TaskListContainer);