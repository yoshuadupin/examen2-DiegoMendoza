import ReactNative from "react-native";
import * as firebase from 'firebase';

// Required for side-effects

class Firebase{
  static init(){
    firebase.initializeApp({
      apiKey: "AIzaSyAuHHtkDEIOXd4qTYqAHeyO0KMAG8RIeIU",
      authDomain: "examen1-5f6f2.firebaseapp.com",
      databaseURL: "https://examen1-5f6f2.firebaseio.com",
      projectId: "examen1-5f6f2",
      storageBucket: "examen1-5f6f2.appspot.com",
      messagingSenderId: "2002432643"
    })
  }
}



module.exports  = Firebase
