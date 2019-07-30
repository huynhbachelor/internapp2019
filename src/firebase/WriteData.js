import firebaseApp from './Config';

const writeData = (userName) => {
    firebaseApp.database().ref(userName).set({
        latitude: 0.1,
        longitude: 0,
    });
};

export default writeData;

