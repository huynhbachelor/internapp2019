import { createStackNavigator } from 'react-navigation';
import SignInScreen from './SignInScreen';
import RegisterScreen from './RegisterScreen';

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        Register: RegisterScreen,
    },
    {
        initialRouteName: 'SignIn',
        mode: 'modal',
        headerMode: 'none',
    }
);

export default AuthStack;
