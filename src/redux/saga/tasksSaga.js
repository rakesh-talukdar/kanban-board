import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionTypes';
import {
    fetchTasksSuccess,
    fetchTasksFailure,
    fetchTaskSuccess,
    fetchTaskFailure,
    addTaskFailure,
    addTaskSuccess,
    updateTaskSuccess,
    updateTaskFailure,
    deleteTaskSuccess,
    deleteTaskFailure,
    fetchUserAssignedTasksFailure,
    fetchUserAssignedTasksSuccess,
    showAllTaskFilterSuccess,
    showAllTaskFilterFailure,
    fetchSearchResultsSuccess,
    fetchSearchResultsFailure,
} from '../actions/taskActions';


const baseUrl = 'http://localhost:3000/tasks';


// Request for fetching all tasks
function* asyncFetchTasksRequest() {
    try {
        const response = yield call(() => axios.get(baseUrl));
        yield put(fetchTasksSuccess(response.data));
    } catch (error) {
        yield put(fetchTasksFailure(error));
    }
}

export function* watchFetchAllTasksSaga() {
    yield takeEvery(actions.FETCH_ALL_TASKS_REQUEST, asyncFetchTasksRequest);
}


// Request for fetching single task
function* asyncFetchTaskRequest(action) {
    try {
        const { taskId } = action.payload;
        yield put(fetchTaskSuccess(taskId));
    } catch (error) {
        yield put(fetchTaskFailure(error));
    }
}

export function* watchFetchTaskSaga() {
    yield takeEvery(actions.FETCH_TASK_REQUEST, asyncFetchTaskRequest);
}


// Adding task
function* asyncAddTaskRequest(action) {
    try {
        const data = action.payload;
        yield call(() => axios({
            method: 'post',
            url: baseUrl,
            data,
        }));
        yield put((addTaskSuccess()));
    } catch (error) {
        yield put(addTaskFailure(error));
    }
}

export function* watchAddTaskSaga() {
    yield takeEvery(actions.ADD_TASK_REQUEST, asyncAddTaskRequest);
}



// Updating task
function* asyncUpdateTaskRequest(action) {
    try {
        const { taskId, data } = action.payload;
        yield call(() => axios({
            method: 'patch',
            url: `${baseUrl}/${taskId}`,
            data,
        }));
        yield put((updateTaskSuccess()));
    } catch (error) {
        yield put(updateTaskFailure(error));
    }
}

export function* watchUpdateTaskSaga() {
    yield takeEvery(actions.UPDATE_TASK_REQUEST, asyncUpdateTaskRequest);
}


// Deleting task
function* asyncDeleteTaskRequest(action) {
    try {
        const { taskId } = action.payload;
        yield call(() => axios.delete(`${baseUrl}/${taskId}`));
        yield put((deleteTaskSuccess()));
    } catch (error) {
        yield put(deleteTaskFailure(error));
    }
}

export function* watchDeleteTaskSaga() {
    yield takeEvery(actions.DELETE_TASK_REQUEST, asyncDeleteTaskRequest);
}



// Fetch user assigned tasks filter
function* asyncFetchUserAssignedTasksRequest(action) {
    try {
        const user = action.payload;
        yield put(fetchUserAssignedTasksSuccess(user));
    } catch (error) {
        yield put(fetchUserAssignedTasksFailure(error));
    }
}

export function* watchUserTasksFilter() {
    yield takeEvery(actions.USER_TASK_FILTER_REQUEST, asyncFetchUserAssignedTasksRequest);
}


// Fetch show all tasks filter
function* asyncShowAllTasksFilterRequest() {
    try {
        yield put(showAllTaskFilterSuccess());
    } catch (error) {
        yield put(showAllTaskFilterFailure(error));
    }
}

export function* watchShowAllTasksFilter() {
    yield takeEvery(actions.SHOW_ALL_TASKS_FILTER_REQUEST, asyncShowAllTasksFilterRequest);
}


// Fetch search results for tasks
function* fetchSearchResultsRequest(action) {
    try {
        const searchInput = action.payload;
        yield put(fetchSearchResultsSuccess(searchInput));
    } catch (error) {
        yield put(fetchSearchResultsFailure(error));
    }
}

export function* watchFetchSearchResults() {
    yield takeEvery(actions.FETCH_SEARCH_RESULTS_REQUEST, fetchSearchResultsRequest);
}



// Drag and drop tasks
function* taskDragAndDropRequest(action) {
    try {
        const data = action.payload;
        yield put(fetchTasksSuccess(data));
    } catch (error) {
        yield put(fetchTasksFailure(error));
    }
}

export function* watchTaskDragAndDrop() {
    yield takeEvery(actions.TASK_DRAG_AND_DROP_REQUEST, taskDragAndDropRequest);
}