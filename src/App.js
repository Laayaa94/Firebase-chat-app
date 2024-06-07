import './App.css';
import Chat from './Components/chat/Chat';
import Detail from './Components/detail/Detail';
import List from './Components/list/List';
import Login from './Components/login/Login';
import Notification from './Components/notification/Notification';

function App() {
  const user=true;

  return (
    <div className="ChatContainer">
      {
        user ? (
          <>

          <List/>
          <Chat/>
          <Detail/>
          
          </>
        ):(
          <Login/>
          )
      }
      <Notification/>
     
    </div>
  );
}

export default App;
