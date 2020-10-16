import React, { useState } from 'react';
import PropTypes from 'prop-types';
import users from '../dataStorage/usersData';


const Modal = (props) => {
    const { closeModal, onSubmit, buttonName, defaultUserValue, task } = props;

    const [newTask, setNewTask] = useState(task || '');
    const [user, setUser] = useState(defaultUserValue);
    const [error, setError] = useState({ hasError: false, errorMsg: '' });


    const handleTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTask.length > 2 && user) {
            onSubmit(newTask, user)
            setNewTask('');
            setUser('');
            setError({ hasError: false, errorMsg: '', });
        } else {
            setError({ hasError: true, errorMsg: 'Task and username length should be minimum 2 characters!!' });
        }
    };

    const userList = users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>);


    return (
        <section className='modal'>
            <div className='modal-content'>
                <header>
                    <button onClick={closeModal} className='modal-close-btn'>X</button>
                </header>

                <div className='task-input-section'>
                    <p className='error-display'>{error.hasError === true && error.errorMsg}</p>
                    <form className='add-task-form' onSubmit={handleSubmit}>
                        <label>Add task</label>
                        <textarea
                            type='text'
                            className='add-task-input'
                            name='task'
                            autoFocus={true}
                            placeholder='Add task'
                            onChange={handleTaskChange}
                            value={newTask}
                        ></textarea>

                        <label>Assign user</label>
                        <select className='select-input' onChange={handleUserChange} value={user || 'Select user'}>
                            <option disabled defaultValue={user || 'Select user'}>Select user</option>
                            {userList}
                        </select>

                        <button type='submit' className='task-submit-btn'>{buttonName}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

Modal.defaultProps = {
    buttonName: 'Add Task',
    users: [],
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    task: PropTypes.string,
    buttonName: PropTypes.string,
    defaultUserValue: PropTypes.string,
}

export default Modal;