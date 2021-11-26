import "./App.css";
// import "./test.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GameStateProvider } from "./Comp/Context/GameStateProvider";
import { SocketProvider } from "./Comp/Context/SocketProvider";
import PlayerUI from "./Comp/GameUI/PlayerUI";
import SideBoardViewsPanel from "./Comp/GameUI/SideBoardViewsPanel";
import SidePlayersPanel from "./Comp/GameUI/SidePlayersPanel";
import Welcome from "./Comp/WelcomeLogin/Welcome";
import DispGame from "./Comp/GameUI/DispGame";

function App() {
  console.log("app render");

  function testerFunction(){
    let arr =[]

    for(let i =0;i<30;i++){
      arr.push(i)
    }

    return arr.map(()=>{
      return(
        <div className="Self-tester-item">
        Here it is
      </div>
      )
    })

  }

  return (
    <SocketProvider>
      <BrowserRouter>
        <Switch>

          <Route exact path="/game/">
            <GameStateProvider>
              <DispGame />
            </GameStateProvider>
          </Route>

          <Route exact path="/">
            <div id="MainAppWelcomeDiv">
              <Welcome />
            </div>
          </Route>

        </Switch>
      </BrowserRouter>
    </SocketProvider>
    
    
    
    
    // <div className="Self-tester-Cont">
    //   {testerFunction()}
    // </div>
  );
}

export default App;
