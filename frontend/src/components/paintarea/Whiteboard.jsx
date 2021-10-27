
import React from "react";
import '../../styles/Whiteboard.css';
import { useEffect } from "react";

const Whiteboard = 
()=>{


      useEffect(()=>{

        drawOnCanvas(); 

      },[]);


    const drawOnCanvas= ()=>{
      let canvas= document.querySelector('#board');
      let ctx=canvas.getContext('2D');

      let sketch=document.querySelector("#sketch");
      let sketch_style=getComputedStyle(sketch);

      canvas.width= parseInt(sketch_style.getPropertyValue('width')) ;
      canvas.height=   parseInt(sketch_style.getPropertyValue('width')) ;


      var mouse ={x:0, y:0};
      var last_mouse={x:0, y:0};

      //mouse capturing work
      canvas.addEventListener('mousemove', (e)=>{

        last_mouse.x=mouse.x;
        last_mouse.y=mouse.y;

        mouse.x=e.pageX - offsetLeft;
        mouse.y=e.pageY- offsetTop;


        // drawing part work
         ctx.lineWidth=10; // thickness of brush tip
         ctx.lineJoin='round';
         ctx.lineCap='round';
         ctx.strokeStyle='black';  

      }, false );

      canvas.addEventListener ('mousedown', (e)=>{

          canvas.addEventListener('mousemove',drawLine , false);
      }, false);



      canvas.addEventListener ('mouseup', (e)=>{

        canvas.removeEventListener('mousemove',drawLine , false);
    }, false);


      const drawLine= ()=>{
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(last_mouse.x, last_mouse.y);
            ctx.closePath();
            ctx.stroke();
      }


    }


  return (

      <div className="sketch" id="sketch">

        <canvas className="board" id="board">
        </canvas>

      </div>


  );

}


export default Whiteboard;