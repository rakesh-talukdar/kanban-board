import React, { Component } from 'react';
import Todo from './todo';
import DoingTaskList from './doingTaskList';
import CompletedTaskList from './completedTaskList';

class TaskListContainer extends Component {
    render() {
        return (
            <div className='task-list-container'>
                <Todo />
                <DoingTaskList />
                <CompletedTaskList />
            </div>
        );
    }
}
export default TaskListContainer;