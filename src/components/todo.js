import React, { Component } from 'react';
import axios from 'axios';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/tasks')
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    tasks: data,
                });
            })
            .catch((error) => console.error(error));
    }

    getTasks = () => {
        if (this.state.tasks !== undefined) {
            const todoTasks = this.state.tasks.map((task) => {
                if (task.status === 'todo') {
                    return (<li key={task.id} className='task-card'>{task.title}</li>);
                }
            });
            return todoTasks;
        } else {
            return null;
        }
    };

    render() {
        return (
            <div className='task-list-card'>
                <header className='task-list-header'>
                    <h3 >Todo</h3>
                </header>
                <ul className='task-list'>
                    {this.getTasks()}
                </ul>
            </div>
        );
    }
}

export default Todo;
