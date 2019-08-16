import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Icon, Input, Button, } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import register from '../../api/register';


class RegisterScreen extends Component {

    state = {
        userName: '',
        passWord: '',
        rePassword: '',
        status: false,
    }

    onError() {
        Alert.alert(
            'Thông báo',
            'Nhập thông tin không hợp lệ',
            [
                { text: 'OK', onPress: () => this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        );
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng kí thành công!',
            [
                {
                    text: 'OK', 
                    onPress: () => this.props.navigation.navigate('SignIn')
                }
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Thông báo',
            'User đã tồn tại',
            [
                { text: 'OK', onPress: () => this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        );
    }

    registerAuth = () => {
        if (this.state.userName.length >= 4 && this.state.passWord >= 6
            && this.state.rePassword === this.state.passWord) {
            this.setState({ status: true });
            register(this.state.userName, this.state.passWord)
                .then(res => {
                    if (res === 'THANH_CONG') {
                        this.setState({ status: false });
                        this.onSuccess();
                    } else {
                        this.onFail();
                    }
                });
        } else {
            this.onError();
        }
    }

    removeEmail() {
        this.setState({
            userName: '',
            passWord: '',
            rePassword: '',
        });
    }

    render() {
        const {
            container,
            logoStyle,
            titleStyle,
            formStyle,
            footerStyle,
            textStyle, } = styles;

        const {
            userName,
            passWord,
            rePassword,
            status
        } = this.state;

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={container}
                scrollEnabled
                enableOnAndroid
                enableAutomaticScroll
            >
                { 
                    (status) ? 
                    <ActivityIndicator 
                        size="large" 
                        color="#0000ff"
                    /> :
                    null
                }
                <View style={logoStyle}>
                    <Icon name='rowing' />
                </View>
                <View style={titleStyle}>
                    <Text
                        style={{
                            fontFamily: 'Cochin',
                            fontSize: 30,
                            fontWeight: 'bold'
                        }}
                    >Tạo tài khoản mới</Text>
                    <Text>Register to continue</Text>
                </View>
                <View style={formStyle}>
                    <Input
                        value={userName}
                        onChangeText={(text) => this.setState({ userName: text })}
                        containerStyle={textStyle}
                        shake='true'
                        placeholder='Tên đăng nhập'
                        leftIcon={<Icon
                            name='person'
                            size={24}
                            color='black'
                        />}
                    />
                    <Input
                        value={passWord}
                        onChangeText={(text) => this.setState({ passWord: text })}
                        containerStyle={textStyle}
                        shake='true'
                        placeholder='Mật khẩu'
                        secureTextEntry
                        leftIcon={<Icon
                            name='lock'
                            size={24}
                            color='black'
                        />}
                    />

                    <Input
                        value={rePassword}
                        onChangeText={(text) => this.setState({ rePassword: text })}
                        containerStyle={textStyle}
                        shake='true'
                        placeholder='Nhập lại mật khẩu'
                        secureTextEntry
                        leftIcon={<Icon
                            name='lock'
                            size={24}
                            color='black'
                        />}
                    />
                    <Button
                        title="Đăng kí"
                        containerStyle={{ height: 40, width: '100%' }}
                        onPress={this.registerAuth}
                    />
                    <Text>Login with Facebook or Gmail</Text>
                    <Button
                        title="Login with facebook"
                        containerStyle={{ height: 40, width: '100%' }}
                        type="outline"
                    />
                    <Button
                        title="Login with gmail"
                        containerStyle={{ height: 40, width: '100%' }}
                        type="outline"
                    />
                </View>
                <View style={footerStyle}>
                    <Text>Bach production</Text>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    logoStyle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        flex: 1,
        marginHorizontal: 30,
    },
    formStyle: {
        flex: 5,
        marginHorizontal: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerStyle: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textStyle: {
        borderWidth: 2,
        borderColor: '#0A5289',
        borderRadius: 20,
        width: '100%',
    },
});

export default RegisterScreen;
