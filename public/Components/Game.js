import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class Game extends Component {
    constructor(props){
        super(props);
        // socket = io.connect();
        // this.state={socket};
    }

    render(){
        return(
            <div>
                HEY IT'S ME IM A GAME IM SO FUN LOOK AT ME WEEEEE<br/>ROOM CODE #{this.props.room}
            </div>
        );
    }
}

export default withRouter(Game);