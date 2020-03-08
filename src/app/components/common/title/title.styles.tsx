import styled from 'styled-components';

export const StyledTitle = styled('div')`
    ${props => {
        const { alignment, isMainTitle } = props;

        return `
            font-size: 1.2em;
            text-align: ${alignment || 'left' } ;

            h1, h2 {
                font-size: ${isMainTitle ? '2em' : '1em'};
            }

            h3 {
                font-size: ${isMainTitle ? '1.8em' : '0.9em'};
            }

            h4, h5, h6 {
                font-size: ${isMainTitle ? '1.6em' : '0.9em'};
            }
        `;
    }}
`;