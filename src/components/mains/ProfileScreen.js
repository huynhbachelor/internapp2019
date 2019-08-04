import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import uploadImg from '../../api/uploadImg';
import url, { urlImg } from '../../api/base_url';
import checkLogin from '../../api/checkLogin';
import changeInfor from '../../api/changeInfor';

class ProfileScreen extends Component {

    state = {
        token: '',
    }

    componentDidMount() {
        this.getLoginInfor();
    }

    getLoginInfor = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        checkLogin(userToken)
            .then(res => {
                if (res.token === 'HET_HAN') {
                    alert('Đăng nhập quá hạn mời bạn đăng nhập lại!');
                    this.props.navigation.navigate('SignIn');
                } else if (res.token === 'TOKEN_KHONG_HOP_LE') {
                    alert('Lỗi! Đăng nhập lại!');
                    this.props.navigation.navigate('SignIn');
                } else {
                    this.setState({
                        token: res.token,
                        // Username: res.user.Username,
                        // Email: res.user.Email,
                        // subtitle: res.user.subtitle,
                        // Avatar_url: (res.user.Avatar_url === '') ? this.state.Avatar_url :
                        // url + 'image/' + res.user.Avatar_url + '?' + new Date(),
                    });
                    const profile = {
                        Username: res.user.Username,
                        Email: res.user.Email,
                        subtitle: res.user.subtitle,
                        Avatar_url: urlImg + res.user.Avatar_url + '?' + new Date(),
                    };
                    this.props.changeProfile(profile);
                    AsyncStorage.setItem('userToken', res.token);
                }
            })
            .catch(e => {
                alert('Lỗi không xác định!' + e);
            });
    }

    selecctImage = async () => {
        ImagePicker.showImagePicker(
            {
                noData: true,
                mediaType: 'photo',
                allowsEditing: true,
                quality: 0.7
            },
            (response) => {
                if (response.didCancel) {

                } else if (response.error) {

                } else if (response.customButton) {

                } else {
                    // this.uploadImg(response.uri);setState({ Avatar_url: response.uri });
                    this.props.updateImg(response.uri);
                }
            }
        );
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    editAvatar = () => {
        this.selecctImage();
    }

    updateProfile = () => {
        if (uploadImg(this.props.profile.Username, this.props.profile.Avatar_url)) {
            if (changeInfor(this.state.token, 
                this.props.profile.subtitle, 
                this.props.profile.Email)) {
                alert('Cập nhật thành công!');
                return;
            }
        }
        alert('Cập nhật không thành công!');
    }

    Edittable = (num) => {
        this.setState({
            isEditEmail: num === 0,
            isEditName: num === 1,
        });
    }

    render() {
        const {
            container,
            header,
            textTitle,
            formStyle,
            textStyle,
        } = styles;
        
        const {
            Avatar_url,
            Email,
            subtitle,
        } = this.props.profile;

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
                    >Profile</Text>
                    <View style={{ width: 1 }} />
                </View>
                <View style={formStyle}>
                    <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
                        <Avatar
                            rounded
                            source={{
                                uri: Avatar_url
                            }}
                            size={120}
                            showEditButton
                            onEditPress={this.editAvatar}
                        />
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: 25,
                            }}
                        >{this.state.Username}</Text>
                    </View>
                    <View style={{ padding: 10, width: '100%', height: 'auto' }}>
                        <Input
                            value={subtitle}
                            onChangeText={(text) => this.setState({ subtitle: text })}
                            containerStyle={textStyle}
                            shake='true'
                            placeholder='Tên của bạn'
                            rightIcon={<Icon
                                name='edit'
                                size={24}
                                color='black'
                            />}
                        />

                        <Input
                            value={Email}
                            onChangeText={(text) => this.setState({ Email: text })}
                            containerStyle={textStyle}
                            shake='true'
                            placeholder='Email của bạn'
                            // editable={true}
                            rightIcon={<Icon
                                name='edit'
                                size={24}
                                color='black'
                            // onPress={this.Edittable(1)}
                            />}
                        />
                    </View>
                    <Button
                        title='Cập nhật thông tin'
                        onPress={this.updateProfile}
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
        fontSize: 20,
    },
    formStyle: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textStyle: {
        borderWidth: 2,
        borderColor: '#0A5289',
        borderRadius: 20,
        width: '100%',
        marginVertical: 10
    },
});

export default ProfileScreen;

