import React from "react";



const ChatArea =
({chat})=>{



  return (
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
  );

}



export default ChatArea;
