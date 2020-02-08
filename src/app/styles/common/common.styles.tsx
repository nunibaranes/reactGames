import styled from 'styled-components';

export const StyledContainer = styled('section')`
    color: ${(props) => props.isDarkMode ? 'white' : 'black'};

    .controllers-and-settings {
        border-top: 1px solid #ddd;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        
        input {
            height: 45px;
            width: 100%;
        }
    }

    .generation-counter {
        margin-top: 25px;
    }
`;

export const StyledButton = styled.button`
  border: 1px solid ${props => props.isDarkMode ? '#fff' : '#000'};
  background: none;
  color: ${props => props.isDarkMode ? '#fff' : '#000'};
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 15px;
  min-width: 90px;
  height: min-content;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
      outline: none;
  }

  &:hover:not(.disabled) {
      color: ${props => props.isDarkMode ? '#000' : '#fff'};
      background-color: ${props => props.isDarkMode ? '#fff' : '#000'};
  }

  &.disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.3;
  }
`