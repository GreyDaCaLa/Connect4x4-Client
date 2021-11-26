import { useEffect, useState } from "react";
import { useGameState } from "../Context/GameStateProvider";
import { useSocket } from "../Context/SocketProvider";
import { Redirect} from "react-router-dom";



function SidePlayersPanel() {
  const {socket, gameRoom, setGameRoom } = useSocket();
  const {allPlayers,currTurn,gMode } = useGameState()



  const playerColor = (pNum) => {
    // Pale red -- rgb(236, 112, 99)
    // Pale blue -- rgb(93, 173, 226)
    // Pale yel -- rgb(244, 208, 63)
    // Pale green -- rgb(88, 214, 141)

    
    let PColors=["rgb(236, 112, 99)","rgb(93, 173, 226)","rgb(244, 208, 63)","rgb(88, 214, 141)"]
       
    console.log("#################### the game mode: ",gMode)
    if(gMode == "reg"){
      PColors=["rgb(236, 112, 99)","rgb(244, 208, 63)"]

    }

    return {"background-color": `${PColors[pNum]}` }

  };


  const displayPlayers=()=>{
    // console.log("DisplayPlayers=====",allPlys,nextMove)
    if(allPlayers){
      return allPlayers.map((person,index)=>{
        // console.log("current person: ",person, " |index: ",index )
        // console.log("currTurn",currTurn)
        return(
          <div key={`person-${person}+${index}`} className="card text-center col-3 col-md-11 mb-1 p-0 border border-3 border-dark" 
          style={playerColor(index)}>
            <h5 className="card-header h6 p-0">{`Player${index+1}:`}</h5>
            <h5 className="card-body m-0 p-1">{person}</h5>
            <h5 className="card-footer p-1 m-0">
            {(index+1===currTurn)?<p className="h6">My Turn</p>:`---`}
            </h5>
          </div>
        )
      }) 

    }else{
      return (<h4>Loading</h4>)

    }
   

  }


  useEffect(()=>{
    console.log("\nUseEffect---sideplayerpanel!!!")

  },[socket,allPlayers,currTurn])




  const goBackToPlayerPage=()=>{

    socket.emit("Leave_Game",gameRoom)

    setGameRoom()

  }



    
    return (
      <div className="row col-md-3 col-11 me-2 mt-2 ms-2 align-items-top justify-content-center">
        
        <div id="PlayerPageOptions" className="col-8"
        onClick={()=>{goBackToPlayerPage()}}
        
        >
          <div className="card align-items-center m-0">
            <p className="m-0">Go Back to Main</p>
            <p className="m-0">Player Page</p>
          </div>
        </div>


      <div id="PlayerListDiv" className="row coll-11 align-items-top justify-content-center">
        {displayPlayers()}
      </div>

      </div>
    );
  }
  
  export default SidePlayersPanel;