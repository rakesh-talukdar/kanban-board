import * as actions from './actionTypes';

// Fetch request actions for all tasks
export const fetchTasksRequest = () => {
    return {
        type: actions.FETCH_ALL_TASKS_REQUEST,
    };
};

export const fetchTasksSuccess = (data) => {
    return {
        type: actions.FETCH_ALL_TASKS_SUCCESS,
        payload: data,
    };
};

export const fetchTasksFailure = () => {
    return {
        type: actions.FETCH_ALL_TASKS_FAILURE,
    };
};


// Fetch request actions for single task
export const fetchTaskRequest = (taskId) => {
    return {
        type: actions.FETCH_TASK_REQUEST,
        payload: {
            taskId,
        },
    };
};

export const fetchTaskSuccess = (taskId) => {
    return {
        type: actions.FETCH_TASK_SUCCESS,
        payload: {
            taskId,
        },
    };
};


export const fetchTaskFailure = () => {
    return {
        type: actions.FETCH_TASK_FAILURE,
    };
};


// Actions for add task
export const addTaskRequest = (data) => {
    return {
        type: actions.ADD_TASK_REQUEST,
        payload: data,
    };
};

export const addTaskSuccess = () => {
    return {
        type: actions.ADD_TASK_SUCCESS,
    };
};

export const addTaskFailure = () => {
    return {
        type: actions.ADD_TASK_FAILURE,
    };
};



// Actions for update task
export const updateTaskRequest = (taskId, data) => {
    return {
        type: actions.UPDATE_TASK_REQUEST,
        payload: {
            taskId,
            data,
        },
    };
};

export const updateTaskSuccess = () => {
    return {
        type: actions.UPDATE_TASK_SUCCESS,
    };
};

export const updateTaskFailure = () => {
    return {
        type: actions.UPDATE_TASK_FAILURE,
    };
};


// Actions for delete task
export const deleteTaskRequest = (taskId) => {
    return {
        type: actions.DELETE_TASK_REQUEST,
        payload: {
            taskId,
        },
    };
};

export const deleteTaskSuccess = () => {
    return {
        type: actions.DELETE_TASK_SUCCESS,
    };
};

export const deleteTaskFailure = () => {
    return {
        type: actions.DELETE_TASK_FAILURE,
    };
};


// Actions for user assigned tasks filter
export const fetchUserAssignedTasksRequest = (user) => {
    return {
        type: actions.USER_TASK_FILTER_REQUEST,
        payload: user,
    };
};

export const fetchUserAssignedTasksSuccess = (user) => {
    return {
        type: actions.USER_TASK_FILTER_SUCCESS,
        payload: user,
    };
};

export const fetchUserAssignedTasksFailure = () => {
    return {
        type: actions.USER_TASK_FILTER_FAILURE,
    };
};


//Actions for show all tasks filter 
export const showAllTaskFilterRequest = () => {
    return {
        type: actions.SHOW_ALL_TASKS_FILTER_REQUEST,
    };
};

export const showAllTaskFilterSuccess = () => {
    return {
        type: actions.SHOW_ALL_TASKS_FILTER_SUCCESS,
    };
};

export const showAllTaskFilterFailure = () => {
    return {
        type: actions.SHOW_ALL_TASKS_FILTER_FAILURE,
    };
};


// Actions for fetching search results
export const fetchSearchResultsRequest = (searchInput) => {
    return {
        type: actions.FETCH_SEARCH_RESULTS_REQUEST,
        payload: searchInput,
    };
};

export const fetchSearchResultsSuccess = (searchInput) => {
    return {
        type: actions.FETCH_SEARCH_RESULTS_SUCCESS,
        payload: searchInput,
    };
};

export const fetchSearchResultsFailure = () => {
    return {
        type: actions.FETCH_SEARCH_RESULTS_FAILURE,
    };
};


// Actions for drag and drop tasks
export const taskDragAndDropRequest = (data) => {
    return {
        type: actions.TASK_DRAG_AND_DROP_REQUEST,
        payload: data,
    };
};
