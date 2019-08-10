import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ToastAndroid,
    PermissionsAndroid,
    Platform,
    Alert
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Icon, Avatar, Overlay } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import firebaseApp, { writeData } from '../../firebase';
import OverlayScreen from './myoverlay/OverlayScreen';
import getListDirection from '../../api/getListDirection';
import changeStatus from '../../api/changeStatus';

class HomeScreen extends Component {

    state = {
        isVisible: false,
        myCurpos: {
            latitude: 10.8393125,
            longitude: 106.7736884,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        frCurpos: {
            latitude: 10.8393125,
            longitude: 106.7736884,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        coordinates: [],
        isDirection: false,
    }

    componentDidMount() {
        this.getLocation();
        this.getLocationUpdates();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.friend.Userfriend !== this.props.friend.Userfriend) {
            if (prevProps.friend.Userfriend !== '') {
                firebaseApp.database().ref(prevProps.friend.Userfriend).child('where').off();
            }
            this.getLocationFriend(this.props.friend.Userfriend,
                this.props.friend.status);
        }
        if (prevProps.setting.isLocation !== this.props.setting.isLocation) {
            if (this.props.setting.isLocation) {
                changeStatus(this.props.user.token,
                    this.props.setting.isUpdateLocation);
            } else {
                changeStatus(this.props.user.token, 'NONE');
            }
        }

        if (prevState.myCurpos !== this.state.myCurpos || 
            prevState.frCurpos !== this.state.frCurpos) {
                if (this.state.isDirection) {
                    this.getDirection();
                }
        }

        if (prevProps.setting.isUpdateLocation !== this.props.setting.isUpdateLocation) {
            changeStatus(this.props.user.token,
                this.props.setting.isUpdateLocation);
        }
    }

    getLocationFriend = async (user, status) => {
        if (status === 'NONE') {
            this.setState({
                coordinates: [],
                isDirection: false
            });
            return;
        }
        this.setState({ isDirection: true });
        if (status) {
            firebaseApp.database().ref(user).child('where').on('value', (snapshot) => {
                if (this.state.isDirection) {
                    this.setState({
                        frCurpos: {
                            ...this.state.frCurpos,
                            latitude: snapshot.val().latitude,
                            longitude: snapshot.val().longitude
                        }
                    });
                }
            });
        } else {
            firebaseApp.database().ref(user).child('where').once('value', (snapshot) => {
                this.setState({
                    frCurpos: {
                        ...this.state.frCurpos,
                        latitude: snapshot.val().latitude,
                        longitude: snapshot.val().longitude
                    }
                });
            });
        }
    }

    getDirection = () => {
        getListDirection(this.state.myCurpos, this.state.frCurpos)
        .then(res => {
            if (res !== null) {
                const items = [];
                res.map((e) => {
                    items.push({
                        latitude: e[1], longitude: e[0]
                    });
                });
                this.setState({
                    coordinates: items
                });
            }
        });
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        Geolocation.getCurrentPosition(
            (position) => {
                this.geoSuccess(position);
            },
            (err) => {
                this.geoFailure(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 50,
                forceRequestLocation: true,
            }
        );
    }

    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.watchId = Geolocation.watchPosition(
            (position) => {
                this.geoSuccess(position);

            },
            (err) => {
                this.geoFailure(err);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 5,
                interval: 5000,
                fastestInterval: 2000
            }
        );
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
        }
    }

    watchId = null;

    geoSuccess = (position) => {
        this.setState({
            myCurpos: {
                ...this.state.myCurpos,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        });

        if (this.state.isDirection) {
            this.getDirection();
        }
        
        if (this.props.setting.isUpdateLocation) {
            writeData(this.props.user.Username,
                position.coords.latitude,
                position.coords.longitude);
        }
    }

    geoFailure = (err) => {
        Alert.alert(
            'Thông báo',
            'Lỗi! ' + err,
            [
                {
                    text: 'OK',
                }
            ],
            { cancelable: false }
        );
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    personAdd = () => {
        this.setState({
            isVisible: true,
        });
    }

    markerFriend = () => {
        if (this.props.friend.status !== 'NONE') {
            return (
                <Marker
                    coordinate={this.state.frCurpos}
                    anchor={{ x: 0.5, y: 0.5 }}
                    title={this.props.friend.subtitle}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: this.props.friend.Avatar_url,
                        }}
                    />
                </Marker>
            );
        } 
    };

    render() {
        const {
            container,
            header,
            textTitle,
            mapContainer,
            map,
            overlayStyle,
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
                    >Home</Text>
                    <Icon
                        name='person-add'
                        containerStyle={{ marginRight: 5 }}
                        color='#fff'
                        onPress={this.personAdd}
                    />
                </View>
                <View style={mapContainer}>
                    <MapView
                        provider={this.props.provider}
                        style={map}
                        initialRegion={this.state.myCurpos}
                        region={this.state.myCurpos}
                    >
                        <Marker
                            coordinate={this.state.myCurpos}
                            anchor={{ x: 0.5, y: 0.5 }}
                            title='Tôi'
                        >
                            <Avatar
                                rounded
                                source={{
                                    uri: this.props.user.Avatar_url,
                                }}
                            />
                        </Marker>
                        {this.markerFriend()}
                        <Polyline
                            coordinates={this.state.coordinates}
                            strokeColor="#238C23"
                            fillColor="rgba(255,0,0,0.5)"
                            strokeWidth={6}
                        />
                    </MapView>

                    <Overlay
                        isVisible={this.state.isVisible}
                        windowBackgroundColor="rgba(255, 255, 255, .5)"
                        overlayBackgroundColor="#122839"
                        width="80%"
                        height="auto"
                        onBackdropPress={() => this.setState({ isVisible: false })}
                    >
                        <View style={overlayStyle}>
                            <View
                                style={{
                                    height: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#111F2A',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        name='person-add'
                                        size={28}
                                        color='#fff'
                                    />
                                    <Text style={{ color: '#fff' }}>Thêm bạn</Text>
                                </View>
                                <Icon
                                    name='clear'
                                    size={28}
                                    color='#fff'
                                    onPress={() => this.setState({ isVisible: false })}
                                />
                            </View>
                            <View style={{ height: 190 }}>
                                <OverlayScreen />
                            </View>
                        </View>
                    </Overlay>
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
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlayStyle: {
        height: 'auto'
    }
});


export default HomeScreen;
