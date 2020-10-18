import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import users from '../dataStorage/usersData';
import { fetchUserAssignedTasksRequest, showAllTaskFilterRequest, fetchSearchResultsRequest } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = (props) => {
    const { dispatch, hasSearchResultFetched, searchResults, userAssignedTasksFilterRequest, userAssignedTasks } = props
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if ((hasSearchResultFetched && searchResults.length < 1) || (userAssignedTasksFilterRequest && userAssignedTasks.length < 1)) {
            displayNotification();
        }
    }, [hasSearchResultFetched, userAssignedTasksFilterRequest, userAssignedTasks, searchResults]);

    const displayNotification = () => {
        toast.info('No records found.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };



    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchSearchResultsRequest(searchInput.trim()));
    };



    const handleUserChange = (event) => {
        const selectedValue = event.target.value;
        selectedValue === 'showAllTasks' ? dispatch(showAllTaskFilterRequest()) : dispatch(fetchUserAssignedTasksRequest(selectedValue));
    };

    const userList = users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>);
    return (
        <header className="header">
            <div className='header-wrapper'>
                <h1 className='heading'>Kanban Board</h1>
                <div className='search-and-filter-wrapper'>
                    <div className='search-container'>
                        <form className='search-form' onSubmit={handleSearchSubmit}>
                            <input type='text' className='search-input' onChange={handleSearchInputChange} placeholder='Search task..' />
                            <button className='search-btn' title='search'><FontAwesomeIcon icon={faSearch} /></button>
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
    userAssignedTasks: [],
    searchResults: [],
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchResults: PropTypes.array,
    userAssignedTasks: PropTypes.array,
    hasSearchResultFetched: PropTypes.bool,
    userAssignedTasksFilterRequest: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        hasSearchResultFetched: state.tasks.hasSearchResultFetched,
        searchResults: state.tasks.searchResults,
        userAssignedTasks: state.tasks.userAssignedTasks,
        userAssignedTasksFilterRequest: state.tasks.userAssignedTasksFilterRequest,
    };
};


export default connect(mapStateToProps)(Header);
