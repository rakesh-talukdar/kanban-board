import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import users from '../dataStorage/usersData';
import { fetchUserAssignedTasksRequest, showAllTaskFilterRequest, fetchSearchResultsRequest } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = (props) => {
    const { dispatch, userAssignedTasksFilterRequest, userAssignedTasks } = props

    useEffect(() => {
        if (userAssignedTasksFilterRequest && userAssignedTasks.length < 1) {
            displayNotification();
        }
    }, [userAssignedTasksFilterRequest, userAssignedTasks]);

    const displayNotification = () => {
        toast.info('No records found.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };


    const handleSearchQuery = (event) => {
        const searchInput = event.target.value;
        if (searchInput.length > 1) {
            const searchToken = searchInput.toLowerCase().split(' ').filter((token) => token.trim() !== '');
            const searchInputRegex = new RegExp(searchToken.join(' '), 'gi');
            fetchSearchQueryData(searchInputRegex);
        }
    };

    const fetchSearchQueryData = debounce((searchQueryToken) => {
        dispatch(fetchSearchResultsRequest(searchQueryToken));
    }, 500)



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
                        <form className='search-form'>
                            <input type='text' className='search-input' onChange={handleSearchQuery} placeholder='Search task..' />
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
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userAssignedTasks: PropTypes.array,
    userAssignedTasksFilterRequest: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        userAssignedTasks: state.tasks.userAssignedTasks,
        userAssignedTasksFilterRequest: state.tasks.userAssignedTasksFilterRequest,
    };
};


export default connect(mapStateToProps)(Header);
