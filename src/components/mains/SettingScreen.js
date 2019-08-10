import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, AsyncStorage } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import changeAdd from '../../api/changeAdd';

class SettingScreen extends Component {

    componentDidUpdate(preprops) {
        if (preprops.mySetting !== this.props.mySetting) {
            this.saveChanged();
        }
    }

    onChangeAdd = (field, value) => {
        changeAdd(this.props.token, (value) ? 0 : 1)
        .then(res => {
            if (res === 'THANH_CONG') {
                this.props.settingChange(field, !value);
            }
        });
    }

    onChangeLocation = (field, value) => {
        this.props.settingChange(field, !value);
    }

    saveChanged = async () => {
        const obj = this.props.mySetting;
        AsyncStorage.getItem('settings').then((strResult) => {
            const result = JSON.parse(strResult) || {};
            Object.assign(result, obj);
            AsyncStorage.setItem('settings', JSON.stringify(result));
        });
    };

    switchChanged = (field, value) => {
        if (this.props.mySetting.isLocation) {
            this.props.settingChange(field, !value);
        }
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    signOutAsync = async() => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    };

    render() {
        const {
            container,
            header,
            textTitle,
            switchStyle,
            textStyle
        } = styles;

        const { mySetting } = this.props;

        return (
            <View style={container}>
                <View style={header}>
                    <Icon
                        name='menu'
                        containerStyle={{ marginLeft: 5 }}
                        color='#fff'
                        onPress={this.openDrawer}
                    />
                    <Text
                        style={textTitle}
                    >Setting</Text>
                    <View style={{ width: 1 }} />
                </View>
                <View>
                    <View style={switchStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='location-on'
                                size={24}
                            />
                            <Text style={textStyle}>
                                {
                                    (mySetting.isLocation) ?
                                        'Bật vị trí của bạn' : 'Tắt vị trí của bạn'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={mySetting.isLocation}
                            onChange={
                                () => this.onChangeLocation('isLocation', mySetting.isLocation)
                            }
                        />
                    </View>

                    <View style={switchStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='update'
                                size={24}
                            />
                            <Text style={textStyle}>
                                {
                                    (mySetting.isUpdateLocation) ?
                                        'Bật cập nhật vị trí' : 'Tắt cập nhật vị trí'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={mySetting.isUpdateLocation}
                            onChange={() => this.switchChanged('isUpdateLocation', 
                            mySetting.isUpdateLocation)}
                        />
                    </View>

                    <View style={switchStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='group-add'
                                size={24}
                            />
                            <Text style={textStyle}>
                                {
                                    (mySetting.isAddFriend) ?
                                        'Nhận lời mời kết bạn' : 'Không nhận lời mời kết bạn'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={mySetting.isAddFriend}
                            onChange={() => this.onChangeAdd('isAddFriend', 
                            mySetting.isAddFriend)}
                        />
                    </View>

                    <Button
                        title='Đăng xuất'
                        onPress={this.signOutAsync}
                        containerStyle={{ marginHorizontal: 10 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#156AAB',
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    textStyle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 5,
    },
    switchStyle: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
});

export default SettingScreen;

