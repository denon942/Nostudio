import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

if(!firebase.apps.length){
  firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_FIREBASE,
    authDomain: "nostudio-6ba94.firebaseapp.com",
    projectId: "nostudio-6ba94",
    storageBucket: "nostudio-6ba94.appspot.com",
    messagingSenderId: "578693738116",
    appId: "1:578693738116:web:1594e9b5686e5443f4dcd1",
    measurementId: "G-0404W04CKP"
  })
}

export default firebase
