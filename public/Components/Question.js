import React from 'react';

const Question = (props) => {
    return(
        <div>
            Question #{props.number}: {props.question} <br/>
            Answer: {props.answer}
            <hr/>
        </div>
    );
}

export default Question;