import axios from 'axios';
import * as actions from './actionTypes';

export const fetchTasksRequest = () => {
    return {
        type: actions.TASKS_FETCH_REQUESTED,
    };
};


export const fetchTasksSuccess = (data) => {
    return {
        type: actions.TASKS_FETCHED,
        payload: data,
    };
};


export const fetchTaskAction = (taskId) => {
    return {
        type: actions.TASK_FETCHED,
        payload: {
            id: taskId,
        },
    };
};


export const addTaskAction = () => {
    return {
        type: actions.TASK_ADDED,
    };
};

export const updateTaskAction = () => {
    return {
        type: actions.TASK_UPDATED,
    };
};

export const deleteTaskAction = () => {
    return {
        type: actions.TASK_DELETED,
    };
};

export const fetchUserAssignedTasksAction = (user) => {
    return {
        type: actions.USER_TASK_FILTERED,
        payload: user,
    };
};


export const showAllTaskFilterAction = (user) => {
    return {
        type: actions.SHOW_ALL_TASKS,
    };
};



export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(fetchTasksRequest);
        axios.get('http://localhost:3000/tasks')
            .then((response) => {
                const data = response.data;
                dispatch(fetchTasksSuccess(data));
            })
            .catch((error) => {
                console.error(error);
            });
    };
};


export const fetchTask = (taskId) => {
    return (dispatch) => {
        dispatch(fetchTaskAction(taskId));
    };
};

export const addTask = (data) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/tasks',
            data,
        }).then(() => {
            dispatch(addTaskAction());
        }).catch((error) => {
            console.error('Oops!! Couldn\'t able to add', error.message);
        });
    };
};


export const updateTask = (taskId, data) => {
    return (dispatch) => {
        axios({
            method: 'patch',
            url: `http://localhost:3000/tasks/${taskId}`,
            data,
        }).then(() => {
            dispatch(updateTaskAction());
        }).catch((error) => {
            console.error("Oops error occurred: ", error.message);
        });
    };
};


export const deleteTask = (taskId) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3000/tasks/${taskId}`)
            .then(() => {
                dispatch(deleteTaskAction());
            }).catch((error) => {
                console.error('Oops!! Couldn\'t able to delete', error.message);
            });
    };
};


export const dragAndDropTaskCard = (data) => {
    return (dispatch) => {
        dispatch(fetchTasksSuccess(data));
    };
};


export const fetchUserAssignedTasks = (user) => {
    return (dispatch) => {
        dispatch(fetchUserAssignedTasksAction(user));
    };
};

export const showAllTaskFilter = () => {
    return (dispatch) => {
        dispatch(showAllTaskFilterAction());
    };
};