import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    ListItem,
    Avatar,
    Tooltip,
    Image,
    SearchBar,
    Icon,
} from 'react-native-elements';
import icMenu from '../../media/icons/icMenu.png';
import url from '../../api/base_url';


class CustomDrawer extends Component {

    state = {
        userName: 'user',
        data: [],
        search: '',
        avatarSource: url + 'image/user.jpg',
    }

    componentDidMount() { 
        const arr = [
            {
                key: '1',
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice President',
                online: true,
            },
            {
                key: '2',
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman',
                online: false,
            },
            {
                key: '3',
                name: 'Chris Jackson',
                avatar_url: this.state.avatarSource,
                subtitle: 'Vice Chairman',
                online: false,
            },
        ];
        this.setState({
            avatarSource: this.state.avatarSource + '?' + new Date(),
            data: arr,
        });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    gotoMap = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Home');
    }

    gotoSetting = () => {
        this.props.navigation.navigate('Setting');
    }

    gotoEditProfile = () => {
        this.props.navigation.navigate('Profile');
    }

    popoverItems = (
        <TouchableOpacity >
            <Text style={{ color: '#fff' }}>Hủy kết bạn</Text>
        </TouchableOpacity>
    )

    renderItems = ({ item }) => (
        <View style={{ flex: 1 }}>
            <ListItem
                key={item.key}
                leftAvatar={{ source: { uri: item.avatar_url } }}
                extraData={this.state}
                title={item.name}
                onPress={this.gotoMap}
                rightElement={
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: item.online ? 'green' : 'cyan',
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                            }}
                        />
                        <Tooltip popover={this.popoverItems}>
                            <Image
                                source={icMenu}
                                style={{ width: 15, height: 15, marginLeft: 5 }}
                            />
                        </Tooltip>
                    </View>
                }
            />
        </View>
    )

    render() {
        const {
            container,
            header,
            friend,
            footer
        } = styles;

        return (
            <SafeAreaView
                style={container}
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <View style={header}>
                    <Avatar
                        rounded
                        source={{
                            uri: this.state.avatarSource,
                            cache: 'reload'
                        }}
                        size={64}
                        showEditButton
                        onEditPress={this.gotoEditProfile}
                    />
                    <Icon
                        name='settings'
                        size={32}
                        color='#000'
                        containerStyle={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }}
                        onPress={this.gotoSetting}
                    />
                </View>
                <View style={friend}>
                    <ListItem
                        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
                        title='test'
                        rightElement={
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon 
                                    name='done'
                                />
                                <Icon 
                                    name='clear'
                                />
                            </View>
                        }
                    />
                </View>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item) => item.key}
                    renderItem={this.renderItems}
                />
                <SearchBar
                    containerStyle={footer}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    friend: {
        width: '100%',
        borderWidth: 1
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        position: 'absolute',
        bottom: 0
    },
});

export default CustomDrawer;
