// Import the functions you need from the SDKs you need
import {collection, getDocs, getFirestore,  setDoc, onSnapshot, doc, query} from 'firebase/firestore';

let initialState = true;

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
const db = getFirestore(app);
// Get a list of cities from your database
export async function getWords() {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);
    return wordSnapshot.docs.map(doc => doc.data().word);


}

export async function submitWord(word) {
    // await addDoc(citiesRef,  {word})
    const wordsRef = doc(db, 'words', word + Date.now());
    setDoc(wordsRef, { word }, { merge: true });
    console.log("success")
    // Add a new document in collection "cities"
    /*await setDoc(doc(db, "words"), {
        word
    });*/
}

export  function subscribeToUpdates(cb) {
    const q = query(collection(db, "words"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        if (initialState){
            initialState = false;
            return;
        }
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New word: ", change.doc.data().word);
                cb(change.doc.data().word)
            }
                console.log("change type: ", change.type)
        });
    });
}


