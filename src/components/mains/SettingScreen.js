import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, AsyncStorage } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { } from '../../firebase/index';

class SettingScreen extends Component {

    componentDidMount() {
        this.getSetting()
            .then((res) => {
                this.props.updateSetting(res);
            });
    }

    getSetting = async () => {
        try {
            const obj = {};
            await AsyncStorage.getItem('settings').then((strResult) => {
                const result = JSON.parse(strResult) || {};
                // console.log(result);
                Object.assign(obj, result);
            });
            // let settings = await AsyncStorage.getItem('settings');
            // settings = JSON.parse(settings);
            // Object.assign(obj, settings);
            return obj;
        } catch (e) {
        } finally {
        }
    };

    saveChanged = async (field, value) => {
        const obj = {};
        obj[field] = value;
        AsyncStorage.getItem('settings').then((strResult) => {
            const result = JSON.parse(strResult) || {};
            Object.assign(result, obj);
            AsyncStorage.setItem('settings', JSON.stringify(result))
        });
    };

    switchChanged = (field, value) => {
        this.saveChanged(field, value)
            .then(() => {
                this.props.settingChange(field, value);
            });
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
                                        'Tắt vị trí của bạn' : 'Bật vị trí của bạn'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={mySetting.isLocation}
                            onValueChange={this.switchChanged('isLocation', true)}
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
                                        'Tắt cập nhật vị trí' : 'Bật cập nhật vị trí'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={mySetting.isUpdateLocation}
                            onValueChange={this.switchChanged('isUpdateLocation', true)}
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

