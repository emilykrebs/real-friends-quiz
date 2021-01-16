import React from 'react';

const Menu = (props) => {
    
    return(
        <div id='menubuttoncontainer'>
            <div id='create'>
                <button id='createBtn' onClick={props.clickEvent} >Create New Survey</button>
                <button id='createBtn' >My Surveys</button>
            </div>
            <div id='play'>
                <button id='startBtn'>Enter Room Code</button>
            </div>
        </div>
    );
}

export default Menu;