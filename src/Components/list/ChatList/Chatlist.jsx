import React, { useState } from 'react'
import './Chatlist.css'
import search from '../../../Assets/search.png'
import plus from '../../../Assets/plus.png'
import minus from '../../../Assets/minus.png'
import avatar from '../../../Assets/avatar.png'

const Chatlist = () => {
  const [addMode,setAddmode]=useState(false);
  return (
    <div className='ChatList'>
      <div className="search">
        <div className="searchBar">
          <img src={search} alt="" />
          <input type="text" placeholder='Search'/>
        </div>
        <img src={ addMode ? minus : plus} alt="" className='add'  onClick={()=>setAddmode((prev)=>!prev)} />
      </div>

      <div className="chatlistsAll">
        
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Chatlist
