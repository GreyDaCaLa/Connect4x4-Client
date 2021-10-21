import React, { useContext, useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

const SocketContext = React.createContext();
// const ENDPOINT = 'https://uno-online-multiplayer.herokuapp.com/'

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({id,children}){
    const [socket,setSocket] =useState();
    const [roomCode,setRoomCode] =useState();
    
    useEffect(()=>{
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        }
        
        const newSocket = io.connect("http://localhost:5000",connectionOptions);
        // console.log("newsocket=====",newSocket);
        // newSocket.emit("storeClientInfo", id);
        // newSocket.emit("join", id);
        setSocket(newSocket);

        return () => newSocket.close() //this is the clean up function
    },[id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}