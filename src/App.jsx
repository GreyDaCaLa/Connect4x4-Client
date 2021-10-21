import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GameStateProvider } from "./Comp/Context/GameStateProvider";
import { SocketProvider } from "./Comp/Context/SocketProvider";
import PlayerUI from "./Comp/PlayerUI";
import SideBoardViewsPanel from "./Comp/SideBoardViewsPanel";
import SidePlayersPanel from "./Comp/SidePlayersPanel";
import Welcome from "./Comp/Welcome";

function App() {
  // const [id,setId] =useState();
  // const []
  console.log("app render");

  return (
    <div className="d-flex">
            <SocketProvider>
      <BrowserRouter>
        <Switch>

          <Route exact path="/game/">

              <GameStateProvider>
                <SidePlayersPanel />
                <PlayerUI />
                <SideBoardViewsPanel />
              </GameStateProvider>
          </Route>


          <Route exact path="/">
            <Welcome/>
          </Route>
        </Switch>
      </BrowserRouter>
            </SocketProvider>
    </div>
  );
}

export default App;
