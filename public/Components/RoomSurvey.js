import React from 'react';

const RoomSurvey = (props) => {
    return(
        <div className="gamequestion">
            {props.question}
            <button className='gameButton' onMouseUp={() => props.clickEvent(true)} type="button" disabled={props.answered} > Yes </button>
            <button className='gameButton' onMouseUp={() => props.clickEvent(false)} type="button" disabled={props.answered} > No </button>
        </div>
    );
}

export default RoomSurvey;