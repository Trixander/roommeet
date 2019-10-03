import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCIrGdI43oUuhXXjKqyfZzKJs5Dzu4hO2g",
    authDomain: "roommate-finder-afd9b.firebaseapp.com",
    databaseURL: "https://roommate-finder-afd9b.firebaseio.com",
    storageBucket: "",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);