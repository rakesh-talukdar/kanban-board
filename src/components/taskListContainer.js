import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import TaskSection from './taskSection';
import taskSections from '../dataStorage/taskSectionData';

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
            task: task.trim(),
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

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (destination === null) {
            return;
        }

        const taskData = [...tasks];
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
        setTasks(taskData);
    };



    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='task-list-container'>
                {taskSections.map((taskSection) => {
                    return (
                        <TaskSection key={taskSection.id}
                            taskSection={taskSection}
                            tasks={tasks}
                            onSubmit={handleTaskSubmit}
                            onDelete={handleDelete}
                            onUpdate={setTaskUpdateResult}
                        />
                    );
                })}
            </div>
        </DragDropContext>
    );
};


export default TaskListContainer;