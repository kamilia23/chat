import { useContext } from 'react'
import { logout } from '../config/firebase'
import { AppContext } from '../context/AppContext';

function RightSideBar() {
  const { userData } = useContext(AppContext);

  return (
    <div className='right-side-bar'>
      <div className="right-side-bar-profile">
        <img src="img/user.png" alt="" />
        <h3>{userData.name || userData.username} <img src="img/gd.png" alt="" /></h3>
        <p>{userData.bio} </p>
      </div>

      <div className="right-side-bar-media">
        <h2>Media</h2>
        <div>
          <img src="img/user.png" alt="" />
          <img src="img/user.png" alt="" />
          <img src="img/user.png" alt="" />
          <img src="img/user.png" alt="" />
          <img src="img/user.png" alt="" />
          <img src="img/user.png" alt="" />
        </div>
      </div>

      <div className="right-side-bar-deconnect">
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

export default RightSideBar
