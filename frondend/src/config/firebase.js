// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAg2wIRWh-_dExQeFGd7nm57jweP03yahI",
  authDomain: "chat-app-5078a.firebaseapp.com",
  projectId: "chat-app-5078a",
  storageBucket: "chat-app-5078a.firebasestorage.app",
  messagingSenderId: "588061809773",
  appId: "1:588061809773:web:95b53f1794221d822a7364",
  measurementId: "G-0JTTZ1M7XH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const signup = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email , password);
        // Signed in 
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username: username.toLowerCase(),
            email,
            name: '',
            bio: 'hello there!',
            lastSeen: new Date().toLocaleString(),
        });

        await setDoc(doc(db, "chats", user.uid), {
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