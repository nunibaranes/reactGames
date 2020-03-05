import styled from 'styled-components';

export const StyledHeader = styled('header')`
  background-color: #282c34;
  background-image: url('../../assets/images/header-bg.jpg');
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  .noonles {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border-radius: 50%;
  }
`;

export const StyledApp = styled('div')`
  text-align: center;

  * {
    box-sizing: border-box;
  }
`; 

export const StyledMainContainer = styled('section')`
  && {
    ${(props) => {
      const { isDarkMode } = props;
      return `
        min-height: 50vh;
        padding: 50px 0;
        background-color: ${isDarkMode ? 'black' : 'white'};
        color: ${isDarkMode ? 'white' : 'black'};

        .btn {
          border: 1px solid ${isDarkMode ? '#fff' : '#000'};
          color: ${isDarkMode ? 'white' : 'black'};

          &:hover:not(.disabled) {
              color: ${isDarkMode ? '#000' : '#fff'};
              background-color: ${isDarkMode ? '#fff' : '#000'};
        }
    `
    }}
  }
`;

