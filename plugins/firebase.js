import firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCCR89Ghqlr66k2pjw1dnZklFCtzFzL0Ww",
      authDomain: "nostudio-e83c4.firebaseapp.com",
      databaseURL: "https://nostudio-e83c4.firebaseio.com",
      projectId: "nostudio-e83c4",
      storageBucket: "nostudio-e83c4.appspot.com",
      messagingSenderId: "1066020254690",
      appId: "1:1066020254690:web:6c6101dd4d9f4bcbaf3fbb",
      measurementId: "G-8LMEKW23R3"
  })
}

export default firebase