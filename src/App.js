import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import TodoList from './components/TodoList';
import store from './store/TodoStore';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
    }
}

export default App;
