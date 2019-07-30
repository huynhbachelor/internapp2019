import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CustomDrawer from './CustomDrawer';
import SettingScreen from './SettingScreen';
import ProfileScreen from './ProfileScreen';

const AppStack = createDrawerNavigator(
    { 
        Home: HomeScreen,
        Setting: SettingScreen,
        Profile: ProfileScreen,
    },
    {
        initialRouteName: 'Profile',
        mode: 'modal',
        headerMode: 'none',
        contentComponent: CustomDrawer
    }
);

export default AppStack;
