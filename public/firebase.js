// Import the functions you need from the SDKs you need
import {collection, getDocs, getFirestore} from 'firebase/firestore/lite';
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// https://firebase.google.com/docs/firestore/query-data/listen?hl=en&authuser=2

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHvbco1olMEAtvK9BK0nS-rGPoc4_z0Ig",
    authDomain: "future-is-queer-6c3b4.firebaseapp.com",
    projectId: "future-is-queer-6c3b4",
    storageBucket: "future-is-queer-6c3b4.appspot.com",
    messagingSenderId: "5121677841",
    appId: "1:5121677841:web:995009ec31b8433bb2afb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app: ", app)
const db = getFirestore(app);
console.log("db: ", db)
// Get a list of cities from your database
export async function getWords() {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);
    return wordSnapshot.docs.map(doc => doc.data().word);
}


/*
const unsub = onSnapshot(doc(db, "cities", ), (doc) => {
    console.log("Current data: ", doc.data());
});*/
