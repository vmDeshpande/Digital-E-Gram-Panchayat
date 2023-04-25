const firebaseConfig = {
    apiKey: "AIzaSyC8UJu8JVuGTySyJhGN8YbmQuxXiCbKEqA",
    authDomain: "login-with-firebase-74542.firebaseapp.com",
    databaseURL: "https://login-with-firebase-74542-default-rtdb.firebaseio.com",
    projectId: "login-with-firebase-74542",
    storageBucket: "login-with-firebase-74542.appspot.com",
    messagingSenderId: "537948051051",
    appId: "1:537948051051:web:e93e9f54e4e2c2316ec32e",
    measurementId: "G-ZVDZ9GJTYP"
  };
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  const services = firebase.database().ref("services");
  const users = firebase.database().ref("users");
  
