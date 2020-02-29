const getStyledBtn = (isDarkMode) => `
    .btn {
        border: 1px solid ${isDarkMode ? '#fff' : '#000'};
        color: ${isDarkMode ? 'white' : 'black'};

        &:hover:not(.disabled) {
            color: ${isDarkMode ? '#000' : '#fff'};
            background-color: ${isDarkMode ? '#fff' : '#000'};
    }
}`;

export const getStyledContainer =(isDarkMode) => `
    background-color: ${isDarkMode ? 'black' : 'white'};
    color: ${isDarkMode ? 'white' : 'black'};

    ${getStyledBtn(isDarkMode) /** general styles for buttons */}
`;