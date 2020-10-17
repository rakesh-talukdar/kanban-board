import * as actions from './actionTypes';

const errorMsg = 'Oops!! Something went wrong!!';

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

export const fetchTasksFailure = (error) => {
    return {
        type: actions.FETCH_ALL_TASKS_FAILURE,
        error: errorMsg,
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


export const fetchTaskFailure = (error) => {
    return {
        type: actions.FETCH_TASK_FAILURE,
        error: errorMsg,
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

export const addTaskFailure = (error) => {
    return {
        type: actions.ADD_TASK_FAILURE,
        error: errorMsg,
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

export const updateTaskFailure = (error) => {
    return {
        type: actions.UPDATE_TASK_FAILURE,
        error: errorMsg,
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

export const deleteTaskFailure = (error) => {
    return {
        type: actions.DELETE_TASK_FAILURE,
        error: errorMsg,
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

export const fetchUserAssignedTasksFailure = (error) => {
    return {
        type: actions.USER_TASK_FILTER_FAILURE,
        error: errorMsg,
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

export const showAllTaskFilterFailure = (error) => {
    return {
        type: actions.SHOW_ALL_TASKS_FILTER_FAILURE,
        error: errorMsg,
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

export const fetchSearchResultsFailure = (error) => {
    return {
        type: actions.FETCH_SEARCH_RESULTS_FAILURE,
        error: errorMsg,
    };
};


// Actions for drag and drop tasks
export const taskDragAndDropRequest = (data) => {
    return {
        type: actions.TASK_DRAG_AND_DROP_REQUEST,
        payload: data,
    };
};
