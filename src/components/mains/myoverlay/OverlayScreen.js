import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ResultScreen from './ResultScreen';
import ErrorScreen from './ErrorScreen';
import SucessScreen from './SucessScreen';


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
        },
        SucessOverlay: {
            screen: SucessScreen
        }
    },
    {
        initialRouteName: 'HomeOverlay',
        headerMode: 'none',
    }
);

const OverlayScreen = createAppContainer(stackOverlay);

export default OverlayScreen;

