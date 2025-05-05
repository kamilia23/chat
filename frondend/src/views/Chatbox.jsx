import React from 'react'

function Chatbox() {
  return (
    <div className='chatbox'>
      <div className="chat-user">
        <img src="img/user.png" alt="" />
        <p>Aiboud kamilia <img src="img/gd.png" alt="" /></p>
        <img src="img/help.png" alt="" />
      </div>

      <div className="chat-msg">
        <div className="s-msg received">
          <img src="img/user.png" alt="Avatar" className="avatar" />
          <div className="msg-content">
            <p className="msg">Salut, comment tu vas aujourd'hui ?</p>
            <span className="time">12:00</span>
          </div>
        </div>

        <div className="s-msg sent">
          <img src="img/user.png" alt="Avatar" className="avatar" />
          <div className="msg-content">
            <p className="msg">Je vais bien, merci ! Et toi ?</p>
            <span className="time">12:01</span>
          </div>
        </div>

        <div className="s-msg received">
          <img src="img/user.png" alt="Avatar" className="avatar" />
          <div className="msg-content">
            <p className="msg">Super ! On se voit à 14h ?</p>
            <span className="time">12:02</span>
          </div>
        </div>
      </div>



      <div className="chat-input">
        <input type="text" placeholder='Type your message here...' />
        <input type="file" id='image' accept='image/png, image/jpeg, image/jpg' hidden />
        <label htmlFor="image">
          <img src="img/gallery.png" alt="" />
        </label>
        <img src="img/send.png" alt="" />
      </div>
    </div>
  )
}

export default Chatbox
