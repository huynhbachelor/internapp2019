import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import AuthLoadingScreen from './authencations/AuthLoadingScreen';
import AppStack from './mains/AppStack';
import AuthStack from './authencations/AuthStack';

const App = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default App;
