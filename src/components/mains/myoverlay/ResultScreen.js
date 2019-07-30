import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import search from '../../../api/search';
import url from '../../../api/base_url';


class ResultScreen extends Component {

    state = {
        result: {
            Username: 'Amy Farha',
            Avatar_url: 'image/user.jpg',
            subtitle: 'Vice President',
        }
    }

    componentDidMount() {
        this.setState({
            result: this.props.navigation.getParam('user', ''),
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
                            source={{ uri: url + 'image/' + this.state.result.Avatar_url }}
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
