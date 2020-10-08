import React, { Component } from 'react';
import Todo from './todo';
import DoingTaskList from './doingTaskList';

class TaskListContainer extends Component {
    render() {
        return (
            <div className='task-list-container'>
                <Todo />
                <DoingTaskList />
            </div>
        );
    }
}
export default TaskListContainer;