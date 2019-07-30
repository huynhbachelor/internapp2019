import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ResultScreen from './ResultScreen';
import ErrorScreen from './ErrorScreen';


const stackOverlay = createStackNavigator(
    {
        HomeOverlay: {
            screen: SearchScreen
        },
        ResultOverlay: {
            screen: ResultScreen
        },
        ErrorOverlay: {
            screen: ErrorScreen
        }
    },
    {
        initialRouteName: 'HomeOverlay',
        headerMode: 'none',
    }
);

const OverlayScreen = createAppContainer(stackOverlay);

export default OverlayScreen;

