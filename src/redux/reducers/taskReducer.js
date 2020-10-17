import * as actions from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    tasks: [],
    error: '',
    task: {},
    hasTaskAdded: false,
    hasTaskUpdated: false,
    hasTaskDeleted: false,
    userAssignedTasks: [],
    userAssignedTasksFilterRequest: false,
    searchResults: [],
    hasSearchResultFetched: false,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handling actions for all tasks
        case actions.FETCH_ALL_TASKS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
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
                error: '',
            };

        case actions.FETCH_ALL_TASKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                tasks: [],
                error: action.error,
            };



        // Handling actions for single task
        case actions.FETCH_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case actions.FETCH_TASK_SUCCESS:
            const { taskId } = action.payload;
            const [fetchedTask] = state.tasks.filter((task) => task.id === taskId);
            return {
                ...state,
                task: fetchedTask || {},
                isLoading: false,
                error: '',
            };

        case actions.FETCH_TASK_FAILURE:
            return {
                ...state,
                isLoading: false,
                task: {},
                error: action.error,
            };

        // Handling actions for adding task
        case actions.ADD_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskAdded: false,
                error: '',
            };

        case actions.ADD_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskAdded: true,
                error: '',
            };

        case actions.ADD_TASK_FAILURE:
            return {
                ...state,
                hasTaskAdded: false,
                error: action.error,
            };


        // Handling actions for updating task
        case actions.UPDATE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskUpdated: false,
                error: '',
            };

        case actions.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskUpdated: true,
                task: {},
                error: '',
            };

        case actions.UPDATE_TASK_FAILURE:
            return {
                ...state,
                hasTaskUpdated: false,
                error: action.error,
            };


        // Handling actions for deleting task
        case actions.DELETE_TASK_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasTaskDeleted: false,
                error: '',
            };

        case actions.DELETE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasTaskDeleted: true,
                error: '',
            };

        case actions.DELETE_TASK_FAILURE:
            return {
                ...state,
                hasTaskDeleted: false,
                error: action.error,
            };


        // Handling actions for user assigned tasks filter
        case actions.USER_TASK_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
                error: '',
            };


        case actions.USER_TASK_FILTER_SUCCESS:
            const user = action.payload;
            const userAssignedTasks = state.tasks.filter((task) => task.user === user);
            return {
                ...state,
                userAssignedTasks,
                error: '',
                isLoading: false,
                hasSearchResultFetched: false,
                userAssignedTasksFilterRequest: true,
            };

        case actions.USER_TASK_FILTER_FAILURE:
            return {
                ...state,
                hasTaskDeleted: false,
                error: action.error,
                isLoading: false,
            };

        // Handling actions for show all tasks filter
        case actions.SHOW_ALL_TASKS_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case actions.SHOW_ALL_TASKS_FILTER_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
            };

        case actions.SHOW_ALL_TASKS_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                userAssignedTasksFilterRequest: false,
                hasSearchResultFetched: false,
            };


        case actions.FETCH_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                hasSearchResultFetched: false,
            };

        case actions.FETCH_SEARCH_RESULTS_SUCCESS:
            const searchInput = action.payload;
            const matchedTasks = state.tasks.filter((task) => task.task === searchInput);
            return {
                ...state,
                searchResults: matchedTasks,
                hasSearchResultFetched: true,
            };

        case actions.FETCH_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                error: action.error,
                hasSearchResultFetched: false,
            };

        case actions.TASK_DRAG_AND_DROP_REQUEST:
            return state;

        default: return state;
    }
};

export default taskReducer;