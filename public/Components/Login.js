import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={loggedIn: false}
    }

    render(){

        const modal = this.state.loggedIn ? <div>LOGIN FORM GOES HERE</div> : <div></div>;

        return (
            <div>
                {modal}
            </div>
        );
    }
}

export default Login;