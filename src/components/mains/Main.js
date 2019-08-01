import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppStack from './AppStack';
import store from '../../store';


class MainScreen extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppStack />
            </Provider>
        );
    }
}

export default MainScreen;
