import React from 'react';

const Survey = (props) => {
    return(
        <button onClick={props.clickEvent} >Create New Survey!</button>
    );
}

export default Survey;