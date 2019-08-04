import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import AuthContainer from '../containers/AuthContainer';
import AppStack from './mains/AppStack';
import AuthStack from './authencations/AuthStack';

const Stack = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthContainer,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

export default App;
