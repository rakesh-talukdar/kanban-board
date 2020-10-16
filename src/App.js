import React from 'react';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import TaskListContainer from './components/taskListContainer'
import store from './store';


toast.configure();

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
