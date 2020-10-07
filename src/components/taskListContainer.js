import React, { Component } from 'react';
import Todo from './todo';

class TaskListContainer extends Component {
    render() {
        return (
            <div className='task-list-container'>
                <Todo />
            </div>
        );
    }
}
export default TaskListContainer;