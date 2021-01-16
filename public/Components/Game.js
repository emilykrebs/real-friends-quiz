import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import UserContainer from './UserContainer.js';

let socket;

class Game extends Component {
    constructor(props){
        super(props);

        this.gimmeID = this.gimmeID.bind(this);

        socket = io.connect();

        socket.on('joinedroom', data =>{
            this.setState({...this.state, users: data})
        });
        
        this.state={socket, users: []};
    }

    gimmeID(){

        this.setState({socket});

        const data = {
            room: this.props.room,
            name: 'Seymour Butts'
        }

        socket.emit('joinroom', data);
    }

    render(){
        return(
            <div>
                <button onClick={this.gimmeID}>CLICK MEEEEEAHHHHHHH</button><br/>
                <UserContainer users={this.state.users}/>
            </div>
        )
    }
}
export default withRouter(Game);