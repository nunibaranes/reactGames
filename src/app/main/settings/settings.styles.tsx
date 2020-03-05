import styled from 'styled-components';

export const StyledSettings = styled('div')`
    width: 100%;
    max-width: 200px;
    height: auto;
    background-color: #909090;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    right: 10px;
    top: 10px; 
    padding: 10px;
    margin-top: -80px;
    transform: translateY(78px);

    .title {
        margin-bottom: 10px;
        margin-block-start: 0;
    }
    .btn {
        max-width: fit-content;
        margin-right: 0;
    }
`;