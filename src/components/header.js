import React, { useState } from 'react';
import { connect } from 'react-redux';
import users from '../dataStorage/usersData';
import { fetchUserAssignedTasks, showAllTaskFilter, fetchSearchResult } from '../redux/actions/taskActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
    const { dispatch, searchResults } = props
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchSearchResult(searchInput.trim()));
        console.log("Search Results ", searchResults);
    };



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
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        searchResults: state.tasks.searchResults,
        hasSearchResultFetched: state.tasks.hasSearchResultFetched,
    };
};


export default connect(mapStateToProps)(Header);
