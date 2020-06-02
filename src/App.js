import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import TaskList from './components/TaskList';
import store from './store/TaskStore';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TaskList />
            </Provider>
        );
    }
}

export default App;
