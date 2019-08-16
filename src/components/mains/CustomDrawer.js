import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ListView,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
    ListItem,
    Avatar,
    Image,
    SearchBar,
    Icon,
} from 'react-native-elements';
import PopoverTooltip from 'react-native-popover-tooltip';

import icMenu from '../../media/icons/icMenu.png';
import { urlImg } from '../../api/base_url';
import firebaseApp from '../../firebase';
import submitFriend from '../../api/submitFriend';
import unFriendWait from '../../api/unFriendWait';
import unFriend from '../../api/unFriend';
import blockFriend from '../../api/blockFriend';
import unBlockFriend from '../../api/unBlockFriend';


class CustomDrawer extends Component {

    state = {
        search: '',
        dataSourceWait: [],
        dataSourceFriend: [],
        isLoading: false
    }

    componentDidMount() {
        const user = this.props.profile.Username;
        if (user !== '') {
            this.getListFriend(user);
            this.getListFriendWait(user);
        }
        firebaseApp.database().ref(user)
            .child('friends')
            .on('child_changed', (snapshot) => {
                const item = {
                    data: snapshot.val(),
                    key: snapshot.key,
                };
                this.onChange2(item);
                if (this.props.friend.Userfriend === item.key) {
                    this.props.onchangeFriend(item.key, item.data.online, 
                        item.data.subtitle, urlImg + item.data.Avatar_url + '?' + new Date());
                }
            });
        firebaseApp.database().ref(user)
        .child('friend_wait')
        .on('child_changed', (snapshot) => {
            const item = {
                data: snapshot.val(),
                key: snapshot.key,
            };
            this.onChange1(item);
        });
    }

    onDataArrived(newData) {
        this.setState({
            dataSourceFriend: [...this.state.dataSourceFriend, newData],
        });
    }

    onChange1 = (item) => {
        const items = this.state.dataSourceWait;
        items.map(e => {
            if (e.key === item.key) {
                e.data = item.data;
            }
        });
        this.setState({
            dataSourceWait: items,
        });
    }

    onChange2 = (item) => {
        const items = this.state.dataSourceFriend;
        items.map(e => {
            if (e.key === item.key) {
                e.data = item.data;
            }
        });
        this.setState({
            dataSourceFriend: items,
        });
    }

