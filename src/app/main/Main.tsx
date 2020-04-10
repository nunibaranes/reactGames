import React, { useState } from "react";
/** Components */
import Sudoku from "../components/sudoku/Sudoku";
import GameOfLife from "../components/game-of-life/GameOfLife";
import Paint from "../components/paint/Paint";
import Settings from "./settings/Settings";
import { Switch, Route, Link, useLocation } from "react-router-dom";

/** Styles */
import { StyledMainContainer } from "../styles/common/layout.styles";

export default function Main() {
  const [isDarkModeState, setIsDarkModeState] = useState(false);
  const [darkModeTogglelabel, setDarkModeTogglelabel] = useState(
    "Set Dark Mode"
  );
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const toggleDarkMode = (to: boolean) => {
    const darkModeLabel = `Set ${to ? "Light" : "Dark"} Mode`;
    setIsDarkModeState(to);
    setDarkModeTogglelabel(darkModeLabel);
  };

  return (
    <StyledMainContainer
      className="main"
      id="main"
      isDarkMode={isDarkModeState}
    >
      <Settings
        darkModeTogglelabel={darkModeTogglelabel}
        toggleDarkModeClicked={toggleDarkMode}
      />
      <Switch>
        <Route path="/game-of-life">
          <GameOfLife />
        </Route>
        <Route path="/sudoku">
          <Sudoku />
        </Route>
        <Route path="/paint">
          <Paint />
        </Route>
      </Switch>
      <div className="navigation">
        {!isHomePage && "See also:"}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game-of-life">Game Of Life</Link>
          </li>
          <li>
            <Link to="/sudoku">Sudoku</Link>
          </li>
          <li>
            <Link to="/paint">Paint</Link>
          </li>
        </ul>
      </div>
    </StyledMainContainer>
  );
}
