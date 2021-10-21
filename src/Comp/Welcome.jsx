import { useState } from "react";
import { Link } from "react-router-dom";
import { useSocket } from "./Context/SocketProvider";

function Welcome() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const socket = useSocket();


  const handleSubmitNameClick = () => {
    setUserName(document.getElementById("UserNameTextBoxInput").value);
    setRoomName(document.getElementById("RoomNameTextBoxInput").value);
    // console.log("here is stuff: ", stuff.value)
    document.getElementById("UserNameTextBoxInput").value = "";
    document.getElementById("RoomNameTextBoxInput").value = "";
  };

  const goToGame=()=>{
    console.log("=========================================================================================================================================================================================")
    console.log(`Going To Game:${roomName} as ${userName}`);
    socket.emit("join-game", {userName,roomName}, (error)=>{
      alert(error);

    });


  }

  return (
    <div id="PlayerUIButtons" className="" style={{ height: "100px" }}>
      <h1>WELCOME TO THE LANDING SCREEN</h1>
      <div>
        <label id="UserNameTextBoxLabel">UserName:</label>
        <input
          type="text"
          id="UserNameTextBoxInput"
          placeholder="Give Your Self A Name"
        />
      </div>
      <div>
        <label id="RoomNameTextBoxLabel">RoomName:</label>
        <input
          type="text"
          id="RoomNameTextBoxInput"
          placeholder="Give Your Self A Name"
        />
      </div>
      <button
        id="SubmitName"
        onClick={() => {
          handleSubmitNameClick();
        }}
      >
        CliCK_Me
      </button>
      {userName !== "" && roomName !== "" ? (
        <div>
          <Link to={`game/`}>
          {/* <a href="http://localhost:3000/game/"> */}
            <button id="GoToGame" onClick={()=>{goToGame()}}>LETS GO</button>
          {/* </a> */}
          </Link>
        </div>
      ) : (
        <div>We Need a name and a room to Continue</div>
      )}
    </div>
  );
}

export default Welcome;
