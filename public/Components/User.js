import React from 'react';

const User = (props) => {

    return (
        <div>
            {props.username}
            <br/>
            {props.id}
        </div>
    );

}

export default User;