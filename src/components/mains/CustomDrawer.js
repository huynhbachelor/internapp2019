import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ListView,
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
import url, { urlImg } from '../../api/base_url';
import firebaseApp, { addFriend, submitFriend } from '../../firebase';


class CustomDrawer extends Component {

    state = {
        search: '',
        status: false,
        dataSourceWait: new ListView.DataSource(
            {
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        ),
        dataSourceFriend: new ListView.DataSource(
            {
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        ),
    }

    componentDidMount() {
        if (this.userName !== '') {
            this.getListFriend(this.userName);
            this.getListFriendWait(this.userName);
        }
        // this.getListChange('test');
    }


    onDataArrived(newData) {
        this.setState({
            dataSourceFriend: this.state.dataSourceFriend.cloneWithRowsAndSections(newData),
        });
    }

    getListFriend = (userName) => {
        const items = [];
        firebaseApp.database().ref(userName)
        .child('friends')
        .once('child_added', (snapshot) => {
            items.push({
                data: snapshot.val(),
                key: snapshot.key,
            });
            this.onDataArrived(items);
        });
    }

    getListFriendWait = (userName) => {
        const items = [];
        firebaseApp.database().ref(userName)
        .child('friend_wait')
        .once('child_added', (snapshot) => {
            items.push({
                data: snapshot.val(),
                key: snapshot.key,
            });
            this.setState({
                dataSourceWait: this.state.dataSourceWait.cloneWithRowsAndSections(items),
            });
        });
    }

    userName = this.props.profile.Username;

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

    renderItemsWait = ({ item }) => (
        <View style={{ flex: 1 }}>
            <ListItem
                leftAvatar={{ source: { uri: urlImg + item.data.Avatar_url } }}
                title={item.data.subtitle}
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
    )

    renderItems = ({ item }) => (
        <View style={{ flex: 1 }}>
            <ListItem
                key={item.data.userName}
                leftAvatar={{ source: { uri: urlImg + item.data.Avatar_url } }}
                extraData={this.state}
                title={item.data.subtitle}
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
                                backgroundColor: item.data.online ? 'green' : 'cyan',
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
                            uri: this.props.profile.Avatar_url,
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
                    <FlatList
                        data={this.state.dataSourceWait._dataBlob}
                        extraData={this.state}
                        keyExtractor={(item) => item.key}
                        renderItem={this.renderItemsWait}
                    />
                </View>
                <FlatList
                    data={this.state.dataSourceFriend._dataBlob}
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
        borderBottomWidth: 1,
        height: 80,
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
