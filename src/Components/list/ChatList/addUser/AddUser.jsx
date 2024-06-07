import React from 'react'
import avatar from '../../../../Assets/avatar.png'
import './AddUser.css'
const AddUser = () => {
  return (
    <div className='addUser'>
        <form>
            <input type="text" placeholder='Username' name='userName'/>
            <button>Search</button>
        </form>
      <div className="user">
        <div className="detail">
           <img src={avatar} alt="" />
           <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser
