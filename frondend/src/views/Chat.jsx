import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../style.css';
import Chatbox from './Chatbox';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

//const socket = io('http://localhost:5000');

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);


//   useEffect(() => {
//     socket.emit('getContacts');
//     socket.on('contactsList', (list) => {
//       setContacts(list);
//     });
//     return () => socket.off('contactsList');
//   }, []);

//   // When a contact is selected, join their room and fetch conversation
//   useEffect(() => {
//     if (!selectedContact) return;
//     // Leave any previous room
//     socket.emit('joinRoom', { room: selectedContact.roomId });

//     // Request message history
//     socket.emit('getHistory', { room: selectedContact.roomId });
//     socket.on('history', (history) => {
//       setMessages(history);
//       scrollToBottom();
//     });

//     // Listen for incoming messages
//     socket.on('message', (msg) => {
//       if (msg.roomId === selectedContact.roomId) {
//         setMessages((prev) => [...prev, msg]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.off('history');
//       socket.off('message');
//     };
//   }, [selectedContact]);

//   // Auto-scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Handle sending a new message
//   const handleSend = () => {
//     if (!newMessage.trim() || !selectedContact) return;
//     const msg = {
//       roomId: selectedContact.roomId,
//       from: socket.id,
//       content: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//     };
//     socket.emit('sendMessage', msg);
//     setMessages((prev) => [...prev, msg]);
//     setNewMessage('');
//     scrollToBottom();
//   };



  return (
	<div className='chat'>
		<div className='chat-container'>
			<LeftSideBar />
			<Chatbox />
			<RightSideBar />
		</div>
	</div>
	
    // <div hidden id='body'>
    //       <div class="container-fluid h-100">
	// 		<div class="row justify-content-center h-100">
	// 			<div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
	// 				<div class="card-header">
	// 					<div class="input-group">
	// 						<input type="text" placeholder="Search..." name="" class="form-control search"/>
	// 						<div class="input-group-prepend">
	// 							<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<div class="card-body contacts_body">
	// 					<ui class="contacts">
	// 					<li class="active">
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Khalid</span>
	// 								<p>Kalid is online</p>
	// 							</div>
	// 						</div>
	// 					</li>
	// 					<li>
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon offline"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Taherah Big</span>
	// 								<p>Taherah left 7 mins ago</p>
	// 							</div>
	// 						</div>
	// 					</li>
	// 					<li>
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Sami Rafi</span>
	// 								<p>Sami is online</p>
	// 							</div>
	// 						</div>
	// 					</li>
	// 					<li>
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon offline"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Nargis Hawa</span>
	// 								<p>Nargis left 30 mins ago</p>
	// 							</div>
	// 						</div>
	// 					</li>
	// 					<li>
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon offline"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Rashid Samim</span>
	// 								<p>Rashid left 50 mins ago</p>
	// 							</div>
	// 						</div>
	// 					</li>
	// 					</ui>
	// 				</div>
	// 				<div class="card-footer"></div>
	// 			</div></div>
	// 			<div class="col-md-8 col-xl-6 chat">
	// 				<div class="card">
	// 					<div class="card-header msg_head">
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Chat with Khalid</span>
	// 								<p>1767 Messages</p>
	// 							</div>
	// 							<div class="video_cam">
	// 								<span><i class="fas fa-video"></i></span>
	// 								<span><i class="fas fa-phone"></i></span>
	// 							</div>
	// 						</div>
	// 						<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
	// 						<div class="action_menu">
	// 							<ul>
	// 								<li><i class="fas fa-user-circle"></i> View profile</li>
	// 								<li><i class="fas fa-users"></i> Add to close friends</li>
	// 								<li><i class="fas fa-plus"></i> Add to group</li>
	// 								<li><i class="fas fa-ban"></i> Block</li>
	// 							</ul>
	// 						</div>
	// 					</div>
	// 					<div class="card-body msg_card_body">
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								Hi, how are you samim?
	// 								<span class="msg_time">8:40 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								Hi Khalid i am good tnx how about you?
	// 								<span class="msg_time_send">8:55 AM, Today</span>
	// 							</div>
	// 							<div class="img_cont_msg">
						
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								I am good too, thank you for your chat template
	// 								<span class="msg_time">9:00 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								You are welcome
	// 								<span class="msg_time_send">9:05 AM, Today</span>
	// 							</div>
	// 							<div class="img_cont_msg">
							
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								I am looking for your next templates
	// 								<span class="msg_time">9:07 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								Ok, thank you have a good day
	// 								<span class="msg_time_send">9:10 AM, Today</span>
	// 							</div> 
	// 							<div class="img_cont_msg">
						
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img style={{height: '50px'}} src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								Bye, see you
	// 								<span class="msg_time">9:12 AM, Today</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div class="card-footer">
	// 						<div class="input-group">
	// 							<div class="input-group-append">
	// 								<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
	// 							</div>
	// 							<textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
	// 							<div class="input-group-append">
	// 								<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
    // </div>
	// <div className="container-fluid h-100">
	// <div className="row justify-content-center h-100">

	//   {/* Colonne contacts */}
	//   <div className="col-md-4 col-xl-3 chat">
	// 	<div className="card contacts_card mb-sm-3 mb-md-0">
	// 	  <div className="card-header">
	// 		<input
	// 		  type="text"
	// 		  placeholder="Search..."
	// 		  className="form-control search"
	// 		  // Implémenter un filtre si besoin
	// 		/>
	// 	  </div>
	// 	  <div className="card-body contacts_body">
	// 		<ul className="contacts list-unstyled mb-0">
	// 		  {contacts.map((c) => (
	// 			<li
	// 			  key={c.id}
	// 			  className={selectedContact?.id === c.id ? 'active' : ''}
	// 			  onClick={() => setSelectedContact(c)}
	// 			>
	// 			  <div className="d-flex bd-highlight">
	// 				<div className="img_cont">
	// 				  <img
	// 					src={c.avatar}
	// 					alt={c.name}
	// 					className="rounded-circle user_img"
	// 					style={{height: '50px'}}
	// 				  />
	// 				  <span className={`online_icon ${c.online ? '' : 'offline'}`}></span>
	// 				</div>
	// 				<div className="user_info">
	// 				  <span>{c.name}</span>
	// 				  <p>{c.status}</p>
	// 				</div>
	// 			  </div>
	// 			</li>
	// 		  ))}
	// 		</ul>
	// 	  </div>
	// 	</div>
	//   </div>

	//   {/* Colonne chat */}
	//   <div className="col-md-8 col-xl-6 chat">
	// 	<div className="card">
	// 	  {selectedContact ? (
	// 		<>
	// 		  <div className="card-header msg_head">
	// 			<div className="d-flex bd-highlight">
	// 			  <div className="img_cont">
	// 				<img
	// 				  src={selectedContact.avatar}
	// 				  alt={selectedContact.name}
	// 				  className="rounded-circle user_img"
	// 				  style={{height: '50px'}}
	// 				/>
	// 				<span className={`online_icon ${selectedContact.online ? '' : 'offline'}`}></span>
	// 			  </div>
	// 			  <div className="user_info">
	// 				<span>Chat with {selectedContact.name}</span>
	// 				<p>{messages.length} Messages</p>
	// 			  </div>
	// 			</div>
	// 		  </div>

	// 		  <div className="card-body msg_card_body">
	// 			{messages.map((m, i) => (
	// 			  <div
	// 				key={i}
	// 				className={`d-flex mb-4 ${m.from === socket.id ? 'justify-content-end' : 'justify-content-start'}`}
	// 			  >
	// 				{m.from !== socket.id && (
	// 				  <div className="img_cont_msg">
	// 					<img
	// 					  src={selectedContact.avatar}
	// 					  alt=""
	// 					  className="rounded-circle user_img_msg"
	// 					  style={{height: '50px'}}
	// 					/>
	// 				  </div>
	// 				)}
	// 				<div className={m.from === socket.id ? 'msg_cotainer_send' : 'msg_cotainer'}>
	// 				  {m.content}
	// 				  <span className={m.from === socket.id ? 'msg_time_send' : 'msg_time'}>
	// 					{new Date(m.timestamp).toLocaleTimeString()}
	// 				  </span>
	// 				</div>
	// 				<div ref={messagesEndRef}></div>
	// 			  </div>
	// 			))}
	// 		  </div>

	// 		  <div className="card-footer">
	// 			<div className="input-group">
	// 			  <textarea
	// 				className="form-control type_msg"
	// 				placeholder="Type your message..."
	// 				value={newMessage}
	// 				onChange={(e) => setNewMessage(e.target.value)}
	// 			  />
	// 			  <div className="input-group-append">
	// 				<button className="input-group-text send_btn" onClick={handleSend}>
	// 				  <i className="fas fa-location-arrow"></i>
	// 				</button>
	// 			  </div>
	// 			</div>
	// 		  </div>
	// 		</>
	// 	  ) : (
	// 		<div className="card-body text-center">
	// 		  <p>Sélectionnez un contact pour démarrer la conversation</p>
	// 		</div>
	// 	  )}
	// 	</div>
	//   </div>

	// </div>
    // </div>
  );
};


export default Chat;
