import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/header';
import TaskListContainer from './components/taskListContainer'
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <TaskListContainer />
      </div>
    </Provider>
  );
}

export default App;
