import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import AuthLoadingScreen from './authencations/AuthLoadingScreen';
import MainScreen from './mains/Main';
import AuthStack from './authencations/AuthStack';

const App = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainScreen,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default App;
