import React from 'react';
import User from './User.js';

const UserContainer = (props) => {

        const users = [];

        for (let i = 0; i < props.users.length; i++){
            users.push(<User username={props.users[i].id} id={props.users[i].id} key={`user#${i}`} />)
        }
        
        return(
            <div id='usercontainer'>
                <div className='gameheader'>Users<br/><sup>Room #{props.room}</sup></div>
                {users}
            </div>
        );
}

export default UserContainer;