import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { auth } from './config/firebase';
const Chat = React.lazy(() => import('./views/Chat'));
const Profile = React.lazy(() => import('./views/Profile'));
const Login = React.lazy(() => import('./views/Login'));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/chat');
        console.log("User is signed in:", user);
      } else {
        navigate('/');
        console.log("No user is signed in.");
      }
    });
  }, []);


  return (
      <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
