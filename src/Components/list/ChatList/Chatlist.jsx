import React, { useEffect, useState } from 'react'
import './Chatlist.css'
import search from '../../../Assets/search.png'
import plus from '../../../Assets/plus.png'
import minus from '../../../Assets/minus.png'
import avatar from '../../../Assets/avatar.png'
import AddUser from './addUser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore'

const Chatlist = () => {
  const [addMode, setAddmode] = useState(false)
  const [chats, setChats] = useState([])
  const { currentUser } = useUserStore()
  const { chatId, changeChat } = useChatStore()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats

      const promises = items.map(async (item) => {
        const userdocRef = doc(db, "users", item.receiverId)
        const userdocSnap = await getDoc(userdocRef)

        const user = userdocSnap.data()
        return { ...item, user }
      })

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    })

    return () => {
      unsub()
    }
  }, [currentUser.id])

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user)
  }

  return (
    <div className='ChatList'>
      <div className="search">
        <div className="searchBar">
          <img src={search} alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img src={addMode ? minus : plus} alt="" className='add' onClick={() => setAddmode(prev => !prev)} />
      </div>

      <div className="chatlistsAll">
        {chats.map((chat) => (
          <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
            <img src={chat.user.avatar || avatar} alt="" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
        {addMode && <AddUser />}
      </div>
    </div>
  )
}

export default Chatlist
