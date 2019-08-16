import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import uploadImg from '../../api/uploadImg';
import changeInfor from '../../api/changeInfor';

class ProfileScreen extends Component {

    state = {
        Email: '',
        subtitle: '',
        isLoading: false,
        isUpdateImg: false,
    }

    componentDidMount() {
        this.setState({
            Email: this.props.profile.Email,
            subtitle: this.props.profile.subtitle,
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
                    this.setState({ isUpdateImg: true });
                }
            }
        );
    }

    notification = (mess) => {
        Alert.alert(
            'Thông báo',
            mess,
            [
                {
                    text: 'OK',
                }
            ],
            { cancelable: false }
        );
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    editAvatar = () => {
        this.selecctImage();
    }

    updateProfile = () => {
        this.setState({ isLoading: true });
        if (this.state.isUpdateImg) {
            if (uploadImg(this.props.profile.Username, this.props.profile.Avatar_url)) {
                changeInfor(this.props.profile.token,
                    this.state.subtitle,
                    this.state.Email)
                    .then(res => {
                        if (res === 'THANH_CONG') {
                            this.notification('Cập nhật thành công!');
                            const profile = {
                                ...this.props.profile,
                                Email: this.state.Email,
                                subtitle: this.state.subtitle,
                                Avatar_url: this.props.profile.Avatar_url + '?' + new Date(),
                            };
                            this.props.changeProfile(profile);
                            this.setState({ isLoading: false });
                        } else {
                            this.notification('Cập nhật không thành công!');
                        }
                    }).catch(() => this.notification('Cập nhật không thành công!'));
            } else {
                this.notification('Cập nhật không thành công!');
            }
        } else {
            changeInfor(this.props.profile.token,
                this.state.subtitle,
                this.state.Email)
                .then(res => {
                    if (res === 'THANH_CONG') {
                        this.notification('Cập nhật thành công!');
                        const profile = {
                            ...this.props.profile,
                            Email: this.state.Email,
                            subtitle: this.state.subtitle,
                            Avatar_url: this.props.profile.Avatar_url + '?' + new Date(),
                        };
                        this.props.changeProfile(profile);
                        this.setState({ isLoading: false });
                    } else {
                        this.notification('Cập nhật không thành công!');
                    }
                }).catch(() => this.notification('Cập nhật không thành công!'));
        }
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
        } = this.props.profile;

        const {
            Email,
            subtitle,
        } = this.state;

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
                    >Thông tin cá nhân</Text>
                    <View style={{ width: 1 }} />
                </View>
                {
                    (this.state.isLoading) ? 
                    <ActivityIndicator 
                        size='small'
                        color='#0000ff'
                    /> :
                    null
                }
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
                        >{this.props.profile.Username}</Text>
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

