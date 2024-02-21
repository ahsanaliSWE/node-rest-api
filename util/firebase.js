/* import { initializeApp } from 'firebase/app';
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBTOknRAjXLEAMpW5DzI5JchvIJDs0bxfs",
    authDomain: "muet-api.firebaseapp.com",
    projectId: "muet-api",
    storageBucket: "muet-api.appspot.com",
    messagingSenderId: "640360312927",
    appId: "1:640360312927:web:55242756d0680b1eb4abea",
    measurementId: "G-3X3S96HGRZ"
  };
  
  const app = initializeApp(firebaseConfig);
 // firebase.initializeApp(firebaseConfig); //initialize firebase app 
  module.exports = { firebase }; //export the app   */
const admin = require('firebase-admin');

const serviceAccount = require('/Users/Ahsan Ali/Downloads/muet-api-firebase-adminsdk-jsu7e-c229b27a4e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/muet-api/firestore/data/~2Fbooks~2FkUshcYX9t0AGobzw1NPD' // Replace with your database URL
});

const db = admin.database();
