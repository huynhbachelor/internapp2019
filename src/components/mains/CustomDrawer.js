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
        const user = this.props.profile.Username;
        this.updateList(user);
        firebaseApp.database().ref(user)
            .child('friends')
            .on('child_changed', (snapshot) => {
                const items = {
                    data: snapshot.val(),
                    key: snapshot.key,
                };
                this.onChange(items);
            });
    }

    onDataArrived(newData) {
        this.setState({
            dataSourceFriend: this.state.dataSourceFriend.cloneWithRowsAndSections(newData),
        });
    }

    onChange = (item) => {
        const items = this.state.dataSourceFriend._dataBlob;
        items.map(e => {
            if (e.key === item.key) {
                e.data = item.data;
            }
        });
        this.onDataArrived(items);
    }


    onSubmitFriend = (user) => {
        submitFriend(this.props.profile.token, user)
            .then(res => {
                if (res === 'THANH_CONG') {
                    this.updateList(this.props.profile.Username);
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
                        unFriend(this.props.profile.token, user)
                        .then(
                                this.getListFriend(this.props.profile.Username)
                        );
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
                            blockFriend(this.props.profile.token, user);
                        }
                    }
                ],
                { cancelable: true }
            );
        } else {
            unBlockFriend(this.props.profile.token, user);
        }
    }


    getListFriend = (userName) => {
        const items = [];
        firebaseApp.database().ref(userName)
            .child('friends')
            .on('child_added', (snapshot) => {
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
        .on('child_added', (snapshot) => {
            items.push({
                data: snapshot.val(),
                key: snapshot.key,
            });
            this.setState({
                dataSourceWait: this.state.dataSourceWait.cloneWithRowsAndSections(items),
            });
        });
    }

    cancelFriend = (user) => {
        unFriendWait(this.props.profile.token, user);
        this.getListFriendWait(user);
    }

    updateList = (userName) => {
        if (userName !== '') {
            this.getListFriend(userName);
            this.getListFriendWait(userName);
        }
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
                            this.props.onchangeFriend('', st, '');
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
                key={item.data.userName}
                leftAvatar={{ source: { uri: urlImg + item.data.Avatar_url } }}
                extraData={this.state}
                title={item.data.subtitle}
                onPress={() => this.gotoMap(
                    item.key, 
                    item.data.online, 
                    item.data.subtitle, 
                    urlImg + item.data.Avatar_url
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
                <View style={friend}>
                    <FlatList
                        data={this.state.dataSourceWait._dataBlob}
                        extraData={this.state}
                        keyExtractor={(item) => item.key}
                        renderItem={this.renderItemsWait}
                    />
                </View>
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={this.state.dataSourceFriend._dataBlob}
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
