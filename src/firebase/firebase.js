import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCskCNeqDwo00jast_IXjPgpb_6NZbxTHI",
    authDomain: "tellarabia-e4031.firebaseapp.com",
    projectId: "tellarabia-e4031",
    storageBucket: "tellarabia-e4031.appspot.com",
    messagingSenderId: "378673986162",
    appId: "1:378673986162:web:327a6584bd7f65cea6a0eb",
    measurementId: "G-CG9JY3E9XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;