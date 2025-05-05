// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "-",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const signup = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed in 
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username: username.toLowerCase(),
            email,
            name: '',
            avatar: '',
            bio: 'hello there!',
        });

        await setDoc(doc(db, "userChats", user.uid), {
            chatData: []
        });
        console.log("User signed up:", user);
    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in 
        const user = userCredential.user;
        console.log("User logged in:", user);
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
    
const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


export { signup, login, logout, auth, db };
