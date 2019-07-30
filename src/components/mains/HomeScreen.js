import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    ToastAndroid,
    PermissionsAndroid,
    Platform
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Avatar, Overlay } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import OverlayScreen from './myoverlay/OverlayScreen';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    state = {
        isVisible: false,
        curPos: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            error: null,
        },
        curPos2: {
            latitude: 10.8393125,
            longitude: 106.7736884,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({ loading: true }, () => {
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
                    forceRequestLocation: true 
                }
            );
        });
    }

    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({ updatesEnabled: true }, () => {
            this.watchId = Geolocation.watchPosition(
                (position) => {
                    console.log(position);
                },
                (error) => {
                    console.log(error);
                },
                { 
                    enableHighAccuracy: true, 
                    distanceFilter: 0, 
                    interval: 5000, 
                    fastestInterval: 2000 
                }
            );
        });
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.setState({ updatesEnabled: false });
        }
    }

    watchId = null;

    geoSuccess = (position) => {
        this.setState({
            curPos: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }
        });
    }

    geoFailure = (err) => {
        this.setState({ curPos: { error: err.message } });
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
                        style={map}
                        region={this.state.curPos}
                    >
                        <MapView.Marker
                            coordinate={this.state.curPos}
                            anchor={{ x: 0.5, y: 0.5 }}
                            title='My'
                        >
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-1/p240x240/21369315_662301163968494_6369722257653880738_n.jpg?_nc_cat=110&_nc_oc=AQnIhTdUty-el472nKeRDQ4JSrSvM326yCYcUcy1uo1kYR8NK5Ibmz_uBATeUjue6GM&_nc_ht=scontent.fsgn8-1.fna&oh=776b296ad6142b640a9a5ea2d585bf66&oe=5DB3FDA4',
                                }}
                            />
                        </MapView.Marker>
                        <MapView.Marker
                            coordinate={this.state.curPos2}
                            anchor={{ x: 0.5, y: 0.5 }}
                            title='Friend'
                        >
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/p240x240/56835586_2286560624945251_4925639516355559424_n.jpg?_nc_cat=106&_nc_oc=AQk34OjQLHmstYSp49Wxbb5M5N7Qxm9S-LdeVoRRL4OaaRTFJnLS5Z9XVO7EmW72qrM&_nc_ht=scontent.fsgn3-1.fna&oh=148f44b035ab063624d1776c7c7d36de&oe=5DBEA48D',
                                }}
                            />
                        </MapView.Marker>
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
