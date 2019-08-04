import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    View,
    Text,
} from 'react-native';
import { urlImg } from '../../api/base_url';
import checkLogin from '../../api/checkLogin';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.getLoginInfor();
    }

    getLoginInfor = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken);
        if (userToken === null) {
            this.props.navigation.navigate('SignIn');
        } else {
            checkLogin(userToken)
            .then(res => {
                if (res.token === 'HET_HAN') {
                    alert('Đăng nhập quá hạn mời bạn đăng nhập lại!');
                    this.props.navigation.navigate('SignIn');
                } else if (res.token === 'TOKEN_KHONG_HOP_LE') {
                    alert('Đăng nhập thất bại!');
                    this.props.navigation.navigate('SignIn');
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
            .catch(e => {
                alert('Lỗi không xác định! Vui lòng đăng nhập lại!');
                this.props.navigation.navigate('SignIn');
            });
        }
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
