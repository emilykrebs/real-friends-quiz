import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={loggedIn: false}
    }

    render(){

        const modal = this.state.loggedIn ? {} : {};

        return (
            <div>
                {modal}
            </div>
        );
    }
}

export default Login;