    onSubmitFriend = (user) => {
        this.setState({ isLoading: true });
        submitFriend(this.props.profile.token, user)
            .then(res => {
                if (res === 'THANH_CONG') {
                    this.updateListWait(this.props.profile.Username);
                    this.setState({ isLoading: false });
                    Alert.alert(
                        'Thông báo',
                        'Kết bạn thành công!',
                        [
                            {
                                text: 'OK',
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    this.setState({ isLoading: false });
                    Alert.alert(
                        'Thông báo',
                        'Không thể kết bạn! Hãy thử lại!',
                        [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: 'Ok',
                                onPress: () => this.onSubmitFriend(user)
                            }
                        ],
                        { cancelable: true }
                    );
                }
            })
            .catch(() => {
                this.setState({ isLoading: false });
                Alert.alert(
                    'Thông báo',
                    'Kết nối máy chủ thất bại! thử lại!',
                    [
                        {
                            text: 'OK',
                            onPress: () => this.onSubmitFriend(user)
                        }
                    ],
                    { cancelable: true }
                );
            });
    }

    onCancelFriend = (user) => {
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn không quen! Xác nhận xóa?',
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => this.cancelFriend(user)
                }
            ],
            { cancelable: true }
        );
    }

    onUnFriend = (user, name) => {
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn hủy kết bạn? :(( \n Bạn và ' + name + 'không thể thấy vị trí của nhau',
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        this.setState({ isLoading: true });
                        unFriend(this.props.profile.token, user)
                        .then(() => {
                            this.updateListFriend(this.props.profile.Username);
                            this.setState({ isLoading: false });
                        });
                    }
                }
            ],
            { cancelable: true }
        );
    }

    onBlockFriend = (user, status) => {
        if (!status) {
            Alert.alert(
                'Thông báo',
                'Bạn chắc chắn chặn người này? :((',
                [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.setState({ isLoading: true });
                            blockFriend(this.props.profile.token, user)
                            .then(this.setState({ isLoading: false }));
                        }
                    }
                ],
                { cancelable: true }
            );
        } else {
            this.setState({ isLoading: true });
            unBlockFriend(this.props.profile.token, user)
            .then(this.setState({ isLoading: false }));
        }
    }


    getListFriend = (userName) => {
        firebaseApp.database().ref(userName)
            .child('friends')
            .on('child_added', (snapshot) => {
                const item = {
                    data: snapshot.val(),
                    key: snapshot.key,
                };
                this.onDataArrived(item);
            });
    }

    getListFriendWait = (userName) => {
        firebaseApp.database().ref(userName)
        .child('friend_wait')
        .on('child_added', (snap) => {
            const item = {
                data: snap.val(),
                key: snap.key,
            };
            this.setState({
                dataSourceWait: [...this.state.dataSourceWait, item],
            });
        });
    }

    cancelFriend = (user) => {
        this.setState({ isLoading: true });
        unFriendWait(this.props.profile.token, user)
        .then(() => {
            this.setState({ isLoading: false });
        });
        this.updateListWait(user);
    }

    updateListWait = (userName) => {
        this.setState({
            dataSourceWait: [],
        });
        
        firebaseApp.database().ref(userName).child('friend_wait').off();
        this.getListFriendWait(userName);
    }

    updateListFriend = (userName) => {
        this.setState({
                dataSourceFriend: [],
        });
        
        firebaseApp.database().ref(userName).child('friends').off();
        this.getListFriend(userName);
    }

    updateSearch = search => {
        this.setState({ search });
    };

    gotoMap = (key, st, subtitle, ava) => {
        if (st === 'NONE') {
            Alert.alert(
                'Thông báo',
                subtitle + ' không muốn bạn thấy vị trí của họ!\nBạn muốn chuyển qua trang chủ?',
                [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.props.onchangeFriend(key, st, subtitle, ava);
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('Home');
                        }
                    }
                ],
                { cancelable: true }
            );
            return;
        }
        this.props.onchangeFriend(key, st, subtitle, ava);
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
        <View>
            <TouchableOpacity>
                <Text
                    style={{color: '#fff' }}
                >Hủy kết bạn</Text>
            </TouchableOpacity>
        </View>
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
                            onPress={() => this.onSubmitFriend(item.key)}
                        />
                        <Icon
                            name='clear'
                            onPress={() => this.onCancelFriend(item.key)}
                        />
                    </View>
                }
            />
        </View>
    )

    renderItems = ({ item }) => (
        <View style={{ flex: 1 }}>
            <ListItem
                key={item.key}
                leftAvatar={{ source: { uri: urlImg + item.data.Avatar_url } }}
                title={item.data.subtitle}
                onPress={() => this.gotoMap(
                    item.key, 
                    item.data.online, 
                    item.data.subtitle, 
                    urlImg + item.data.Avatar_url,
                    )}
                rightElement={
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {
                            (item.data.block) ?  
                            <Icon 
                                name='error-outline' 
                                size={15}
                                color='#000'
                            /> :
                            null
                        }
                        {
                            (item.data.online === 'NONE') ?
                            <Icon 
                                name='block'
                                size={15}
                                color='#000'
                            /> :
                            <View
                                style={{
                                    backgroundColor: item.data.online ? 'green' : 'cyan',
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                }}
                            />
                        }
                        <PopoverTooltip
                            buttonComponent={
                                <Image
                                    source={icMenu}
                                    style={{ width: 15, height: 15, marginLeft: 5 }}
                                />
                            }
                            items={[
                                {
                                    label: 'Hủy kết bạn',
                                    onPress: () => this.onUnFriend(item.key, item.data.subtitle),
                                },
                                {
                                    label: (item.data.block)
                                     ? 'Bỏ chặn!' : 'Chặn người này!',
                                    onPress: () => this.onBlockFriend(item.key, item.data.block)
                                },
                            ]}
                        />
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

        const {
            Avatar_url
        } = this.props.profile;
        return (
            <SafeAreaView
                style={container}
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <View style={header}>
                    <Avatar
                        rounded
                        source={{
                            uri: Avatar_url,
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
                {
                    (this.state.isLoading) ? 
                    <ActivityIndicator 
                        size='small'
                        color='#0000ff'
                    /> :
                    null
                }
                {
                    (this.state.dataSourceWait.length === 0) ? 
                    null :
                    <View style={friend}>
                        <FlatList
                            data={this.state.dataSourceWait}
                            extraData={this.state}
                            keyExtractor={(item) => item.key}
                            renderItem={this.renderItemsWait}
                        />
                    </View>
                }
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={this.state.dataSourceFriend}
                        extraData={this.state}
                        keyExtractor={(item) => item.key}
                        renderItem={this.renderItems}
                    />
                </View>
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    friend: {
        flex: 1,
        borderBottomWidth: 1,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        // position: 'absolute',
        // bottom: 0
    },
});

export default CustomDrawer;
