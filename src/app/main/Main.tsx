import React , { useState }from 'react';
import styled from 'styled-components';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';
import Paint from '../components/paint/Paint';
import { getStyledContainer } from '../styles/common/common.styles';
import Settings from './settings/Settings';

export default function Main() {
  const [isDarkModeState, setIsDarkModeState] = useState(false);
  const [darkModeTogglelabel, setDarkModeTogglelabel] = useState('Set Dark Mode');

  const toggleDarkMode = (to) => {
    const darkModeLabel = `Set ${to ? 'Light' : 'Dark'} Mode`;
    setIsDarkModeState(to);
    setDarkModeTogglelabel(darkModeLabel)
  }

  return (
    <MainStyled className="main" id="main" isDarkMode={isDarkModeState}>
      <Settings 
        darkModeTogglelabel={darkModeTogglelabel} 
        toggleDarkModeClicked={toggleDarkMode}
      />
      <GameOfLife/> {/* TODO: Refactor GameOfLife to react hook */}
      <Sudoku/>
      <Paint/>
    </MainStyled>
  );
}

const MainStyled = styled('section')`
  && {
    ${(props) => {
      const {isDarkMode} = props;
      return getStyledContainer(isDarkMode);
    }}
  }
`