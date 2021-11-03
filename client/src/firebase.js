// Import the functions you need from the SDKs you need
import app from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBOZvU4asin-XlzjlivI9IfEWlIbT1zqE",
  authDomain: "task-c.firebaseapp.com",
  projectId: "task-c",
  storageBucket: "task-c.appspot.com",
  messagingSenderId: "270364107680",
  appId: "1:270364107680:web:b298b527fc2286eef4bac5",
  measurementId: "G-ENKGLZV9DY"
};

// Initialize Firebase
class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
   
      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
    doSignOut = () => this.auth.signOut();
}

export default Firebase;