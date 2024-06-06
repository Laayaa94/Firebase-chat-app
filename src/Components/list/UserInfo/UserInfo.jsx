import React from 'react'
import './UserInfo.css'
import more from '../../../Assets/more.png'
import video from '../../../Assets/video.png'
import edit from '../../../Assets/edit.png'
import avatar from '../../../Assets/avatar.png'


const UserInfo = () => {
  return (
    <div className='UserInfo'>
      <div className="user">
        <img src={avatar} alt="" />
        <h2>Jane Doe</h2>
      </div>
      <div className="icons">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    </div>
  )
}

export default UserInfo
