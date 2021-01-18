import React from 'react';

const Menu = (props) => {
    
    return(
        <div id='menubuttoncontainer'>
            <div id='create'>
                <button id='createBtn' onClick={props.newSurvey} disabled={!props.enabled} >Create New Survey</button>
                <button id='createBtn' disabled={!props.enabled} >My Surveys</button>
            </div>
            <div id='play'>
                <button id='startBtn' onClick={props.enterRoom} disabled={!props.enabled} >Enter Room Code</button>
            </div>
        </div>
    );
}

export default Menu;