import styled from "styled-components";
import { StyledButton } from "../../../styles/common/common.styles";

export const StyledPopup = styled("div")`
  ${(props: { isInnerPopup?: boolean }) => {
    const { isInnerPopup } = props;

    return `
            position: ${isInnerPopup ? "absolute" : "fixed"};
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;
  }}

  && {
    ${StyledButton} {
      border: 1px solid #000;
      background: none;
      padding: 5px 10px;
      margin: 20px;
      border-radius: 15px;
      min-width: 90px;
      height: auto;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #000;
    }
  }
`;

export const StyledClosePopup = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  color: #000;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StyledPopupContent = styled("div")`
  background-color: #fff;
  color: #000;
  width: auto;
  height: auto;
  max-width: 50%;
  max-height: 50%;
  min-height: min-content;
  min-width: min-content;
  position: absolute;
  padding: 50px;
`;
