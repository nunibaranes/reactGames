import React , { useState }from 'react';
import styled from 'styled-components';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';
import Paint from '../components/paint/Paint';
import ToggleButton from '../components/common/toggle-button/ToggleButton';

export default function Main() {
  const [isDarkModeState, setIsDarkModeState] = useState(false);

  const toggleDarkMode = (to) => {
    setIsDarkModeState(to);
  }

  return (
    <MainStyled className="main" id="main" isDarkMode={isDarkModeState}>
      <ToggleButton 
        truthLabel='Set Dark Mode'
        falseLabel='Set Light Mode'
        toggleButtonClicked={toggleDarkMode}
      />
      <GameOfLife isDarkMode={isDarkModeState}/>
      <Sudoku/>
      <Paint/>
    </MainStyled>
  );
}

const MainStyled = styled('section')`
  background-color: ${(props) => props.isDarkMode ? 'black' : 'white'};
`