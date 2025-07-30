import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const loadUserData = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            setUserData(userSnap.data());
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                    navigate("/chat/" + user.uid);
                }
            } else {
                setUserData(null);
                navigate("/");
            }
            setAuthReady(true);
        });

        return () => unsubscribe();
    }, []);




    const value = {
        userData,
        setUserData,
        loadUserData,
        authReady,
        selectedUser,   
        setSelectedUser,
    };


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}


export default AppContextProvider