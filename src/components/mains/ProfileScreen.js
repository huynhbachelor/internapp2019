import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import uploadImg from '../../api/uploadImg';
import changeInfor from '../../api/changeInfor';

class ProfileScreen extends Component {

    state = {
        Email: '',
        subtitle: '',
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
        if (uploadImg(this.props.profile.Username, this.props.profile.Avatat_url)) {
            if (changeInfor(this.props.profile.token,
                this.props.profile.subtitle,
                this.props.profile.Email)) {
                alert('Cập nhật thành công!');
                const profile = {
                    ...this.props.profile,
                    Email: this.state.Email,
                    subtitle: this.state.subtitle,
                };
                this.props.changeProfile(profile);
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

