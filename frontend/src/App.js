import io from "socket.io-client";
import { useState, useEffect } from "react";

import ChatArea from "./components/chattingarena/Chatarea";
import Drawarea from "./components/paintarea/Drawarea.jsx";
import './App.css';
// import './styles/Drawarea.css'


const socket = io("localhost:5000");

function App() {

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [disable_button, setDisable_button] = useState(false);
  const [wordset,setWordset]=useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(
        `server has been connected with this ${socket.id} this socket`
      );
    });

    socket.on("chat", (msg_obj) => {
      const sender_name=msg_obj.name;
      if(sender_name=="SKETCHIO_BOT")
        {setWordset(false);}
      setChat((_chat) => [..._chat, msg_obj]);
    });


    


  }, []);


  const addChat = (event) => {
    // event.preventDefault();
    const id = socket.id;

    let word=msg;
    if( wordset==false && word.startsWith('!'))
    {
      setWordset(true); // secret word is now set

      word=word.slice(1);
      socket.emit('ans',word);
      console.log(`ans key is  ${word}`);
    }
    else
    {
      if(msg!=="")
        {socket.emit("message", { id, msg, name });
        setMsg("");
        }

    }
  };



  return (

    <div className="App">
          <Drawarea />
          
      <header className="App-header">

          <h1 className="app_heading"> Hello {name} !! </h1>

           <div className="username-header">
                <input
                  type="text"
                  placeholder="Enter username"
                  className="username-field"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  required
                  disabled={disable_button}
                />

                <button
                  className="username-submit"
                  onClick={() => {
                    if (name !== "") {
                      setDisable_button(true);
                      setName (name);
                    }
                  }}
                  disabled={disable_button}
                >
                  Enter
                </button>

            </div>


          <ChatArea chat={chat}  />

          <div id="chatter-form">
              <input
                type="text"
                placeholder="Enter message"
                className="message-field"
                onChange={(event) => {
                  setMsg(event.target.value);
                }}
                disabled={name!=="" ?wordset :true}
              />

              <button className="message-submit" onClick={addChat} disabled={name!=="" ?wordset :true}>
              <i className="fa fa-paper-plane-o" style={{fontSize:20}}></i>
              </button>
          </div>


        

      </header>
    </div>
  );
}

export default App;
