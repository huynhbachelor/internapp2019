import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCWQao_LNa4L86op5oDB21vyiJZ2tkddcE",
    authDomain: "intern-365ea.firebaseapp.com",
    databaseURL: "https://intern-365ea.firebaseio.com",
    projectId: "intern-365ea",
    storageBucket: "intern-365ea.appspot.com",
    messagingSenderId: "296045848757",
    appId: "1:296045848757:web:574a8acf71ab153b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const readData = async(userName) => {
    return firebaseApp.database().ref(userName).child('WHERE').on('value', function(snapshot) {
        obj = {
            latitude: snapshot.val().latitude,
            longitude: snapshot.val().longitude
        };
        return snapshot.val();
    });  
};

export const readStatus = async(userName) => {
    return firebaseApp.database().ref(userName).child('STATUS').on('value', (snapshot) => {
        snapshot.val();
    });  
};

export const writeData = (userName, lati, longi) => {
    firebaseApp.database().ref(userName).child('WHERE').set({
        latitude: lati,
        longitude: longi,
    });
};

export const writeStatus = (userName) => {
    firebaseApp.database().ref(userName).set({
        STATUS: 0,
    });
};

export const addFriend = (userName, nameFriend, avatarUrl, subtitle) => {
    firebaseApp.database().ref(userName).child('friend_wait/' + nameFriend).set({
        Avatar_url: avatarUrl,
        subtitle,
    });
};

export const submitFriend = (userName, nameFriend, avatarUrl, subtitle, online) => {
    firebaseApp.database().ref(userName).child('friends/' + nameFriend).set({
        Avatar_url: avatarUrl,
        subtitle,
        online
    });
};

export const removeFriend = async(userName, nametable, key) => {
    await firebaseApp.database().ref(userName).child(nametable).child(key).remove(

    );
};

export default firebaseApp;
