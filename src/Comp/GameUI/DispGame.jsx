import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useGameState } from "../Context/GameStateProvider";
import { useSocket } from "../Context/SocketProvider";
import PlayerUI from "./PlayerUI";
import SideBoardViewsPanel from "./SideBoardViewsPanel";
import SidePlayersPanel from "./SidePlayersPanel";

function DispGame() {

    const {socket,gameRoom,plyrInfo,redirectNum, setGameRoom,setPlyrInfo} = useSocket()
    const {currTurn, goToPlayerPage} = useGameState()

    useEffect( ()=>{

      
      }, [socket,gameRoom,plyrInfo])


    const dispContent = () =>{
        // console.log(socket,"|",gameRoom,"|",plyrInfo,"|",redirectNum)
        if(!socket || !gameRoom || !plyrInfo || redirectNum){
            return(<Redirect to="/" />)
        }
        if(currTurn){
            return(
                <div id="DisplayGameMainDiv"className="row w-100">
                    <SidePlayersPanel />
                    <PlayerUI />
                    {/* <SideBoardViewsPanel /> */}
                </div>
            )
        }else{
            return(<h3>LOADING......</h3>)
        }


    }


    const goToMainPage = () => {
        if(socket){
            // setGameRoom();
            // console.log("#####################where am i")  
            socket.emit("UpdatePlayerInfo_RQ",plyrInfo.name)
        }
        return <Redirect to="/" />;
        // return <></>
      };







  return (
    <div id="MainAppGameDiv">
        {gameRoom?dispContent():goToMainPage()}
    </div>
  );


}

export default DispGame;
