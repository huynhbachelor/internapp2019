import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, AsyncStorage } from 'react-native';
import { Icon, Button } from 'react-native-elements';

class SettingScreen extends Component {

    state = {
        isLocation: false,
        isUpdateLocation: false,
    }

    componentDidMount() {
        this.getSetting();
    }

    getSetting = async () => {
        try {
            const obj = {};
            let settings = await AsyncStorage.getItem('settings');
            settings = JSON.parse(settings);
            Object.assign(obj, settings);// không có cũng đc
            this.setState(obj);
        } catch (e) {
        } finally {
        }
    }

    switchChanged(field, value) {
        const obj = {};
        obj[field] = value;
        AsyncStorage.getItem('settings').then(function (strResult) {
            const result = JSON.parse(strResult) || {};
            Object.assign(result, obj);
            AsyncStorage.setItem('settings', JSON.stringify(result));
        });
        this.setState(obj);
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    signOutAsync = async () => {
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
                                    (this.state.isLocation) ?
                                        'Tắt vị trí của bạn' : 'Bật vị trí của bạn'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={this.state.isLocation}
                            onValueChange={() => this.switchChanged('isLocation', !this.state.isLocation)}
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
                                    (this.state.isUpdateLocation) ?
                                        'Tắt cập nhật vị trí' : 'Bật cập nhật vị trí'
                                }
                            </Text>
                        </View>
                        <Switch
                            value={this.state.isUpdateLocation}
                            onValueChange={() => this.switchChanged('isUpdateLocation', !this.state.isUpdateLocation)}
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

