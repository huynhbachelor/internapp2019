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

export const readData = (userName) => {
    let obj = {
        latitude: null,
        longitude: null,
    };
    firebaseApp.database().ref(userName).on('value', function(snapshot) {
        obj = {
            latitude: snapshot.val().latitude,
            longitude: snapshot.val().longitude
        };
    });  
    return obj;   
};

export const writeData = (userName) => {
    firebaseApp.database().ref(userName).set({
        latitude: 0.1,
        longitude: 0,
    });
};

export default firebaseApp;
