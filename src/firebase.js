// src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDUYAzap5eGZlDwPlT-xLAlXrCYDiZCkdI",
    authDomain: "quicklinks-4ebda.firebaseapp.com",
    databaseURL: "https://quicklinks-4ebda.firebaseio.com",
    projectId: "quicklinks-4ebda",
    storageBucket: "quicklinks-4ebda.appspot.com",
    messagingSenderId: "713029846912",
    appId: "1:713029846912:web:b44d3d9eca481b3914a365",
    measurementId: "G-1BJTL3HD6Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();