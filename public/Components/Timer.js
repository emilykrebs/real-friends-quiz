import React from 'react';

const Timer = (props) =>{
    //displays the time the user has left to answer on the current question
    return (
        <div id='clock'>
            <h1>{props.time}</h1>
        </div>
    );
}

export default Timer;