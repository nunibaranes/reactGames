import styled from 'styled-components';

export const StyledColorPicker = styled('fieldset')`
    border: none;
    padding: 0;
`;

export const StyledColorPickerSpan = styled('span')`
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 5px 15px;
    border: 2px solid black;
    transition: 0.3s;
`;

export const StyledColorPickerLabel = styled('label')`
        cursor: pointer;

    &:first-child {
        ${StyledColorPickerSpan} {
            margin-left: 0;
        }
    }

    &:hover ${StyledColorPickerSpan} {
        transform: rotate(45deg);
    }  
`;

export const StyledColorPickerInput = styled('input')`
    opacity: 0;
    position: absolute;
    
    &:checked + ${StyledColorPickerSpan} {
        transform: scale(1.5);
    }
`;