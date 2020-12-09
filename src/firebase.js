import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAJVsA82EAJAtqW4G0PhQfn1Mb-vRwQt3k",
    authDomain: "creggslist-46e2d.firebaseapp.com",
    projectId: "creggslist-46e2d",
    storageBucket: "creggslist-46e2d.appspot.com",
    messagingSenderId: "888791254831",
    appId: "1:888791254831:web:cd0611d45038ff765083da"
};
firebase.initializeApp(config);
const storage = firebase.storage();
export  {
    storage, firebase as default
  }
