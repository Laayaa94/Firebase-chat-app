import React from 'react'
import './Detail.css'
import avatar from '../../Assets/avatar.png'
import arrowUp from '../../Assets/arrowUp.png'
import arrowDown from '../../Assets/arrowDown.png'
import download from '../../Assets/download.png'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useUserStore } from '../../lib/userStore'

const Detail = () => {
  const {
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || avatar} alt="" />
        <h2>{user?.username}</h2>
        <p>Always Available</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={arrowDown} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvPZ-aGzXrY-bq6pdEP6GB1_WpD0vmD-2PA&s" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvPZ-aGzXrY-bq6pdEP6GB1_WpD0vmD-2PA&s" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvPZ-aGzXrY-bq6pdEP6GB1_WpD0vmD-2PA&s" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt="" className='icon' />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        
        <button onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User Blocked" : "Block User"}
        </button>

        <button className='logout' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail
