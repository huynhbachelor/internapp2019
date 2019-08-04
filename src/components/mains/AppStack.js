import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import SettingContainer from '../../containers/SettingContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import DrawerContainer from '../../containers/DrawerContainer';
import HomeContainer from '../../containers/HomeContainer';

const AppDrawer = createDrawerNavigator(
    { 
        Home: HomeContainer,
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
