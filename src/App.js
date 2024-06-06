import './App.css';
import Chat from './Components/chat/Chat';
import Detail from './Components/detail/Detail';
import List from './Components/list/List';

function App() {
  return (
    <div className="ChatContainer">
      <List/>
      <Chat/>
      <Detail/>
    </div>
  );
}

export default App;
