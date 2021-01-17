import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import UserContainer from './UserContainer.js';

let socket;

class Game extends Component {
    constructor(props){
        super(props);

        this.collapseUsers = this.collapseUsers.bind(this);

        socket = io.connect();
        socket.on('joinedroom', data =>{
            this.setState({...this.state, users: data})
        });
        
        this.state={socket, users: [], showUsers: true};
    }

    collapseUsers(){
        this.setState({...this.state, showUsers: !this.state.showUsers});
    }

    componentDidMount(){

        if(!this.props.room)
            this.props.exitGame();

        const root = document.getElementById('root');
        root.style.width = '100%';
        root.style.backgroundColor = 'black';

        this.setState({socket});

        const data = {
            room: this.props.room,
            name: 'Seymour Butts'
        }

        socket.emit('joinroom', data);
    }

    render(){

        const users = this.state.showUsers ? <UserContainer users={this.state.users} room={this.props.room} /> : <div></div>;

        return(
            <div>
                <button id='collapsebtn' onClick={this.collapseUsers} style={this.state.showUsers ? {marginLeft: '18%'} : {marginLeft: '0%'} } >{this.state.showUsers ? '<' : '>'}</button>
                <button id='leavegamebtn' onClick={this.props.exitGame} >Leave Game</button>
                {users}
            </div>
        )
    }
}
export default withRouter(Game);