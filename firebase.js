import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfdhU1pQwQbgRqOcWeHRZ0op_B609ENVo",
  authDomain: "signal-clone-dbb8a.firebaseapp.com",
  projectId: "signal-clone-dbb8a",
  storageBucket: "signal-clone-dbb8a.appspot.com",
  messagingSenderId: "90447366641",
  appId: "1:90447366641:web:72360406a7191e83ba5c50"
};
  
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}
const db = app.firestore();
const auth = app.auth();

export {db, auth}