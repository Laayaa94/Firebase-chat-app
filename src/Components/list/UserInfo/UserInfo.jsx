import React, { useRef } from 'react';
import './UserInfo.css';
import more from '../../../Assets/more.png';
import video from '../../../Assets/video.png';
import edit from '../../../Assets/edit.png';
import avatar from '../../../Assets/avatar.png';
import { useUserStore } from '../../../lib/userStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import upload from '../../../lib/upload'; // Import the upload function

const UserInfo = () => {
  const { currentUser, fetchUserInfo } = useUserStore((state) => ({
    currentUser: state.currentUser,
    fetchUserInfo: state.fetchUserInfo
  }));
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload the file and get the URL
        const avatarUrl = await upload(file);
        
        // Update the user's avatar in Firestore
        const userRef = doc(db, "users", currentUser.id);
        await updateDoc(userRef, {
          avatar: avatarUrl,
        });

        // Fetch the updated user info
        fetchUserInfo(currentUser.id);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='UserInfo'>
      <div className="user">
        <img 
          src={currentUser.avatar || avatar} 
          alt="User Avatar" 
          onClick={handleImageClick} 
          style={{ cursor: 'pointer' }}
        />
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageChange} 
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src={more} alt="More" />
        <img src={video} alt="Video" />
        <img src={edit} alt="Edit" />
      </div>
    </div>
  );
}

export default UserInfo;
