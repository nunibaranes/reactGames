import styled from 'styled-components';
import { StyledButton } from "../../styles/common/common.styles";

export const StyledColorsWrapper = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;

    ${StyledButton} {
        align-self: center;
    }
`;