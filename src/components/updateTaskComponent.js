import React from 'react';
import axios from 'axios';


class UpdateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            taskUpdated: false,
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/tasks/${this.props.taskId}`)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    task: data.task,
                })
            })
            .catch((error) => console.error('Error ', error));
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            task: this.state.task,
        }
        const response = await axios({
            method: 'patch',
            url: `http://localhost:3000/tasks/${this.props.taskId}`,
            data
        })
        if (response.status === 200) {
            this.setState({
                taskUpdated: true,
                task: '',
            });
            this.props.todoList();
            this.props.toggle();
        }
    }

    render() {
        return (
            <div className='modal'>
                <form className='add-task-form' onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        className='add-task-input'
                        name='task'
                        onChange={this.handleChange}
                        value={this.state.task}
                        autoFocus
                    />
                    <button type='submit' className='add-task-btn'>Update</button>
                </form>
            </div>
        );
    }
}

export default UpdateTask;