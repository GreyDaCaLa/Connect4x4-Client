import { useEffect } from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { SocketProvider, useSocket } from "../Context/SocketProvider";

function Welcome() {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [createAttempt, setCreateAttempt] = useState(0);
  const [serverDown, setServerDown] = useState(false);
  const [clockStart, setClockStart] = useState(Date.now());
  const [conTimeout, setConTimeout] = useState(0);
  const [inter1, setInter1] = useState();
  const { socket, plyrInfo, gameRoom, setGameRoom, setPlyrInfo } = useSocket();
  const [oneReq,setOneReq] = useState(false)

  const socketConnectionBanner = () => {
    return (
      <>
        <h4 className="Self-BadAttemptMessage">{`Attempting to connect to server...${
          20 - Math.floor(conTimeout / 1000)
        }`}</h4>
        <h5 className="Self-BadAttemptMessage">
          If timer runs out Refresh and try again
        </h5>
        <h6 className="Self-BadAttemptMessage">
          if that doesn't fix it then server is down try again later
        </h6>
      </>
    );
  };

  const displayCreateAndLogin = () => {
    return (
      <>
        {loginAttempt ? loginAttemptStatus() : ""}
        <div
          id="LoginDiv"
          className="row ms-2 me-2 align-items-center justify-content-center border border-3 rounded-pill border-dark"
        >
          <div id="Logintext" className="col-md-2 col-sm-2 text-md-end">
            <h1 className="">LOGIN:</h1>
          </div>

          <div className="col-md-6 col-sm-12 mt-1 mb-1">
            <label id="Login_UserName_Label" className="me-3 mb-2">UserName:</label>
            <input type="text" id="Login_UserName_Input" placeholder="Name" />

            <br />

            <label id="Login_Password_Label" className="me-3">Password:</label>
            <input
              type="text"
              id="Login_Password_Input"
              placeholder="Password"
            />
          </div>

          <div className="col-md-2 col-sm-12">
            <button
              id="Login_Submit"
              className="Self-WelUser-Buttons border border-3 rounded-pill border-dark"
              onClick={() => {
                // handleSubmitNameClick();
                handleLoginSubmit();
              }}
            >
              -LOGIN-
            </button>
          </div>
        </div>

        <div id="WelcomeSpacerOR" className="Self-WelcomeSpacerOR">
          --OR--
        </div>

        {createAttempt ? createAttemptStatus() : ""}
        <div
          id="CreateUserDiv"
          className="row ms-2 me-2 align-items-center justify-content-center border border-3 rounded-pill border-dark"
        >
          <div id="CreateUsertext" className="col-md-2 col-sm-2 text-md-end">
            <h2>CreateUser:</h2>
          </div>

          <div className="col-md-6 col-sm-12 mt-1 mb-1">
            <label id="CreateUser_UserName_Label" className="me-3 mb-2">UserName:</label>
            <input
              type="text"
              id="CreateUser_UserName_Input"
              placeholder="Name"
            />

            <br />

            <label id="CreateUser_Password_Label" className="me-3">Password:</label>
            <input
              type="text"
              id="CreateUser_Password_Input"
              placeholder="Password"
            />
          </div>

          <div className="col-md-2 col-sm-12">
            <button
              id="CreateUser_Submit"
              className="Self-WelUser-Buttons border border-3 rounded-pill border-dark"
              onClick={() => {
                // handleSubmitNameClick();
                handleCreateUserSubmit();
              }}
            >
              CREATE!!
            </button>
          </div>
        </div>
      </>
    );
  };

  const getGameCardStyle = (pNum,tNum,mode) => {
    // Pale red -- rgb(236, 112, 99)
    // Pale blue -- rgb(93, 173, 226)
    // Pale yel -- rgb(244, 208, 63)
    // Pale green -- rgb(88, 214, 141)

    
    let PColors=["rgb(236, 112, 99)","rgb(93, 173, 226)","rgb(244, 208, 63)","rgb(88, 214, 141)"]
    
    if(mode == "reg"){
      PColors=["rgb(236, 112, 99)","rgb(244, 208, 63)"]

    }
    // console.log("get color ",pNum , " ",tNum )

    return {"background-image":`linear-gradient(135deg,`+ PColors[pNum-1]+ ` 50%,`+ PColors[tNum-1]+` 50%)`}

  };

  const modeCheckBoxControl4x4 = ()=>{
    let createRoomMode4x4 = document.getElementById("Create_Room_Input_Mode4x4").checked;
    if(createRoomMode4x4){
      document.getElementById("Create_Room_Input_ModeREG").checked = false
    }

  };

  const modeCheckBoxControlReg = ()=>{
    let createRoomModeREG = document.getElementById("Create_Room_Input_ModeREG").checked;
    if(createRoomModeREG){
      document.getElementById("Create_Room_Input_Mode4x4").checked = false
    }

  };

  const OnlineDash = () => {
    // console.log("withinonline dash herre is plyer info:",plyrInfo)

    //if no player is logged in give login / create player options
    if (!plyrInfo) {
      return (
        <>
          {socket
            ? socket.connected
              ? displayCreateAndLogin()
              : socketConnectionBanner()
            : ""}
        </>
      );
    }

    //if player logged in display the games they are a part as well as create a room
    if (plyrInfo) {
      return (
        <div className="p-1">
          <h2>Welcome</h2>
          <h2>{plyrInfo.name}</h2>

          <h4>--Games Your A Part of-- </h4>
          <div id="ThePlayersRooms" className="row p-3 Self-RoomCardCont">
            {console.log("the problamatic PlayerInfo",plyrInfo)}
            {
              (plyrInfo.rooms.length == 0)?
                <div className="border border-3 rounded-pill border-dark">
                  You Must Be New, Aint Nothing Here Yet
                </div>
              :
                plyrInfo.rooms.map((room) => {
                  console.log(room)
                  return(
                    <div
                      key={`roomname-${room.obj.name}`}
                      className="card col-sm-2 border border-3 border-dark"
                      style={getGameCardStyle(room.obj.pNum,room.obj.currTurn,room.obj.mode)}
                      onClick={()=>{handleJoinGameFromList(room.obj.name)}}>
                        
                      <div className="card-header">{`Game Name: ${room.obj.name} `}</div>
                      <div className="card-body">
                        <p>Game-Mode</p>
                        <p className="h1">{room.obj.mode}</p>
                      </div>
                      <div className="card-footer">{`Your: P${room.obj.pNum} | Turn: P${room.obj.currTurn}`}</div>
                    </div>
                  );
                })
            }
          </div>

          <h4>--Search For A Game--</h4>
          <div
            id="SearchGameDiv"
            className="row ms-2 me-2 align-items-center justify-content-center border border-3 rounded-pill border-dark"
          >
            <div id="SearchGametext" className="col-md-2 col-sm-2 text-md-end">
              <h2>Search Game:</h2>
            </div>

            <div className="col-md-6 col-sm-12 mt-1 mb-1">
              <label id="Search_Room_Label" className="me-3 mb-2">GameName:</label>
              <input
                type="text"
                id="Search_Game_Input"
                placeholder="Name"
              />
            </div>

            <div className="col-md-2 col-sm-12">
              <button
                id="SearchGame_Submit"
                className="Self-WelUser-Buttons border border-3 rounded-pill border-dark"
                onClick={() => {
                  handleJoinGameFromSearch();
                }}
              >
                SEARCH!!
              </button>
            </div>
          </div>

          <h4>--Create A New Game--</h4>
          <div
            id="CreateNewGameDiv"
            className="row ms-2 me-2 align-items-center justify-content-center border border-3 rounded-pill border-dark"
          >
            <div id="CreateNewGametext" className="col-md-2 col-sm-2 text-md-end">
              <h2>Create Room:</h2>
            </div>

            <div className="row col-md-6 col-12 mt-1 mb-1">
              <div>
              <label id="Create_Room_Label" className="me-3 mb-2">GameName:</label>
              <input
                type="text"
                id="Create_Room_Input_Name"
                placeholder="Name"
              />
              </div>

              <div>
              <label id="Create_Room_Labelreg" className="me-1 mb-2">Reg:</label>
              <input
                type="checkbox" id="Create_Room_Input_ModeREG"
                onClick={()=>{modeCheckBoxControlReg()}}
              />
              <label id="Create_Room_Label4x4" className="ms-3 me-1 mb-2">4x4:</label>
              <input
                type="checkbox" id="Create_Room_Input_Mode4x4"
                onClick={()=>{modeCheckBoxControl4x4()}}
              />

              </div>





            </div>

            <div className="col-md-2 col-sm-12">
              <button
                id="CreateRoom_Submit"
                className="Self-WelUser-Buttons border border-3 rounded-pill border-dark"
                onClick={() => {
                  handleCreateGameSubmit();
                }}
              >
                CREATE!!
              </button>
            </div>
          </div>




        </div>
      );
    }
  };

  useEffect(() => {
    console.log("UseEffect---Welcome1!! ", createAttempt);

    if (socket) {
      socket.on("CreateUser_Ack", () => {
        setCreateAttempt(-1);
      });
      socket.on("LoginUser_Ack", () => {
        setLoginAttempt(-1);
      });
      socket.on("Create_NewGame_Ack", (ele) => {
        handleRedirectToGame(ele);
      });
              
      socket.on('Up_RES',(user)=>{
        console.log("###########s##Saw a updateplayer info response")
        setGameRoom(undefined);
        setPlyrInfo(user);
    });
      socket.on('gameRES_DoesExistIsFull', (ele)=>{alert(`Sorry!!, But game ${ele} is full search for another.`)})
      socket.on("gameRES_DoesExist", (ele)=>{handleRedirectToGame(ele)});
    }
  }, [createAttempt, loginAttempt]);

  //server down count down
  useEffect(() => {
    console.log("UseEffect---Welcome2!! ");
    let countdownContinue = true;
    // console.log("display socket",socket)
    if (socket) {
      if (socket.connected) {
        setConTimeout(0);
        countdownContinue = false;
        if (inter1) {
          clearInterval(inter1);
          setInter1("");
        }
      }
    }

    if (countdownContinue) {
      if (!inter1) {
        setInter1(
          setInterval(() => {
            setConTimeout(Date.now() - clockStart);
          }, 1000)
        );
      }
      if (conTimeout > 20000) {
        clearInterval(inter1);
      }
    }
  }, [conTimeout, socket]);



  const goToGame = () => {
    // console.log("===============")
    // console.log(`Going To Game:${roomName} as ${userName}`);
    // socket.emit("join-game", {userName,roomName}, (error)=>{
    //   alert(error);
    // });
  };

  const handleLoginSubmit = () => {
    setLoginAttempt(loginAttempt + 1);
    let loginUserName = document.getElementById("Login_UserName_Input").value;
    let loginPassword = document.getElementById("Login_Password_Input").value;

    // console.log(`Loging in as ${loginUserName} with pass: ${loginPassword}`)

    document.getElementById("Login_UserName_Input").value = "";
    document.getElementById("Login_Password_Input").value = "";

    socket.emit("Login_User", loginUserName, loginPassword, (error) => {
      alert(error);
    });
  };

  const handleCreateUserSubmit = () => {
    setCreateAttempt(createAttempt + 1);
    let createUserName = document.getElementById(
      "CreateUser_UserName_Input"
    ).value;
    let createPassword = document.getElementById(
      "CreateUser_Password_Input"
    ).value;

    // console.log("Create user and apss word",createUserName,"-",createPassword)

    document.getElementById("CreateUser_UserName_Input").value = "";
    document.getElementById("CreateUser_Password_Input").value = "";

    if(createUserName){
      if(createPassword){
        socket.emit("Create_User", createUserName, createPassword, (error) => {
          alert(error);
        });

      }
      alert("password was empty")
    }
    else{
      alert("username was empty")
    }
  };

  const handleJoinGameFromList = (gName) => {
    console.log("Joining Game: ",gName)
    handleRedirectToGame(gName)
    // socket.emit("Join_Game", plyrInfo.name, gName,  (error) => {alert(error)});

  };

  const handleJoinGameFromSearch= () => {
    console.log("handleJoinGameFromSearch");
    let searchName = document.getElementById("Search_Game_Input").value;
    document.getElementById("Search_Game_Input").value = "";

    if(searchName){
      socket.emit("GameRQ_DoesExist", searchName, (error) => {alert(error)});
    }
    else{
      alert("search was empty")
    }

  };

  const handleCreateGameSubmit = () => {
    // console.log("Create Room button press")
    let createRoomName = document.getElementById("Create_Room_Input_Name").value;
    document.getElementById("Create_Room_Input_Name").value = "";


    let createRoomMode = "reg"
    let createRoomMode4x4 = document.getElementById("Create_Room_Input_Mode4x4").checked;
    let createRoomModeREG = document.getElementById("Create_Room_Input_ModeREG").checked;

    if(createRoomMode4x4){
      createRoomMode = "4x4"
    }
    if(createRoomModeREG){
      createRoomMode = "reg"
    }

    // console.log("createRoomName: ",createRoomName)
    // console.log("createRoomMode: ", createRoomMode4x4)
    // console.log("createRoomMode: ", createRoomModeREG)

    if(createRoomName){
      socket.emit("Create_NewGame", createRoomName,createRoomMode,  plyrInfo.name, (error) => {
        alert(error);
      });
    }
    else{
      alert("Game Name can't to be empty")
    }

  };

  const loginAttemptStatus = () => {
    switch (loginAttempt) {
      case 0:
        return "";
      case -1:
        return <h6 className="Self-GoodAttemptMessage">Login Accepted</h6>;
      case 1:
        return (
          <h6 className="Self-BadAttemptMessage">
            Login was not accepted try again
          </h6>
        );
      default:
        return "";
    }
  };

  const handleRedirectToGame = (ele) => {
    console.log("handleRedirectToGame", ele)
    // setGameReady(ele);
    setGameRoom(ele);
  };

  const createAttemptStatus = () => {
    switch (createAttempt) {
      case 0:
        return "";
      case -1:
        return (
          <h6 className="Self-GoodAttemptMessage">
            Created user Accepted now try and login
          </h6>
        );
      case 1:
        return (
          <h6 className="Self-BadAttemptMessage">
            Created user was not accepted try again
          </h6>
        );
      default:
        return "";
    }
  };

  const awayaway = () => {
    return <Redirect to="/game" />;
  };

  return (
    <div id="WelcomeDiv" className="Self-WelcomeDiv text-center">
      <div className="card Self-WelcomeTitle Self-TestBoarder">
        <h3>WELCOME TO</h3>
        <h1>CONNECT 4x4</h1>
      </div>



      {gameRoom ? awayaway() : OnlineDash()}

      

      {/* <div id="WelcomeSpacerOR" className="Self-WelcomeSpacerOR">
        --OR--
      </div>

      <div
        id="LocalPlayDiv"
        className="d-flex justify-content-center align-items-center"
      >
        <div id="LocalPlaytext">
          <h2>LocalPlay:</h2>
        </div>

        <div>
          <button
            id="LocalPlay_Submit"
            onClick={() => {
              // handleLocalPlaySubmit();
            }}
          >
            PLAY!!
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Welcome;
