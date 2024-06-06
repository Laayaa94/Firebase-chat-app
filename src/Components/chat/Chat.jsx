import React from 'react'
import './Chat.css'
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
        <input type="text" placeholder='Type a message...'/>
        <div className="emogi"></div>
      </div>
      </div>
    </div>
  )
}

export default Chat
