import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    View,
    Text,
    Alert,
    BackHandler
} from 'react-native';
import { urlImg } from '../../api/base_url';
import checkLogin from '../../api/checkLogin';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.getLoginInfor();
    }

    getLoginInfor = async () => {
        const obj = {};
        await AsyncStorage.getItem('settings').then((strResult) => {
            const result = JSON.parse(strResult) || {};
            Object.assign(obj, result);
            this.props.updateSetting(obj);
        });
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken === null) {
            this.props.navigation.navigate('SignIn');
        } else {
            this.getLogin(userToken);
        }
    }

    getLogin = (token) => {
        checkLogin(token)
            .then(res => res.json())
            .then(res => {
                if (res.token === 'HET_HAN') {
                    this.notification('Đăng nhập quá hạn mời bạn đăng nhập lại!');
                } else if (res.token === 'TOKEN_KHONG_HOP_LE') {
                    this.notification('Đăng nhập thất bại!\nĐăng nhập lại');
                } else {
                    const profile = {
                        token: res.token,
                        Username: res.user.Username,
                        Email: res.user.Email,
                        subtitle: res.user.subtitle,
                        Avatar_url: urlImg + res.user.Avatar_url + '?' + new Date(),
                    };
                    this.props.changeProfile(profile);
                    this.props.navigation.navigate('App');
                    AsyncStorage.setItem('userToken', res.token);
                }
            })
            .catch(() => {
                this.notification('Kết nối đến máy chủ thất bai!\nĐăng nhập lại?');
            });
    }

    notification = (e) => {
        Alert.alert(
            'Thông báo',
            e,
            [
                {
                    text: 'Cancel', 
                    onPress: () => BackHandler.exitApp()
                },
                {
                    text: 'Ok',
                    onPress: () => { this.props.navigation.navigate('SignIn'); }
                }
            ],
            { cancelable: true }
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6AD23A'
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#fff'
                    }}
                > Loading ...</Text>
                <ActivityIndicator size='large' />
            </View>
        );
    }
}

export default AuthLoadingScreen;
