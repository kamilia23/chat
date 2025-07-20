import { onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { auth } from './config/firebase';
import { AppContext } from './context/AppContext';
const Chat = React.lazy(() => import('./views/Chat'));
const Profile = React.lazy(() => import('./views/Profile'));
const Login = React.lazy(() => import('./views/Login'));

function App() {
  const { authReady } = useContext(AppContext);

  if (!authReady) {
    return <div>Vérification de l'authentification...</div>;
  }


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
