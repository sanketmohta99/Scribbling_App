import React from "react";

// import Whiteboard from './Whiteboard.jsx';
import '../../styles/Drawarea.css';


const Drawarea= ()=>{




    return (

      <div className="Drawarea">

          <div className="BoardContainer">
              {/* <Whiteboard /> */}

          </div>

          <div className="Colorselector">
            <input type="color" />
          </div>
      </div>


)};

export default Drawarea;