

const event= 
(io)=>
{
   const eventhandler= 
   // below is the callback function inside io.on(...) in 
   (socket)=>{
   
    let answer_key;
    console.log(`Client with ID ${socket.id} is now connected with backend`);

    socket.on("message", (msg_obj) => {
      let text=msg_obj.msg;
      let user_name=msg_obj.name;
      if(text===answer_key)
      {
        msg_obj.name="SKETCHIO_BOT";
        msg_obj.msg=`HURRAH!!  ${user_name} has guessed the right word which is ${answer_key}`;
        text="";
        user_name="";
      }
      io.emit("chat", msg_obj);
  
    });
  
  
    socket.on('ans', (word)=>{
      answer_key=word;
    });
  
    socket.on("disconnect", () => { 
      console.log(`Client with ID : ${socket.id} is disconnected with backend`);
    });

  }

    return eventhandler;

}


module.exports=event;