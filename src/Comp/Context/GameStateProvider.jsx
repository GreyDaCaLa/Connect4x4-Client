import React, { useContext, useEffect, useState } from "react"
import { useSocket } from "./SocketProvider";

const GameStateContext = React.createContext();

export function useGameState() {
    return useContext(GameStateContext);
}


export function GameStateProvider({children}) {
    const  {socket, plyrInfo, gameRoom, setGameRoom,setPlyrInfo} = useSocket();
    // gameBoard [](column) [](row)
    const [gameBoard,setGameBoard] = useState();
    const [countDO,setCountDO] = useState();
    const [gMode,setGMode] = useState("4x4")
    const [currTurn,setCurrTurn] = useState();
    const [winner,setWinner] = useState(null);
    const [allPlayers,setAllPlayers] = useState(); // all players in game = PsGame
    const [playerNum,setPlayerNum] = useState(0); // player number for current game EX: Player(1 or 2 or 3 or 4)
    const [chip,setChip]=useState("DO"); // DO IN OT
    const [oneTime,setOneTime]=useState(false)


    function handleMove(newBoard,winner,nextTurn) {
      console.log("HEY YO WE MADE IT handleMove!!!!!")

      setGameBoard(newBoard);
      setWinner(winner);
      setCurrTurn(nextTurn);

    }

    function sendMove(col, chipStyleText){
      console.log("InsendMove===");

      let chip;

      if(playerNum===currTurn){

        switch(chipStyleText){
          case "IN":
            chip='-'+playerNum
            break;
          case "OT":
            chip=playerNum+'-'
            break;
          case "DO":
            chip=(''+playerNum)+(playerNum+'')
            break;
        }
  
        socket.emit("SEND_Move", gameRoom, {col,chip});
  

      }else{
        alert("YOU CAN NOT PLAY\nIT IS NOT YOUR TURN")
      }




    }

    function handelFullContentRES(fc){
      console.log("HANDELING FULL CONTENT DUMP") //only meant to happen when first joining or re-joining a game
      // console.log("the game content",fc)
      setGMode(fc.GameMode)
      setAllPlayers(fc.players)
      setCurrTurn(fc.currTurn)
      setCountDO(fc.CountDO)
      setWinner(fc.winner)
      setGameBoard(fc.gameBoard)
    }


    useEffect(()=>{
      if(socket){
        socket.on('REC_Move_Result',(newBoard,winner,nextTurn)=>{handleMove(newBoard,winner,nextTurn)});

        socket.on('newPlayer_Joining',(newPlayerJoining)=>{
          console.log("New list of players after someone joined the room",newPlayerJoining);
          setAllPlayers(newPlayerJoining)
        });

        socket.on('AssignPlayer_Number', (num)=>{setPlayerNum(num)})

        socket.on("gameRES_FullContent", (fc)=>{handelFullContentRES(fc)});

        if(socket.connected && gameRoom && plyrInfo){
          if(!playerNum){
            socket.emit("Join_Game",plyrInfo.name,gameRoom,(error)=>{alert(error)})
          }


          if(!gameBoard){
            if(!oneTime){
              setOneTime(true)
              socket.emit("gameRQ_FullContent", gameRoom, (error)=>{alert(error)} );

            }
          }
        }

  
        return ()=> socket.off();
      }

    // }, [socket,handleMove])
    }, [socket,handleMove,setPlayerNum,handelFullContentRES])




    function printLog_GameBoard(gameBoard) {
      // console.log("A Random Chip: ",gameBoard[0][0][1]);
  
      let gb = gameBoard;
      let row0 =
        gb[0][0] +
        "|" +
        gb[1][0] +
        "|" +
        gb[2][0] +
        "|" +
        gb[3][0] +
        "|" +
        gb[4][0] +
        "|" +
        gb[5][0] +
        "|" +
        gb[6][0];
      let row1 =
        gb[0][1] +
        "|" +
        gb[1][1] +
        "|" +
        gb[2][1] +
        "|" +
        gb[3][1] +
        "|" +
        gb[4][1] +
        "|" +
        gb[5][1] +
        "|" +
        gb[6][1];
      let row2 =
        gb[0][2] +
        "|" +
        gb[1][2] +
        "|" +
        gb[2][2] +
        "|" +
        gb[3][2] +
        "|" +
        gb[4][2] +
        "|" +
        gb[5][2] +
        "|" +
        gb[6][2];
      let row3 =
        gb[0][3] +
        "|" +
        gb[1][3] +
        "|" +
        gb[2][3] +
        "|" +
        gb[3][3] +
        "|" +
        gb[4][3] +
        "|" +
        gb[5][3] +
        "|" +
        gb[6][3];
      let row4 =
        gb[0][4] +
        "|" +
        gb[1][4] +
        "|" +
        gb[2][4] +
        "|" +
        gb[3][4] +
        "|" +
        gb[4][4] +
        "|" +
        gb[5][4] +
        "|" +
        gb[6][4];
      let row5 =
        gb[0][5] +
        "|" +
        gb[1][5] +
        "|" +
        gb[2][5] +
        "|" +
        gb[3][5] +
        "|" +
        gb[4][5] +
        "|" +
        gb[5][5] +
        "|" +
        gb[6][5];
      let line = "\n--------------------\n";
  
      console.log(
        "The GameBoard",
        "\n" +
          row0 +
          "\n" +
          row1 +
          "\n" +
          row2 +
          "\n" +
          row3 +
          "\n" +
          row4 +
          "\n" +
          row5
      );
      // console.log("The GameBoard","\n"+row0+line+row1+line+row2+line+row3+line+row4+line+row5)
    }

    const value={
        sendMove,
        setChip,
        gameBoard,
        currTurn,
        winner,
        allPlayers,
        playerNum,
        countDO,
        chip,
        gMode
    }


    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    )
}


