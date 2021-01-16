import React from 'react';

const Menu = (props) => {
    
    return(
        <div id='menu'>
            <button onClick={props.clickEvent} >Create New Survey</button>
            <button id='startBtn'>Enter Room Code</button>
        </div>
    );
}

export default Menu;