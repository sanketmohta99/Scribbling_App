

const event= 
(io)=>
{
   const eventhandler= 
   // below is the callback function inside io.on(...) in 
   (socket)=>{
   
    let answer_key="";
    console.log(`Client with ID ${socket.id} is now connected with backend`);

    socket.on("message", (msg_obj) => {
      let text=msg_obj.msg;
      let user_name=msg_obj.name;
      if(answer_key!="" &&  text==answer_key)
      {
        msg_obj.name="SKETCHIO_BOT";
        msg_obj.msg=`HURRAH!!  ${user_name} has guessed the right word which is ${answer_key}`;
        console.log(`${user_name} has guessed ${answer_key}`);
        text="";
        user_name="";
        answer_key="";
      }
      io.emit("chat", msg_obj);
  
    });
  
  
    socket.on('ans', (word)=>{
      answer_key=word;
    });


    socket.on("drawingdata", (data)=>{

        socket.broadcast.emit("drawingdata", data);
    });

    socket.on("clearcanvas", (data)=>{

      socket.broadcast.emit("clearcanvas", data);
  });
  
    socket.on("disconnect", () => { 
      console.log(`Client with ID : ${socket.id} is disconnected with backend`);
    });

  }

    return eventhandler;

}


module.exports=event;