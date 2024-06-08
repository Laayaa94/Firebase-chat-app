import { useEffect } from 'react';
import './App.css';
import Chat from './Components/chat/Chat';
import Detail from './Components/detail/Detail';
import List from './Components/list/List';
import Login from './Components/login/Login';
import Notification from './Components/notification/Notification';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } 
    });
    
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <div className="ChatContainer">
      {
        currentUser ? (
          <>
            <List />
            <Chat />
            <Detail />
          </>
        ) : (
          <Login />
        )
      }
      <Notification />
    </div>
  );
}

export default App;
