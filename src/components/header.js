import React from 'react';
import { connect } from 'react-redux';
import users from '../dataStorage/usersData';
import { fetchUserAssignedTasks, showAllTaskFilter } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';


const Header = (props) => {
    const { dispatch } = props
    const handleUserChange = (event) => {
        const selectedValue = event.target.value;
        selectedValue === 'showAllTasks' ? dispatch(showAllTaskFilter()) : dispatch(fetchUserAssignedTasks(selectedValue));
    };

    const userList = users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>);
    return (
        <header className="header">
            <div className='header-wrapper'>
                <h1 className='heading'>Kanban Board</h1>
                <div className='search-and-filter-wrapper'>
                    <div className='search-container'>
                        <form className='search-form'>
                            <input type='text' className='search-input' placeholder='Search task..' />
                            <button className='search-btn'>Search</button>
                        </form>
                    </div>
                    <div className='filter-container'>
                        <form className='filter-form'>
                            <select className='filter-select' name='user-task-filter' onChange={handleUserChange} defaultValue='Filter tasks by username'>
                                <option disabled defaultValue='Filter tasks by username'>Filter tasks by username</option>
                                <option value='showAllTasks'>Show all tasks</option>
                                {userList}
                            </select>
                        </form>
                    </div>

                </div>

            </div>
        </header>
    );
};

Header.defaultProps = {
    users: [],
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(Header);
