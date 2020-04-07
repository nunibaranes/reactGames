import React, { useState } from "react";
/** Components */
import Sudoku from "../components/sudoku/Sudoku";
import GameOfLife from "../components/game-of-life/GameOfLife";
import Paint from "../components/paint/Paint";
import Settings from "./settings/Settings";
/** Styles */
import { StyledMainContainer } from "../styles/common/layout.styles";

export default function Main() {
  const [isDarkModeState, setIsDarkModeState] = useState(false);
  const [darkModeTogglelabel, setDarkModeTogglelabel] = useState(
    "Set Dark Mode"
  );

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
      <GameOfLife /> {/* TODO: Refactor GameOfLife to react hook */}
      <Sudoku />
      <Paint />
    </StyledMainContainer>
  );
}
