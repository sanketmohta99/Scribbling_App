import React, { useRef, useEffect, useState } from "react";
import io from 'socket.io-client';



const socket = io("localhost:5000");

const Whiteboard = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [col, setCol]=useState("black");
  const [strwid, setStrwid]=useState(5);

  let canvasRef = useRef(null);
  let contextRef = useRef(null);


  useEffect(() => {
    // console.log("Eff1");
     let canvas = canvasRef.current;
    const wt=window.innerWidth* 0.52;
    const ht=window.innerHeight*0.88;
    canvas.width = wt;
    canvas.height = ht ;
    canvas.style.width = `${wt}px`;
    canvas.style.height = `${ht}px`;

     let context = canvas.getContext("2d");
    
    context.lineCap = "round";
    context.strokeStyle = col;
    context.lineWidth = 5;
    contextRef.current = context;

      socket.on("drawingdata",(data)=>{

        var img=new Image();
        var cnvs=canvasRef.current;
       
        var ctx=cnvs.getContext('2d'); 
        
        img.onload= ()=>{

            ctx.drawImage(img,0,0);
        }
        img.src=data;

      });    


      socket.on("clearcanvas",(data)=>{
        contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
      });

  }, []);


  useEffect(  ()=>{
    // console.log("Eff2");
    // context.strokeStyle = col;
    contextRef.current.strokeStyle=col;
  }, [col]);

  useEffect(  ()=>{
    // console.log("Eff3");
    // context.strokeStyle = col;
    contextRef.current.lineWidth =strwid;
  }, [strwid]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    setTimeout( ()=>{
      var base64ImgData=canvasRef.current.toDataURL("/image.png");
      
      socket.emit("drawingdata",base64ImgData);
      // var base64ImgData=context.getImageData

    }, 500 );

  };

  return (
    <>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="can"
      />



         <div className="Clear">

            <input type="range"  min="5" max="25" className="Slider" defaultValue="5" 
                onChange={
                (e)=>{
                  // e.preventDefault();
                  setStrwid(e.target.value) ;
                  // contextRef.current.strokeStyle=e.target.value;
                }
                }

            />
              
              <input type="color"  className="colr_inp"   val ={col} defaultValue={"black"} 
                onChange={

                  (e)=>{
                    e.preventDefault();
                    setCol(e.target.value) ;
                    // contextRef.current.strokeStyle=e.target.value;
                  }
                }
               />

                <button className="removebtn"
                onClick={
                  ()=>{
                    contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
                    // var base64ImgData=canvasRef.current.toDataURL("/image.png");
                    // socket.emit("drawingdata",base64ImgData);
                    socket.emit("clearcanvas",null);

                  }
                }
                >
                  CLEAR DRAWING
                </button>
          </div>
    </>
  )
}


export default Whiteboard;