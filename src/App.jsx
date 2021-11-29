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
  console.log("App render");



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
  );
}

export default App;
