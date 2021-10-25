import io from "socket.io-client";
import { useState, useEffect } from "react";
import './App.css'

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
      if(sender_name==="SKETCHIO_BOT")
        {setWordset(false);}
      setChat((_chat) => [..._chat, msg_obj]);
    });
  }, []);


  const addChat = (event) => {
    event.preventDefault();
    const id = socket.id;

    let word=msg;
    if(word.startsWith('!') )
    {
      setWordset(true);

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
      <header className="App-header">
        <h1 className="app_heading"> Hello {name} !! Start messaging</h1>

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






        <div className="chat-area">
          {chat.map((Obj) => {
            return (

              <span className="block">
                <div key={Obj.id} className="person">{Obj.name}</div>
                
                <div className="text"> {Obj.msg} </div>
                <br/>
              </span>

            );
          })}
        </div>

        <form id="chatter-form">
          <input
            type="text"
            placeholder="Enter message"
            className="message-field"
            onChange={(event) => {
              setMsg(event.target.value);
            }}
            disabled={name!=="" ?wordset :true}
          />

          <button className="message-submit" onClick={addChat}>
          <i class="fa fa-paper-plane-o" style={{fontSize:20}}></i>
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
