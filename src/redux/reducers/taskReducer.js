import * as actions from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    tasks: [],
    task: '',
    hasTaskAdded: false,
    hasTaskUpdated: false,
    hasTaskDeleted: false,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TASKS_FETCH_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case actions.TASKS_FETCHED:
            return {
                ...state,
                isLoading: false,
                hasTaskAdded: false,
                hasTaskUpdated: false,
                hasTaskDeleted: false,
                tasks: action.payload,
            };

        case actions.TASK_FETCHED:
            const [fetchedTask] = state.tasks.filter((task) => task.id === action.payload.id);
            return {
                ...state,
                task: fetchedTask,
            };

        case actions.TASK_ADDED:
            return {
                ...state,
                hasTaskAdded: true,
            };

        case actions.TASK_UPDATED:
            return {
                ...state,
                hasTaskUpdated: true,
                task: '',
            };

        case actions.TASK_DELETED:
            return {
                ...state,
                hasTaskDeleted: true,
            };

        default: return state;
    }
};

export default taskReducer;