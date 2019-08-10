import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon, Input, CheckBox, Button, Image } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import eyeInvisible from '../../media/icons/eyeInvisible.png';
import eye from '../../media/icons/eye.png';
import login from '../../api/login';


class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    state = {
        checked: false,
        eyechek: false,
        userName: '',
        passWord: '',
        status: false,
    }

    componentDidMount() {
        this.getLogin();
    }

    onFail() {
        Alert.alert(
            'Thông báo',
            'Sai thông tin đăng nhập!',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onSuccess = async (token) => {
        await AsyncStorage.setItem('userToken', token);
        const {
            checked,
            userName,
            passWord
        } = this.state;
        if (checked) {
            this.loginChanged(checked, userName, passWord);
        } else {
            this.loginChanged(checked, '', '');
        }
        this.props.navigation.navigate('AuthLoading');
    };

    getLogin = async () => {
        try {
            const obj = {};
            let Login = await AsyncStorage.getItem('LOGIN');
            Login = JSON.parse(Login);
            Object.assign(obj, Login);
            this.setState(obj);
            console.log(obj);
        } catch (e) {
        } finally {
        }
    }

    loginChanged(checked, userName, passWord) {
        const obj = {};
        obj['checked'] = checked;
        obj['userName'] = userName;
        obj['passWord'] = passWord;
        AsyncStorage.getItem('LOGIN').then(function (strResult) {
            const result = JSON.parse(strResult) || {};
            Object.assign(result, obj);
            AsyncStorage.setItem('LOGIN', JSON.stringify(result));
        });
        this.setState(obj);
    }

    login = () => {
        this.setState({
            status: true
        });
        let tokenuser = '';
        let user = null;
        login(this.state.userName, this.state.passWord)
        .then(res => {
            tokenuser = res.token;
            user = res.user;
            if (tokenuser !== 'SAI_THONG_TIN') {
                this.onSuccess(tokenuser, user);
            } else {
                this.onFail();
            }
        })
        .catch(() => {
            this.setState({ status: false });
            Alert.alert(
                'Thông báo',
                'Kết nối tới máy chủ thất bại.',
                [
                    { 
                        text: 'OK' 
                    }
                ],
                { cancelable: false }
            );
        });
    }

    gotoRegister = () => {
        this.props.navigation.navigate('Register');
    }


    renemberme = () => {
        this.setState({
            checked: !this.state.checked,
        });
    }

    showPass = () => {
        this.setState({
            eyechek: !this.state.eyechek,
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
            status
        } = this.state;

        const imgTest = (
            <Image
                source={(this.state.eyechek) ? eye : eyeInvisible}
                style={{ width: 24, height: 24 }}
            />
        );

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={container}
                scrollEnabled
                enableOnAndroid
                enableAutomaticScroll
            >
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff"
                    animating={status}
                />
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
                    >WelCome back</Text>
                    <Text>Sign in to continue</Text>
                </View>
                <View style={formStyle}>
                    <Input
                        value={userName}
                        onChangeText={(text) => this.setState({ userName: text })}
                        containerStyle={textStyle}
                        shake='true'
                        placeholder='Username'
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
                        placeholder='Password'
                        secureTextEntry={!this.state.eyechek}
                        leftIcon={<Icon
                            name='lock'
                            size={24}
                            color='black'
                        />}
                        rightIcon={
                            <TouchableOpacity
                                onPress={this.showPass}
                            >
                                {imgTest}
                            </TouchableOpacity>
                        }
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <CheckBox
                            title='Renember me'
                            checked={this.state.checked}
                            onPress={this.renemberme}
                        />
                        <Text>Forgot Password?</Text>
                    </View>
                    <Button
                        title="Sign in"
                        containerStyle={{ height: 40, width: '100%' }}
                        onPress={this.login}
                    />
                    <Text>Don't have an accout yet?</Text>
                    <Button
                        title="Create account"
                        containerStyle={{ height: 40, width: '100%' }}
                        type="outline"
                        onPress={this.gotoRegister}
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

export default SignInScreen;
