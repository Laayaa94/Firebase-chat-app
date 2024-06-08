import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import EmojiPicker from 'emoji-picker-react'
import img from '../../Assets/img.png'
import camera from '../../Assets/camera.png'
import microphone from '../../Assets/mic.png'
import emoji from '../../Assets/emoji.png'
import phone from '../../Assets/phone.png'
import video from '../../Assets/video.png'
import info from '../../Assets/info.png'
import avatar from '../../Assets/avatar.png'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
const Chat = () => {
  const[open,setOpen]=useState(false);
  const[chat,setChat]=useState();
  const[text,setText]=useState("");
const {currentUser}=useUserStore();
  const {chatId,user}=useChatStore();
  const endRef =useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChat(res.data())
    })
    return()=>{
      unSub();
    }
  },[chatId])

  const handleEmoji = e=>{
    setText((prev)=>prev + e.emoji);
    setOpen(false)
  };
  const handleSend= async()=>{
    if(text==="") return;
    try{

      await updateDoc(doc(db,"chats",chatId),{
        messages:arrayUnion({
          senderId:currentUser.id,
          text,
          createdAt:new Date(),
        }),
      });
      const userIDs=[currentUser.id,user.id];

      userIDs.forEach(async(id) =>{

        const userChatRef=doc(db,"userchats",id)
      const userChatsSnapshot=await getDoc(userChatRef)

      if(userChatsSnapshot.exists()){
        const userChatsData=userChatsSnapshot.data()
        const chatIndex=userChatsData.chats.findIndex(c=>c.chatId=== chatId)

        userChatsData.chats[chatIndex].lastMessage=text;
        userChatsData.chats[chatIndex].isSeen = 
        id ===currentUser.id?true:false;
        userChatsData.chats[chatIndex].updatedAt=Date.now();

        await updateDoc(userChatRef,{
          chats:userChatsData.chats,
        });
      }
      });
     
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={avatar} alt="" />
          <div className="texts">
            <span>Jane Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
       <div className="icons">
       <img src={phone} alt="" />
        <img src={video} alt="" />
        <img src={info} alt="" />
       </div>
      </div>
      <div className="center">

       {  

       chat?.messages?.map((message)=>(
       <div className="message own" key={message.createAt}>
         { message.img && <
          img src={message.img}
          alt="" />}
          <div className="texts">
            <p>{message.text}</p>
            /*span tag*/
          </div>
        </div>

      ))}
        <div ref={endRef}></div>
      </div>
      
     
      <div className="bottom">
      <div className="icons">
        <img src={img} alt="" />
        <img src={camera} alt="" />
        <img src={microphone} alt="" />
      </div>
      <input type="text" placeholder='Type a message...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="emogi">
          <img src={emoji} alt="" onClick={()=>setOpen(prev=>!prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}/>

          </div>
        </div>
        <button className='sendbtn' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat
