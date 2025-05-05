import React from 'react'

function LeftSideBar() {
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
          <input type="text" placeholder='Search here..' />
        </div>
      </div>
      <div className="left-list">
        {Array(10).fill("").map((_, index) => (
          <div className="friends" key={index}>
            <img src="img/user.png" alt="" />
            <div className="left-list-item-text">
              <p>John Doe</p>
              <span>how are you</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSideBar
