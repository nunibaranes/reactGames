import styled from 'styled-components';

export const StyledWindowResize = styled('div')`
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid black;
    color: black;
    padding: 5px;
    background-color: #fff;
    transition: opacity 1s;
    
    ${props => {
        const { hidden } = props;

        return `
            opacity: ${hidden ? '0' : '1'};
        `;
    }}
`;