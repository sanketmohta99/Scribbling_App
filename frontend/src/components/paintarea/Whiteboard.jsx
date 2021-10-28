import React, { useRef, useEffect, useState } from "react";
import io from 'socket.io-client';



const socket = io("localhost:5000");

const Whiteboard = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wt=window.innerWidth* 0.5;
    const ht=window.innerHeight*1;
    canvas.width = wt;
    canvas.height = ht ;
    canvas.style.width = `${wt}px`;
    canvas.style.height = `${ht}px`;

   

    

    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
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



  }, [])

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

    }, 1000 );

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
            <button
            onClick={
              ()=>{
                contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
                var base64ImgData=canvasRef.current.toDataURL("/image.png");
                socket.emit("drawingdata",base64ImgData);

              }
            }
            >
              CLEAR 
            </button>
          </div>
    </>
  )
}


export default Whiteboard;