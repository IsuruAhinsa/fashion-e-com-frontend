// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAMkt0dqtcFj78MgePpoXINEaD-9tExPoM",
	authDomain: "fashion-ecommerce-react-app.firebaseapp.com",
	projectId: "fashion-ecommerce-react-app",
	storageBucket: "fashion-ecommerce-react-app.appspot.com",
	messagingSenderId: "902965780288",
	appId: "1:902965780288:web:1dbb726d76b2968a0c24a5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Create an instance of the Google provider object
const provider = new GoogleAuthProvider();

export default db;
export { auth, storage, provider };
