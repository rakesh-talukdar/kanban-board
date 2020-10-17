import { all } from 'redux-saga/effects';
import {
    watchFetchAllTasksSaga,
    watchFetchTaskSaga,
    watchAddTaskSaga,
    watchUpdateTaskSaga,
    watchDeleteTaskSaga,
    watchUserTasksFilter,
    watchShowAllTasksFilter,
    watchFetchSearchResults,
    watchTaskDragAndDrop,
} from './tasksSaga';


export default function* rootSaga() {
    yield all([
        watchFetchAllTasksSaga(),
        watchFetchTaskSaga(),
        watchAddTaskSaga(),
        watchUpdateTaskSaga(),
        watchDeleteTaskSaga(),
        watchUserTasksFilter(),
        watchShowAllTasksFilter(),
        watchFetchSearchResults(),
        watchTaskDragAndDrop(),
    ]);
}