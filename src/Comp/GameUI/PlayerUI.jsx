import { useEffect, useState } from "react";
import BoardSpread from "./Board/BoardSpread";
import { useGameState } from "../Context/GameStateProvider";
import { useSocket } from "../Context/SocketProvider";

function PlayerUI() {
  const { plyrInfo } = useSocket();
  const { winner, playerNum, setChip, chip, gMode } = useGameState();

  const getColor = (num) => {
    console.log("get color number is ===============", num);
    switch (num) {
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "yellow";
      case 4:
        return "green";
    }
  };

  function createOuterChip() {
    let boxS = 36;
    let unit = Math.floor(boxS / 6);
    let canva;

    canva = document.getElementById("OuterChipButtonCanvas");
    if (canva) {
      //outer box / canvas size and details
      canva.width = unit * 6;
      canva.height = unit * 6;
      // canva.className="Self-Board-Slot";
      canva.innerHTML = "Your browser does not support the HTML5 canvas tag";

      //drawing start
      let canva_ctx = canva.getContext("2d");

      //making blue outer board area
      canva_ctx.moveTo(0, 0);
      canva_ctx.lineTo(0, unit * 6);
      canva_ctx.lineTo(unit * 6, unit * 6);
      canva_ctx.lineTo(unit * 6, 0);
      canva_ctx.lineTo(0, 0);
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, true);
      canva_ctx.stroke();
      canva_ctx.fillStyle = "white";
      if (chip == "OT") {
        canva_ctx.fillStyle = "darkolivegreen";
      }
      canva_ctx.fill();

      //making ring chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, false);
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = getColor(playerNum);
      canva_ctx.fill();

      //making inner solid chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = "white";
      if (chip == "OT") {
        canva_ctx.fillStyle = "darkolivegreen";
      }
      canva_ctx.fill();
    }
  }

  function createInnerChip() {
    let boxS = 36;
    let unit = Math.floor(boxS / 6);
    let canva;

    canva = document.getElementById("InnerChipButtonCanvas");

    if (canva) {
      //outer box / canvas size and details
      canva.width = unit * 6;
      canva.height = unit * 6;
      // canva.className="Self-Board-Slot";
      canva.innerHTML = "Your browser does not support the HTML5 canvas tag";

      //drawing start
      let canva_ctx = canva.getContext("2d");

      //making blue outer board area
      canva_ctx.moveTo(0, 0);
      canva_ctx.lineTo(0, unit * 6);
      canva_ctx.lineTo(unit * 6, unit * 6);
      canva_ctx.lineTo(unit * 6, 0);
      canva_ctx.lineTo(0, 0);
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, true);
      canva_ctx.stroke();
      canva_ctx.fillStyle = "white";
      if (chip == "IN") {
        canva_ctx.fillStyle = "darkolivegreen";
      }
      canva_ctx.fill();

      //making ring chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, false);
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = "white";
      if (chip == "IN") {
        canva_ctx.fillStyle = "darkolivegreen";
      }
      canva_ctx.fill();

      //making inner solid chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = getColor(playerNum);
      canva_ctx.fill();
    }
  }

  function createDoubleChip() {
    let boxS = 36;
    let unit = Math.floor(boxS / 6);
    let canva;

    canva = document.getElementById("DoubleChipButtonCanvas");
    if (canva) {
      //outer box / canvas size and details
      canva.width = unit * 6;
      canva.height = unit * 6;
      // canva.className="Self-Board-Slot";
      canva.innerHTML = "Your browser does not support the HTML5 canvas tag";

      //drawing start
      let canva_ctx = canva.getContext("2d");

      //making blue outer board area
      canva_ctx.moveTo(0, 0);
      canva_ctx.lineTo(0, unit * 6);
      canva_ctx.lineTo(unit * 6, unit * 6);
      canva_ctx.lineTo(unit * 6, 0);
      canva_ctx.lineTo(0, 0);
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, true);
      canva_ctx.stroke();
      canva_ctx.fillStyle = "white";
      if (chip == "DO") {
        canva_ctx.fillStyle = "darkolivegreen";
      }
      // canva_ctx.fillStyle =  "lightblue";

      canva_ctx.fill();

      //making ring chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 5, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit * 2, 0, 2 * Math.PI, false);
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = getColor(playerNum);
      canva_ctx.fill();

      //making inner solid chip
      canva_ctx.beginPath();
      canva_ctx.moveTo(unit * 4, unit * 3);
      canva_ctx.arc(unit * 3, unit * 3, unit, 0, 2 * Math.PI, true);
      canva_ctx.closePath();
      canva_ctx.stroke();
      canva_ctx.fillStyle = getColor(playerNum);
      canva_ctx.fill();
    }
  }

  const displayUIButtons = () => {
    if(gMode == "reg"){
      return <></>
    }
    if(gMode == "4x4"){
      return (
        <div id="PlayerUI_Chip_Col_Div" className="p-0">
          <div id="PlayerUIChipButtons" className="p-md-3">
            <div className="row justify-content-around">
              <div
                className="card flex-row col-md-3 col-8 p-0"
                onClick={() => {
                  setChip("OT");
                }}
              >
                <div className="col-5 p-0">
                  <canvas id="OuterChipButtonCanvas" className="" />
                </div>
                <div className="col-8 p-1">
                  <span className="m-0">OUTER</span>
                </div>
              </div>
  
              <div
                className="card flex-row col-md-3 col-8 p-0"
                onClick={() => {
                  setChip("IN");
                }}
              >
                <div className="col-5 p-0">
                  <canvas id="InnerChipButtonCanvas" className="" />
                </div>
                <div className="col-8 p-1">
                  <span className="m-0">INNER</span>
                </div>
              </div>
  
              <div
                className="card flex-row col-md-3 col-8 p-0"
                onClick={() => {
                  setChip("DO");
                }}
              >
                <div className="col-5 p-0">
                  <canvas id="DoubleChipButtonCanvas" className="" />
                </div>
                <div className="col-8 p-1">
                  <span className="m-0">FULL</span>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      );
    }
  };

  const displayGameEndMessages = () => {
    return (
      <>
        <h1 className="text-center">WE HAVE A WINNER</h1>
        <h2 className="text-center">{`Player${winner} has won`}</h2>
      </>
    );
  };

  useEffect(() => {
    console.log("PLAYER UI within use effect");
    
    if(gMode == "reg"){
      if(chip != "DO"){
        setChip("DO");
      }
    }

    if(gMode == "4x4"){
      if (!winner && plyrInfo) {
        createOuterChip();
        createInnerChip();
        createDoubleChip();
      }
    }
  }, [chip, plyrInfo]);

  return (
    <div id="PlayerUIMainDiv" className="col-md-7 col-11 ms-2">
      {winner ? displayGameEndMessages() : displayUIButtons()}
      <div id="MainDivGameBoard" className="d-flex flex-column overflow-auto">
        <BoardSpread />
      </div>
    </div>
  );
}

export default PlayerUI;
