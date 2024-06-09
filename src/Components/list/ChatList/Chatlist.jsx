import React, { useEffect, useState } from 'react';
import './Chatlist.css';
import search from '../../../Assets/search.png';
import plus from '../../../Assets/plus.png';
import minus from '../../../Assets/minus.png';
import avatar from '../../../Assets/avatar.png';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const Chatlist = () => {
  const [addMode, setAddmode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("Current user is not defined");
      return;
    }

    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userdocRef = doc(db, "users", item.receiverId);
        const userdocSnap = await getDoc(userdocRef);

        const user = userdocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unsub();
    }
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map(item => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className='ChatList'>
      <div className="search">
        <div className="searchBar">
          <img src={search} alt="" />
          <input type="text" placeholder='Search' 
            onChange={(e) => setInput(e.target.value)} />
        </div>
        <img src={addMode ? minus : plus} alt="" className='add' onClick={() => setAddmode(prev => !prev)} />
      </div>

      <div className="chatlistsAll">
        {filteredChats.map((chat) => (
          <div 
            className="item" 
            key={chat.chatId} 
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img 
              src={chat.user.blocked.includes(currentUser.id) ? avatar : chat.user.avatar || avatar} 
              alt="User Avatar" 
              onError={(e) => { e.target.src = avatar }} 
            />
            <div className="texts">
              <span>{chat.user.blocked.includes(currentUser.id) ? "user" : chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
        {addMode && <AddUser />}
      </div>
    </div>
  );
}

export default Chatlist;
