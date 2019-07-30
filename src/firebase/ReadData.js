import firebaseApp from './Config';

const readData = (userName) => {
    firebaseApp.database().ref(userName).on('value', function(snapshot) {
        
        // latitude: snapshot.val().latitude,
        // longitude: snapshot.val().longitude,
    });
      
};

export default readData;

