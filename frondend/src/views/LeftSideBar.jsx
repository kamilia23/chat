import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { db } from '../config/firebase';

function LeftSideBar() {
  const [allUsers, setAllUsers] = useState([]);
 const { userData, setSelectedUser } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    const input = e.target.value.trim().toLowerCase();
  
    if (input === '') {
      setShowSearch(false);
      return;
    }
  
    setShowSearch(true);
  
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", input));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const foundUser = querySnapshot.docs[0].data();
        if (querySnapshot.docs[0].id !== userData?.id) {
          setUser(foundUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur recherche utilisateur :", error);
    }
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, 'users');
        const querySnapshot = await getDocs(userRef);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setAllUsers(users);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
  
    fetchUsers();
  }, [userData]);
  


  return (
    <div className='left-side-bar'>
      <div className="left-top">
        <div className="left-nav">
          <img src="img/logo.png" alt="logo" className='logo' />
          <div className="menu">
            <img src="img/pts.png" alt="" />
          </div>
        </div>
        <div className="left-search">
          <img src="img/search.png" alt="" className='search-icon' />
          <input type="text" onChange={inputHandler} placeholder='Search here..' />
        </div>
      </div>
      <div className="left-list">
        {showSearch && user ?
          <div className='friends add-user' onClick={() => setSelectedUser(user)}>
            <img src="img/user.png" alt="" />
            <p>{user.name || user.username}</p>
          </div>

          : (
            allUsers.map((u) => (
              <div className="friends" key={u.id} onClick={() => setSelectedUser(u)}>
                <img src="img/user.png" alt="" />
                <div className="left-list-item-text">
                  <p>{u.name || u.username}</p>
                  <span>{u.bio || "No message"}</span>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

export default LeftSideBar
