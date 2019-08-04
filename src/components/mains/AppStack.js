import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
// import CustomDrawer from './CustomDrawer';
import SettingContainer from '../../containers/SettingContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import DrawerContainer from '../../containers/DrawerContainer';
// import ProfileScreen from './ProfileScreen';

const AppDrawer = createDrawerNavigator(
    { 
        Home: HomeScreen,
        Setting: SettingContainer,
        Profile: ProfileContainer,
    },
    {
        initialRouteName: 'Home',
        mode: 'modal',
        headerMode: 'none',
        contentComponent: DrawerContainer
    }
);

const AppStack = createAppContainer(AppDrawer);

export default AppStack;
