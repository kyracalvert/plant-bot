// stores all the active applications
const plantDataToDisplay = (state=[], action) => {
    if (action.type === 'DISPLAY_LIGHT_DATA') {
        return action.payload;
    }
    return state
}//end applicationToDisplay

export default plantDataToDisplay;