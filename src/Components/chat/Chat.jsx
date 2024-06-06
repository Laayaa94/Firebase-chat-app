import React from 'react'
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
const Chat = () => {
  
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

      </div>
      <div className="bottom">
      <div className="icons">
        <img src={img} alt="" />
        <img src={camera} alt="" />
        <img src={microphone} alt="" />
      </div>
      <input type="text" placeholder='Type a message...'/>
      <div className="emogi">
          <img src={emoji} alt="" />
          <EmojiPicker/>
        </div>
        <button className='sendbtn'>Send</button>
      </div>
    </div>
  )
}

export default Chat
