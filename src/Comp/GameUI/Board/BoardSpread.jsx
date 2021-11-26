import { useEffect, useState } from "react";
import { useGameState } from "../../Context/GameStateProvider";

function BoardSpread() {
  const { gameBoard, sendMove, chip, winner,gMode } = useGameState();
  const colorP1 = "red";
  const colorP2 = (gMode=="reg")?"yellow":"blue";
  const colorP3 = "green";
  const colorP4 = "yellow";


  let boardslots = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 5],
  ];

  let boardcols = [0, 1, 2, 3, 4, 5, 6];

  function getOuterPlayerColor(item) {
    let slot = gameBoard[item[0]][item[1]];

    switch (slot[0]) {
      case "-":
        return "white";

      case "1":
        return colorP1;

      case "2":
        return colorP2;

      case "3":
        return colorP3;

      case "4":
        return colorP4;

      default:
        return "black";
    }
  }
  function getInnerPlayerColor(item) {
    let slot = gameBoard[item[0]][item[1]];

    switch (slot[1]) {
      case "-":
        return "white";
      
      case "1":
        return colorP1;
      
      case "2":
        return colorP2;
      
      case "3":
        return colorP3;
      
      case "4":
        return colorP4;

      default:
        return "black";
      
    }
  }

  function DispBoard() {
    let boxS = 80;
    let unit = Math.floor(boxS / 6);
    let slot_col;
    let slot;
    let item;

    if(!winner){
      for (item of boardcols) {
        slot_col = document.getElementById("gb-slotbutton-col-" + item);
  
        //outer box / canvas size and details
        slot_col.width = unit * 6;
        slot_col.height = unit * 6;
        slot_col.className = "Self-Board-Slot";
        slot_col.innerHTML = "Your browser does not support the HTML5 canvas tag";
  
        //drawing start
        let slot_col_ctx = slot_col.getContext("2d");
  
        //making blue outer board area
        // slot_col_ctx.moveTo(0, 0);
        // slot_col_ctx.lineTo(0, unit * 6);
        // slot_col_ctx.lineTo(unit * 6, unit * 6);
        // slot_col_ctx.lineTo(unit * 6, 0);
        // slot_col_ctx.lineTo(0, 0);
        // slot_col_ctx.stroke();
        // slot_col_ctx.fillStyle = "red";
        // slot_col_ctx.fill();
  
        slot_col_ctx.beginPath();
        slot_col_ctx.moveTo(unit, unit);
        slot_col_ctx.lineTo(unit * 3, unit * 4);
        slot_col_ctx.lineTo(unit, unit * 2);
        slot_col_ctx.lineTo(unit * 3, unit * 5);
        slot_col_ctx.lineTo(unit * 5, unit * 2);
        slot_col_ctx.lineTo(unit * 3, unit * 4);
        slot_col_ctx.lineTo(unit * 5, unit);
        slot_col_ctx.lineTo(unit * 3, unit * 3);
        slot_col_ctx.lineTo(unit, unit);
        slot_col_ctx.stroke();
        slot_col_ctx.fillStyle = "lightblue";
        slot_col_ctx.fill();
      }
    }


    for (item of boardslots) {
      slot = document.getElementById("gb-slot" + item[0] + item[1]);

      //outer box / canvas size and details
      slot.width = unit * 6;
      slot.height = unit * 6;
      slot.className = "Self-Board-Slot";
      slot.innerHTML = "Your browser does not support the HTML5 canvas tag";

      //drawing start
      let slot_ctx = slot.getContext("2d");

      //making blue outer board area
      slot_ctx.moveTo(0, 0);
      slot_ctx.lineTo(0, unit * 6);
      slot_ctx.lineTo(unit * 6, unit * 6);
      slot_ctx.lineTo(unit * 6, 0);
      slot_ctx.lineTo(0, 0);
      slot_ctx.moveTo(unit * 5, unit * 3);
      slot_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, true);
      slot_ctx.stroke();
      slot_ctx.fillStyle = "lightblue";
      slot_ctx.fill();

      //making ring chip
      slot_ctx.beginPath();
      slot_ctx.moveTo(unit * 5, unit * 3);
      slot_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, false);
      slot_ctx.moveTo(unit * 4, unit * 3);
      slot_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      slot_ctx.closePath();
      slot_ctx.stroke();
      slot_ctx.fillStyle = getOuterPlayerColor(item);
      slot_ctx.fill();

      //making inner solid chip
      slot_ctx.beginPath();
      slot_ctx.moveTo(unit * 4, unit * 3);
      slot_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      slot_ctx.closePath();
      slot_ctx.stroke();
      slot_ctx.fillStyle = getInnerPlayerColor(item);
      slot_ctx.fill();
    }
  }

  useEffect(() => {
    console.log("within use effect");

    if (gameBoard) {
      DispBoard();
    }
  }, [gameBoard]);

  function overFlowPadding(){
    if(window.innerWidth<500){
      return "Self-OverflowPad-300"
    }

    return ""

  }

  return (
    <div className={overFlowPadding()}>
      <div id="TheBoard_Cont" className="Self-Board mb-3">
        {winner?"":boardcols.map((colid) => {
          return <canvas 
          id={"gb-slotbutton-col-" + colid}
          className="Self-cell-border"
          onClick={()=>{sendMove(colid,chip)}}

          ></canvas>;
        })}

        {boardslots.map((slotid, index) => {
          return <canvas id={"gb-slot" + slotid[0] + slotid[1]}></canvas>;
        })}
      </div>
    </div>
  );
}

export default BoardSpread;
