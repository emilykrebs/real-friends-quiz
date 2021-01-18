import React from 'react';

const User = (props) => {
    // displays the user's info on the left side of the game page
    return (
        <div className='user'>
            {props.username}<br/>
            {props.score}
        </div>
    );

}

export default User;