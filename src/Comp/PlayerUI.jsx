import { useEffect, useState } from "react";
import BoardSpread from "./BoardSpread";
import { useGameState } from "./Context/GameStateProvider";





function PlayerUI() {
  const {sendMove} = useGameState();
  const [chip,setChip]=useState("IN");

  let boardslots=[
      "ColChoiceButton-0","ColChoiceButton-1","ColChoiceButton-2","ColChoiceButton-3","ColChoiceButton-4","ColChoiceButton-5","ColChoiceButton-6"
  ]

  function createOuterChip() {
    let boxS=36
    let unit=Math.floor(boxS/6);
    let canva;
        
    canva = document.getElementById("OuterChipButtonCanvas")
        
    //outer box / canvas size and details
    canva.width=unit*6;
    canva.height=unit*6;
    // canva.className="Self-Board-Slot";
    canva.innerHTML="Your browser does not support the HTML5 canvas tag";

    //drawing start
    let canva_ctx = canva.getContext("2d");

    //making blue outer board area
    canva_ctx.moveTo(0, 0);
    canva_ctx.lineTo(0, unit*6);
    canva_ctx.lineTo(unit*6, unit*6);
    canva_ctx.lineTo(unit*6, 0);
    canva_ctx.lineTo(0, 0);
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,true);
    canva_ctx.stroke();
    canva_ctx.fillStyle = "white";
    if(chip=="OT"){canva_ctx.fillStyle =  "lightblue";}
    canva_ctx.fill();
    

    //making ring chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,false);
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "red";
    canva_ctx.fill();
    
    //making inner solid chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3,unit*3,unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "black";
    canva_ctx.fill();

  }
  function createInnerChip() {
    let boxS=36
    let unit=Math.floor(boxS/6);
    let canva;
        
    canva = document.getElementById("InnerChipButtonCanvas")
        
    //outer box / canvas size and details
    canva.width=unit*6;
    canva.height=unit*6;
    // canva.className="Self-Board-Slot";
    canva.innerHTML="Your browser does not support the HTML5 canvas tag";

    //drawing start
    let canva_ctx = canva.getContext("2d");

    //making blue outer board area
    canva_ctx.moveTo(0, 0);
    canva_ctx.lineTo(0, unit*6);
    canva_ctx.lineTo(unit*6, unit*6);
    canva_ctx.lineTo(unit*6, 0);
    canva_ctx.lineTo(0, 0);
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,true);
    canva_ctx.stroke();
    canva_ctx.fillStyle = "white";
    if(chip=="IN"){canva_ctx.fillStyle =  "lightblue";}
    canva_ctx.fill();
    

    //making ring chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,false);
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "red";
    canva_ctx.fill();
    
    //making inner solid chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3,unit*3,unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "black";
    canva_ctx.fill();

  }
  function createDoubleChip() {
    let boxS=36
    let unit=Math.floor(boxS/6);
    let canva;
        
    canva = document.getElementById("DoubleChipButtonCanvas")
        
    //outer box / canvas size and details
    canva.width=unit*6;
    canva.height=unit*6;
    // canva.className="Self-Board-Slot";
    canva.innerHTML="Your browser does not support the HTML5 canvas tag";

    //drawing start
    let canva_ctx = canva.getContext("2d");

    //making blue outer board area
    canva_ctx.moveTo(0, 0);
    canva_ctx.lineTo(0, unit*6);
    canva_ctx.lineTo(unit*6, unit*6);
    canva_ctx.lineTo(unit*6, 0);
    canva_ctx.lineTo(0, 0);
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,true);
    canva_ctx.stroke();
    canva_ctx.fillStyle =  "white";
    if(chip=="DO"){canva_ctx.fillStyle =  "lightblue";}
    // canva_ctx.fillStyle =  "lightblue";
    
    canva_ctx.fill();

    //making ring chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*5, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit*2, 0, 2 * Math.PI,false);
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3, unit*3, unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "red";
    canva_ctx.fill();
    
    //making inner solid chip
    canva_ctx.beginPath();
    canva_ctx.moveTo(unit*4, unit*3);
    canva_ctx.arc(unit*3,unit*3,unit, 0, 2 * Math.PI,true);
    canva_ctx.closePath();
    canva_ctx.stroke();
    canva_ctx.fillStyle = "black";
    canva_ctx.fill();

  }


  useEffect (()=>{
    console.log("PLAYER UI within use effect")
    createOuterChip();
    createInnerChip();
    createDoubleChip();

  },[chip])


  
  return (
    <div id="PlayerUIMainDiv" className="" style={{height:"100px"}}>

      <div id="PlayerUIChipButtons" className="">
        <div className="row m-3 justify-content-around">
          <div className="card flex-row col-sm-3 p-0" onClick={()=>{setChip("OT")}}>
              <canvas id="OuterChipButtonCanvas" className="col-sm-4 justify-content-start"></canvas>
              <h3 className="col-sm-8 mt-2">OUTER</h3>
          </div>

          <div className="card flex-row col-sm-3 p-0" onClick={()=>{setChip("IN")}}>
              <canvas id="InnerChipButtonCanvas" className="col-sm-4 justify-content-start"></canvas>
              <h3 className="col-sm-8 mt-2">INNER</h3>
          </div>

          <div className="card flex-row col-sm-3 p-0" onClick={()=>{setChip("DO")}}>
              <canvas id="DoubleChipButtonCanvas" className="col-sm-4 justify-content-start"></canvas>
              <h3 className="col-sm-8 mt-2">DOUBLE</h3>
          </div>



        </div>
        

      </div>

      <div id="PlayerUISlotButtons">
          {boardslots.map((item,index)=>{
              return(
                <button  onClick={()=>{sendMove(index,chip)}} id={item} className="Self-ColButton"><div className="Self-ArrowDown"></div></button>
              )
          })}
      </div>

      <div id="MainDivGameBoard" className="d-flex flex-column">
        <BoardSpread/>
      </div>
    </div>
  );
}
  
export default PlayerUI;