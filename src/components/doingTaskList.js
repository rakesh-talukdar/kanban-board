import React, { Component } from 'react';
import axios from 'axios';

class DoingTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            task: '',
            error: false,
            errorText: '',
        };
    }

    componentDidMount() {
        this.getDoingTaskList();
    }

    getDoingTaskList = () => {
        axios.get('http://localhost:3000/tasks')
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    tasks: data,
                    task: '',
                });
            })
            .catch((error) => console.error(error));
    };

    displayDoingTaskList = () => {
        if (this.state.tasks !== undefined) {
            const doingTasks = this.state.tasks.map((task) => {
                if (task.status === 'doing') {
                    return (
                        <li key={task.id} className='task-card'>
                            <span onClick={(event) => { this.toggleUpdateForm(event.target.id) }} id={task.id} className={'task-title'}>{task.task}</span>
                            <button className='delete-task-btn' id={task.id} onClick={this.handleDelete}>X</button>
                        </li>
                    );
                }
            });
            return doingTasks;
        } else {
            return null;
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            task: this.state.task,
            status: 'doing',
        };

        if (data.task.length > 2) {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/tasks',
                    data,
                });
                if (response.status === 201 || response.status === 200) {
                    this.getDoingTaskList();
                }
            } catch (error) {
                this.setState({
                    error: true,
                    errorText: 'Oops!! Couldn\'t able to add',
                });
            }
        } else {
            this.setState({
                error: true,
                errorText: 'Task length should be minimum 2 characters!!',
            });
        }
    }

    handleDelete = async (event) => {
        event.preventDefault();
        const taskId = event.target.id;
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            if (response.status === 200) {
                this.getDoingTaskList();
            }
        } catch (error) {
            console.error('Oops!! Couldn\'t able to delete', error);
        }
    }


    render() {
        return (
            <div className='task-list-card'>
                <header className='task-list-header'>
                    <h3 >Doing</h3>
                </header>
                <ul className='task-list'>
                    {this.displayDoingTaskList()}
                </ul>
                <p className='error-display'>{this.state.errorText}</p>
                <form className='add-task-form' onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        className='add-task-input'
                        name='task'
                        placeholder='Add task'
                        onChange={this.handleChange}
                        value={this.state.task}
                    />
                    <button type='submit' className='add-task-btn'>Add</button>
                </form>
            </div>
        );
    }
}

export default DoingTaskList;
