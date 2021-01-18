import React from 'react';

const Navbar = (props) => {

    return(
        <div id='topbar'>
            <h5>
                Currently logged in as {props.username}
            </h5>
        </div>
    );

}

export default Navbar;