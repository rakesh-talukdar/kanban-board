import * as actions from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    tasks: [],
    error: false,
    errorMsg: '',
    task: {},
    hasTaskAdded: false,
    hasTaskUpdated: false,
    hasTaskDeleted: false,
    userAssignedTasks: [],
    userAssignedTasksFilterRequest: false,
    searchResults: [],
    hasSearchResultFetched: false,
};

let errorMsg = 'Oops!! Something went wrong'

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handling actions for all tasks
        case actions.FETCH_ALL_TASKS_REQUEST:
            return {
                ...state,
                isLoading: true,
                // error: false,
            };

        case actions.FETCH_ALL_TASKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskAdded: false,
                hasTaskUpdated: false,
                hasTaskDeleted: false,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
                tasks: action.payload,
                error: false,
            };

        case actions.FETCH_ALL_TASKS_FAILURE:
            errorMsg = 'Oops!! Couldn\'t  able to fetch records!! Please check your url.';
            return {
                ...state,
                isLoading: false,
                tasks: [],
                error: true,
                errorMsg,
            };



        // Handling actions for single task
        case actions.FETCH_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false,
            };

        case actions.FETCH_TASK_SUCCESS:
            const { taskId } = action.payload;
            const [fetchedTask] = state.tasks.filter((task) => task.id === taskId);
            return {
                ...state,
                task: fetchedTask || {},
                isLoading: false,
                error: false,
            };

        case actions.FETCH_TASK_FAILURE:
            return {
                ...state,
                isLoading: false,
                task: {},
                error: true,
                errorMsg,
            };

        // Handling actions for adding task
        case actions.ADD_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskAdded: false,
                error: false,
            };

        case actions.ADD_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskAdded: true,
                error: false,
            };

        case actions.ADD_TASK_FAILURE:
            errorMsg = 'Oops!! Couldn\'t  able to save your task!! Try again.';
            return {
                ...state,
                hasTaskAdded: false,
                error: true,
                errorMsg,
            };


        // Handling actions for updating task
        case actions.UPDATE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskUpdated: false,
                error: false,
            };

        case actions.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskUpdated: true,
                task: {},
                error: false,
            };

        case actions.UPDATE_TASK_FAILURE:
            errorMsg = 'Oops!! Couldn\'t  able to update your task!! Try again.';
            return {
                ...state,
                hasTaskUpdated: false,
                error: true,
                errorMsg,
            };


        // Handling actions for deleting task
        case actions.DELETE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskDeleted: false,
                error: false,
            };

        case actions.DELETE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskDeleted: true,
                error: false,
            };

        case actions.DELETE_TASK_FAILURE:
            errorMsg = 'Oops!! Couldn\'t  able to delete your task!! Try again.';
            return {
                ...state,
                hasTaskDeleted: false,
                error: true,
                errorMsg,
            };


        // Handling actions for user assigned tasks filter
        case actions.USER_TASK_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
                error: false,
            };


        case actions.USER_TASK_FILTER_SUCCESS:
            const user = action.payload;
            const userAssignedTasks = state.tasks.filter((task) => task.user === user);
            return {
                ...state,
                userAssignedTasks,
                error: false,
                isLoading: false,
                hasSearchResultFetched: false,
                userAssignedTasksFilterRequest: true,
            };

        case actions.USER_TASK_FILTER_FAILURE:
            return {
                ...state,
                hasTaskDeleted: false,
                error: true,
                isLoading: false,
                errorMsg,
            };

        // Handling actions for show all tasks filter
        case actions.SHOW_ALL_TASKS_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false,
            };

        case actions.SHOW_ALL_TASKS_FILTER_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
                error: false,
            };

        case actions.SHOW_ALL_TASKS_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
                errorMsg,
            };


        case actions.FETCH_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                hasSearchResultFetched: false,
                error: false,
            };

        case actions.FETCH_SEARCH_RESULTS_SUCCESS:
            const searchInput = action.payload;
            const matchedTasks = state.tasks.filter((task) => task.task.toLowerCase() === searchInput.toLowerCase());
            return {
                ...state,
                searchResults: matchedTasks,
                hasSearchResultFetched: true,
                error: false,
            };

        case actions.FETCH_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                error: true,
                hasSearchResultFetched: false,
                errorMsg,
            };

        case actions.TASK_DRAG_AND_DROP_REQUEST:
            return state;

        default: return state;
    }
};

export default taskReducer;