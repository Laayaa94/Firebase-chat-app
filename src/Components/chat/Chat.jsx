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
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
const Chat = () => {
  const[open,setOpen]=useState(false);
  const[chat,setChat]=useState();
  const[text,setText]=useState("");
  const endRef =useRef(null);
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
  },[])

  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats","0F0vTHIQQaKffJpUJ3CU"),(res)=>{
      setChat(res.data())
    })
    return()=>{
      unSub();
    }
  },[])

  console.log(chat)
  const handleEmoji = e=>{
    setText((prev)=>prev + e.emoji);
    setOpen(false)
  };
  console.log(text)
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
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>Lorem, ipsum dolor.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
         
          <div className="texts">
            <p>Lorem, ipsum dolor.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, tempore?</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvPZ-aGzXrY-bq6pdEP6GB1_WpD0vmD-2PA&s" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p>Lorem, ipsum dolor.</p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className='sendbtn'>Send</button>
      </div>
    </div>
  )
}

export default Chat
