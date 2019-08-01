import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CustomDrawer from './CustomDrawer';
import SettingContainer from '../../containers/SettingContainer';
import ProfileScreen from './ProfileScreen';

const AppDrawer = createDrawerNavigator(
    { 
        Home: HomeScreen,
        Setting: SettingContainer,
        Profile: ProfileScreen,
    },
    {
        initialRouteName: 'Setting',
        mode: 'modal',
        headerMode: 'none',
        contentComponent: CustomDrawer
    }
);

const AppStack = createAppContainer(AppDrawer);

export default AppStack;
