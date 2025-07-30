import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { collection, addDoc, doc, serverTimestamp, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../config/firebase';
import { io } from "socket.io-client";
import { onSnapshot } from "firebase/firestore";


const socket = io("http://localhost:5000");
function Chatbox() {
  const { userData, selectedUser } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const loadMessagesFromFirestore = async () => {
    const chatId = [userData.id, selectedUser.id].sort().join('_');
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    const q = query(messagesRef, orderBy("time"));
    const querySnapshot = await getDocs(q);

    const messagesData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    setMessages(messagesData);
  };

useEffect(() => {
  if (!userData || !selectedUser) return;

  const chatId = [userData.id, selectedUser.id].sort().join('_');
  const chatRef = doc(db, "chats", chatId);
  const messagesRef = collection(chatRef, "messages");
  const q = query(messagesRef, orderBy("time"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messagesData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setMessages(messagesData);
  });

  return () => unsubscribe();
}, [selectedUser, userData]);


  useEffect(() => {
    if (userData) {
      socket.emit('user_connected', userData.id);

      socket.on('update_users', (users) => {
        setOnlineUsers(users.filter(u => u !== userData.id));
      });

      socket.on('receive_message', (data) => {
        setMessages(prev => [...prev, data]);
      });
    }

    return () => {
      socket.off('update_users');
      socket.off('receive_message');
    };
  }, [userData]);

  const saveMessageToFirestore = async (message) => {
    const chatId = [userData.id, selectedUser.id].sort().join('_'); // pour avoir un ID commun
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    await addDoc(messagesRef, {
      from: message.from,
      to: message.to,
      text: message.text,
      time: serverTimestamp(),  // Firestore timestamp
    });
  };


  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!selectedUser) {
      alert('Sélectionnez un utilisateur');
      return;
    }
    const newMsg = {
      from: userData.id,
      to: selectedUser.id,
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      socket.emit("send_message", newMsg);

      await saveMessageToFirestore(newMsg);

      setMessages([...messages, { ...newMsg, id: messages.length + 1, from: "Moi" }]);      
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };


  return (
    <div className='chatbox'>
      <div className="chat-user">
        <img src="/img/user.png" alt="" />
        <p>{selectedUser && selectedUser.username} <img src="/img/gd.png" alt="" /></p>
        <img src="/img/help.png" alt="" />
      </div>

      <div className="chat-msg">
        {messages.map((msg) => {
          const isMine = msg.from === userData.id || msg.from === "Moi";

          return (
            <div className={`s-msg ${isMine ? 'sent' : 'received'}`} key={msg.id}>
              {!isMine && <img src="/img/user.png" alt="Avatar" className="avatar" />}
              <div className="msg-content">
                <p className="msg">{msg.text}</p>
                <span className="time">
                  {msg.time?.seconds
                    ? new Date(msg.time.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : msg.time}
                </span>
              </div>
              {isMine && <img src="/img/user.png" alt="Avatar" className="avatar" />}
            </div>
          );
        })}

      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder='Type your message here...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <input type="file" id='image' accept='image/png, image/jpeg, image/jpg' hidden />
        <label htmlFor="image">
          <img src="/img/gallery.png" alt="gallery" />
        </label>
        <button type="submit" style={{ background: 'none', border: 'none' }}>
          <img src="/img/send.png" alt="send" style={{ width: '24px', height: '24px' }} />
        </button>

      </form>
    </div>
  );
}

export default Chatbox;
