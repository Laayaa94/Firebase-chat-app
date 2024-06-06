import React from 'react'
import './List.css'
import UserInfo from './UserInfo/UserInfo'
import Chatlist from './ChatList/Chatlist'

const List = () => {
  return (
    <div className='list'>
      <UserInfo/>
      <Chatlist/>
    </div>
  )
}

export default List
