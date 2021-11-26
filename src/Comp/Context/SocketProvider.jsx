import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext();
const ENDPOINT = (true)?'https://connect4x4-server.herokuapp.com/':"http://localhost:5000";

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({id,children}){
    const [socket,setSocket] =useState();
    const [redirectNum,setRedirectNum] = useState(0)
    const [plyrInfo,setPlyrInfo] = useState();
    const [gameRoom,setGameRoom] = useState();
    
    useEffect(()=>{
        console.log("#####-----##### SocketProvider 1 ")
        // console.log("socket: ",socket)
        if(socket){
            socket.on('LoginUser_Ack',(user)=>{
                console.log("Saw A LoginUser_Ack")
                setPlyrInfo(user)
            });


            socket.on('JoinGame_Ack',(roomName)=>{setGameRoom(roomName)})
        }
    },[socket])

    //making connection
    useEffect(()=>{
        console.log("#####-----##### SocketProvider 2 ")
        
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "5", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        }
        const newSocket = io.connect(ENDPOINT,connectionOptions);
        setSocket(newSocket);
    


        return () => newSocket.close() //this is the clean up function
    },[id])

    const value={
        socket,
        redirectNum,
        setRedirectNum,
        plyrInfo,
        setPlyrInfo,
        gameRoom,
        setGameRoom
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}