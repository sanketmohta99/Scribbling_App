import React from "react";

import Whiteboard from './Whiteboard.jsx';
import '../../styles/Drawarea.css';
import '../../styles/Whiteboard.css';

const Drawarea= ()=>{

    return (

      <div className="draw_box">

          <div className="BoardContainer">
              <Whiteboard />
          </div>

          
      </div>


)};

export default Drawarea;