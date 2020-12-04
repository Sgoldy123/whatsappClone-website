
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import SideBar from './components/SideBar';
import Pusher from 'pusher-js'
import axios from 'axios'
function App() {

    const [message,setMessage]=useState([])
    useEffect(() => {
         axios.get('http://localhost:9000/message/sync')
         .then(res=>{
           setMessage(res.data)
         })
         .catch(err=>console.log("##",err));
         ;

      }
      , [])
      console.log(message)

  useEffect(()=>{
        const pusher = new Pusher('1457f33f02b95917df41', {
          cluster: 'eu'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
          // alert(JSON.stringify(data));
          setMessage([...message,data])
        });

        return ()=>{
          channel.unbind_all();
          // channel.unsubscribe();
        }
  },
  [message]
  )

  return (
    <div className="App">
      <div className='main'>
        <SideBar/>
        <Chat messages={message}/>
      </div>
    </div>
  );
}

export default App;
