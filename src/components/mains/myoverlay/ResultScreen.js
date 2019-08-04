import React, { Component } from 'react';
import { View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import { urlImg } from '../../../api/base_url';
import addFriend from '../../../api/addFriend';


class ResultScreen extends Component {

    state = {
        result: {
            Username: '',
            Avatar_url: '',
            subtitle: '',
        }
    }

    componentDidMount() {
        this.setState({
            result: this.props.navigation.getParam('user', ''),
        });
    }

    onAddFriend = async() => {
        const userToken = await AsyncStorage.getItem('userToken');
        addFriend(userToken, this.state.result.Username).then(res => {
            console.log(res);
            if (res === 'THANH_CONG') {
                this.props.navigation.navigate('SucessOverlay', {
                    SUCESS: 1
                });
            } else {
                this.props.navigation.navigate('SucessOverlay', {
                    SUCESS: 0
                });
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        height: 150,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#111F2A'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 5,
                        }}
                    >
                        <Avatar
                            rounded
                            source={{ uri: urlImg + this.state.result.Avatar_url }}
                            size={50}
                        />

                        <View>
                            <Text
                                style={{ 
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginLeft: 5, 
                                }}
                            >{this.state.result.Username}</Text>
                            <Text
                                style={{ 
                                    color: '#fff',
                                    fontSize: 18,
                                    marginLeft: 5,
                                }}
                            >{this.state.result.subtitle}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 40 }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#1E425E',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 1
                        }}
                        onPress={this.onAddFriend}
                    >
                        <Text
                            style={{ color: '#fff' }}
                        >Kết Bạn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#1E425E',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 1
                        }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text
                            style={{ color: '#fff' }}
                        >Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ResultScreen;
