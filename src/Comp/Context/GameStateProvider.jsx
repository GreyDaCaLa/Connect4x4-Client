import React, { useContext, useEffect, useState } from "react"
import { useSocket } from "./SocketProvider";





const GameStateContext = React.createContext();

export function useGameState() {
    return useContext(GameStateContext);
}


export function GameStateProvider({children}) {
  const socket = useSocket();
    // gameBoard [](column) [](row)
    const [gameBoard,setGameBoard] = useState([
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"],
        ["--", "--", "--", "--", "--", "--"]
    ])
    const [countDoubleChip,setCountDoubleChip] =useState(2)
    const [nextMove,setNextMove] = useState(1);

    const playerMarker=nextMove; //place holder until i figure out who is playing

    function handleMove({col, chip}) {
      console.log("HEY YO WE MADE IT handleMove!!!!!")
      console.log(`we got col:${col} | chip: ${chip}`)
        //Hover above board
        //
        let gb=[...gameBoard];
        let land = "";
    
        for (let i = 0; i < gb[col].length; i++) {
          console.log(`col: ${col} |i:${i} =`, gb[col][i], chip);
    
          if (gb[col][i][0] !== "-") {
            if (chip[0] !== "-") {
              if (chip[1] !== "-") {
                gb[col][i - 1] = chip;
                console.log("land:", chip);
              } else {
                land = chip[0] + gb[col][i - 1][1];
                gb[col][i - 1] = land;
                console.log("land:", land);
              }
              
              //return gb;
              setGameBoard(gb);
              break;
            }
          }
    
          if (gb[col][i][1] !== "-") {
            if (chip[1] !== "-") {
              if (chip[0] !== "-") {
                gb[col][i - 1] = chip;
                console.log("land:", chip);
              } else {
                land = gb[col][i - 1][0] + chip[1];
                console.log("land:", land);
                gb[col][i - 1] = land;
              }
    
              //return gb;
              setGameBoard(gb);
              break;
            }
          }
    
          if (i === gb[col].length - 1) {
            console.log("in bottom row");
            if (gb[col][i][0] === "-" && gb[col][i][1] === "-") {
              land = chip;
              console.log("both bottom");
            } else if (chip[0] !== "-") {
              land = chip[0] + gb[col][i][1];
              console.log("back bottom");
            } else if (gb[col][i][1] === "-") {
              land = gb[col][i][0] + chip[1];
              console.log("Front bottom");
            }
            console.log("land:", land);
            gb[col][i] = land;

            //return gb;
            setGameBoard(gb);
            break;
          }
        }
        console.log("RESULT BOARD=========######");
        printLog_GameBoard(gb);
        if(playerMarker==4){
          setNextMove(1);
        }else{
          setNextMove(playerMarker+1);
        }
    }

    function sendMove(col, chipStyleText){
      console.log("InsendMove===");

      let chip;

      switch(chipStyleText){
        case "IN":
          chip='-'+playerMarker
          break;
        case "OT":
          chip=playerMarker+'-'
          break;
        case "DO":
          chip=(''+playerMarker)+(playerMarker+'')
          break;
      }


      socket.emit("send-Move", {col,chip});



    }


    useEffect(()=>{
      if(socket == null)return

      socket.on('recieve-Move', handleMove)

      return ()=> socket.off();
  }, [socket,handleMove])




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
        gameBoard,
        nextMove,
        countDoubleChip
    }


    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    )
}





/*

    function testingboardlogic(gameBoard) {
      console.log("######----");
      gameBoard = handleMove(0, "-A", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "-A", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "-A", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "A-", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "A-", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "AA", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "-A", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "A-", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(0, "AA", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "-B", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "-B", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "-B", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "BB", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "B-", gameBoard);
      printLog_GameBoard(gameBoard);
  
      console.log("######----");
      gameBoard = handleMove(1, "B-", gameBoard);
      printLog_GameBoard(gameBoard);
    }

*/ 