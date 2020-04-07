import styled from "styled-components";
import {
  StyledWrapper,
  StyledLink,
  StyledSVGIcon,
  StyledButton,
} from "./common.styles";

export const StyledApp = styled("div")`
  text-align: center;

  * {
    box-sizing: border-box;
  }
`;

export const StyledHeader = styled("header")`
  background-color: #282c34;
  background-image: ${(props: { background: string }) =>
    `url(${props.background})` || "none"};
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

export const StyledMainContainer = styled("section")`
  && {
    ${(props: { isDarkMode: boolean }) => {
      const { isDarkMode } = props;
      return `
        min-height: 50vh;
        padding: 50px 0;
        background-color: ${isDarkMode ? "black" : "white"};
        color: ${isDarkMode ? "white" : "black"};

        ${StyledButton} {
          border: 1px solid ${isDarkMode ? "#fff" : "#000"};
          color: ${isDarkMode ? "white" : "black"};

          &:hover{
              color: ${isDarkMode ? "#000" : "#fff"};
              background-color: ${isDarkMode ? "#fff" : "#000"};
          }
        }
    `;
    }}
  }
`;

export const StyledFooter = styled("footer")`
  min-height: 100px;
  background-color: #282c34;
  color: #fff;
  padding: 20px;
  display: flex;

  ${StyledWrapper} {
    flex-direction: row;
  }

  ${StyledLink} {
    flex: 1;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  ${StyledSVGIcon} {
    margin-right: 10px;
    margin-left: 0;
  }
`;
